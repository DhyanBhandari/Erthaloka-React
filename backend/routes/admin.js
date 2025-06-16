const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user is admin
    const adminEmails = [
      'admin@erthaloka.com',
      'rama@erthaloka.com',
      'erthaloka@gmail.com'
    ];

    if (!adminEmails.includes(req.user.email)) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Admin verification failed'
    });
  }
};

// Get all users with search
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, name, email, phone, carbon_coins, subscription_plan, 
             subscription_status, created_at 
      FROM users
    `;
    let params = [];

    if (search) {
      query += ` WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const users = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM users';
    let countParams = [];
    if (search) {
      countQuery += ' WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1';
      countParams.push(`%${search}%`);
    }

    const totalResult = await pool.query(countQuery, countParams);
    const total = parseInt(totalResult.rows[0].count);

    res.json({
      success: true,
      users: users.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Update user carbon coins
router.post('/users/:userId/edit-coins', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, action = 'set' } = req.body; // action: 'set', 'add', 'subtract'

    if (typeof amount !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a number'
      });
    }

    let updateQuery;
    let params;

    switch (action) {
      case 'add':
        updateQuery = 'UPDATE users SET carbon_coins = carbon_coins + $1 WHERE id = $2 RETURNING carbon_coins';
        params = [amount, userId];
        break;
      case 'subtract':
        updateQuery = 'UPDATE users SET carbon_coins = GREATEST(carbon_coins - $1, 0) WHERE id = $2 RETURNING carbon_coins';
        params = [amount, userId];
        break;
      default: // 'set'
        updateQuery = 'UPDATE users SET carbon_coins = $1 WHERE id = $2 RETURNING carbon_coins';
        params = [amount, userId];
    }

    const result = await pool.query(updateQuery, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Carbon coins updated successfully',
      newBalance: result.rows[0].carbon_coins
    });
  } catch (error) {
    console.error('Update coins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update carbon coins'
    });
  }
});

// Get admin dashboard stats
router.get('/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get user stats
    const userStats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_subscribers,
        SUM(carbon_coins) as total_carbon_coins
      FROM users
    `);

    // Get subscription breakdown
    const subscriptionStats = await pool.query(`
      SELECT 
        subscription_plan,
        COUNT(*) as count
      FROM users 
      WHERE subscription_plan IS NOT NULL
      GROUP BY subscription_plan
    `);

    // Get recent registrations (last 30 days)
    const recentRegistrations = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as registrations
      FROM users 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    // Get payment stats
    const paymentStats = await pool.query(`
      SELECT 
        COUNT(*) as total_payments,
        SUM(amount) as total_revenue
      FROM payments 
      WHERE status = 'completed'
    `);

    res.json({
      success: true,
      stats: {
        users: userStats.rows[0],
        subscriptions: subscriptionStats.rows,
        recentRegistrations: recentRegistrations.rows,
        payments: paymentStats.rows[0]
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats'
    });
  }
});

module.exports = router;