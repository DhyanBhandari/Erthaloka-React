// routes/subscriptions.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const pool = require('../config/database');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Subscription plans configuration
const SUBSCRIPTION_PLANS = {
  resident: {
    id: 'resident',
    name: 'EcoVerse Resident',
    amount: 99900, // Amount in paisa (₹999)
    currency: 'INR',
    period: 'monthly',
    interval: 1,
    description: 'Perfect for individuals starting their regenerative journey'
  },
  ambassador: {
    id: 'ambassador',
    name: 'EcoVerse Ambassador',
    amount: 199900, // Amount in paisa (₹1999)
    currency: 'INR',
    period: 'monthly',
    interval: 1,
    description: 'For change-makers ready to lead sustainable communities'
  },
  warrior: {
    id: 'warrior',
    name: 'EcoVerse Warrior',
    amount: 499900, // Amount in paisa (₹4999)
    currency: 'INR',
    period: 'monthly',
    interval: 1,
    description: 'For visionaries creating the regenerative future'
  }
};

// Get all subscription plans
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    plans: Object.values(SUBSCRIPTION_PLANS).map(plan => ({
      ...plan,
      amount_display: `₹${plan.amount / 100}` // Convert paisa to rupees for display
    }))
  });
});

// Create Razorpay order for subscription
router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    // Validate plan
    if (!SUBSCRIPTION_PLANS[planId]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
    }

    const plan = SUBSCRIPTION_PLANS[planId];

    // Create Razorpay order
    const orderOptions = {
      amount: plan.amount,
      currency: plan.currency,
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        user_id: userId,
        plan_id: planId,
        plan_name: plan.name
      }
    };

    const order = await razorpay.orders.create(orderOptions);

    // Store order in database
    await pool.query(
      `INSERT INTO payments (user_id, razorpay_order_id, amount, currency, status) 
       VALUES ($1, $2, $3, $4, 'pending')`,
      [userId, order.id, plan.amount, plan.currency]
    );

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Verify payment and activate subscription
router.post('/verify-payment', authenticateToken, async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      planId
    } = req.body;

    const userId = req.user.id;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Validate plan
    if (!SUBSCRIPTION_PLANS[planId]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
    }

    const plan = SUBSCRIPTION_PLANS[planId];

    // Begin transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Update payment record
      await client.query(
        `UPDATE payments 
         SET razorpay_payment_id = $1, razorpay_signature = $2, status = 'completed' 
         WHERE razorpay_order_id = $3 AND user_id = $4`,
        [razorpay_payment_id, razorpay_signature, razorpay_order_id, userId]
      );

      // Get payment details
      const paymentResult = await client.query(
        'SELECT id FROM payments WHERE razorpay_payment_id = $1',
        [razorpay_payment_id]
      );

      if (paymentResult.rows.length === 0) {
        throw new Error('Payment record not found');
      }

      const paymentId = paymentResult.rows[0].id;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

      // Create subscription record
      const subscriptionResult = await client.query(
        `INSERT INTO subscriptions 
         (user_id, plan_id, plan_name, amount, currency, status, start_date, end_date) 
         VALUES ($1, $2, $3, $4, $5, 'active', $6, $7) 
         RETURNING id`,
        [userId, planId, plan.name, plan.amount, plan.currency, startDate, endDate]
      );

      const subscriptionId = subscriptionResult.rows[0].id;

      // Update payment with subscription ID
      await client.query(
        'UPDATE payments SET subscription_id = $1 WHERE id = $2',
        [subscriptionId, paymentId]
      );

      // Update user subscription status
      await client.query(
        `UPDATE users 
         SET subscription_plan = $1, 
             subscription_status = 'active',
             subscription_start_date = $2,
             subscription_end_date = $3
         WHERE id = $4`,
        [planId, startDate, endDate, userId]
      );

      await client.query('COMMIT');

      // Get updated user info
      const userResult = await client.query(
        'SELECT id, name, email, phone, subscription_plan, subscription_status FROM users WHERE id = $1',
        [userId]
      );

      res.json({
        success: true,
        message: 'Subscription activated successfully',
        subscription: {
          id: subscriptionId,
          plan: planId,
          status: 'active',
          startDate,
          endDate
        },
        user: userResult.rows[0]
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});

// Get user's subscription details
router.get('/my-subscription', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const subscriptionResult = await pool.query(
      `SELECT s.*, u.subscription_status, u.subscription_start_date, u.subscription_end_date
       FROM subscriptions s
       JOIN users u ON s.user_id = u.id
       WHERE s.user_id = $1 AND s.status = 'active'
       ORDER BY s.created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (subscriptionResult.rows.length === 0) {
      return res.json({
        success: true,
        subscription: null,
        message: 'No active subscription found'
      });
    }

    const subscription = subscriptionResult.rows[0];

    res.json({
      success: true,
      subscription: {
        id: subscription.id,
        planId: subscription.plan_id,
        planName: subscription.plan_name,
        amount: subscription.amount,
        currency: subscription.currency,
        status: subscription.status,
        startDate: subscription.start_date,
        endDate: subscription.end_date,
        createdAt: subscription.created_at
      }
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription details'
    });
  }
});

// Get user's payment history
router.get('/payment-history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const paymentsResult = await pool.query(
      `SELECT p.*, s.plan_name 
       FROM payments p
       LEFT JOIN subscriptions s ON p.subscription_id = s.id
       WHERE p.user_id = $1 AND p.status = 'completed'
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const totalResult = await pool.query(
      'SELECT COUNT(*) FROM payments WHERE user_id = $1 AND status = $2',
      [userId, 'completed']
    );

    const total = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      payments: paymentsResult.rows.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        planName: payment.plan_name,
        paymentId: payment.razorpay_payment_id,
        createdAt: payment.created_at
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Begin transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Update subscription status
      await client.query(
        `UPDATE subscriptions 
         SET status = 'cancelled' 
         WHERE user_id = $1 AND status = 'active'`,
        [userId]
      );

      // Update user subscription status (keep access until end date)
      await client.query(
        `UPDATE users 
         SET subscription_status = 'cancelled' 
         WHERE id = $1`,
        [userId]
      );

      await client.query('COMMIT');

      res.json({
        success: true,
        message: 'Subscription cancelled successfully. Access will continue until the end of current billing period.'
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel subscription'
    });
  }
});

// Webhook endpoint for Razorpay
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }

    const event = JSON.parse(body.toString());
    
    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        handlePaymentCaptured(event.payload.payment.entity);
        break;
      case 'payment.failed':
        handlePaymentFailed(event.payload.payment.entity);
        break;
      case 'subscription.cancelled':
        handleSubscriptionCancelled(event.payload.subscription.entity);
        break;
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

// Webhook handlers
async function handlePaymentCaptured(payment) {
  try {
    console.log('Payment captured:', payment.id);
    // Additional logic if needed
  } catch (error) {
    console.error('Handle payment captured error:', error);
  }
}

async function handlePaymentFailed(payment) {
  try {
    console.log('Payment failed:', payment.id);
    
    // Update payment status
    await pool.query(
      'UPDATE payments SET status = $1 WHERE razorpay_payment_id = $2',
      ['failed', payment.id]
    );
  } catch (error) {
    console.error('Handle payment failed error:', error);
  }
}

async function handleSubscriptionCancelled(subscription) {
  try {
    console.log('Subscription cancelled:', subscription.id);
    // Additional logic if needed
  } catch (error) {
    console.error('Handle subscription cancelled error:', error);
  }
}

module.exports = router;