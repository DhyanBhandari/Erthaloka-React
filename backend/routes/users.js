// routes/users.js
const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user stats
    const userStatsQuery = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.phone,
        u.subscription_plan,
        u.subscription_status,
        u.subscription_start_date,
        u.subscription_end_date,
        u.created_at,
        COUNT(DISTINCT b.id) as total_bookings,
        COUNT(DISTINCT p.id) as total_payments,
        COALESCE(SUM(p.amount), 0) as total_spent
      FROM users u
      LEFT JOIN bookings b ON u.id = b.user_id
      LEFT JOIN payments p ON u.id = p.user_id AND p.status = 'completed'
      WHERE u.id = $1
      GROUP BY u.id, u.name, u.email, u.phone, u.subscription_plan, u.subscription_status, u.subscription_start_date, u.subscription_end_date, u.created_at
    `;

    const userStatsResult = await pool.query(userStatsQuery, [userId]);
    const userStats = userStatsResult.rows[0];

    // Get recent bookings
    const recentBookingsQuery = `
      SELECT 
        id,
        space_type,
        space_location,
        check_in_date,
        check_out_date,
        booking_status,
        total_amount,
        created_at
      FROM bookings 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 5
    `;

    const recentBookingsResult = await pool.query(recentBookingsQuery, [userId]);

    // Get recent payments
    const recentPaymentsQuery = `
      SELECT 
        p.id,
        p.amount,
        p.currency,
        p.status,
        p.created_at,
        s.plan_name
      FROM payments p
      LEFT JOIN subscriptions s ON p.subscription_id = s.id
      WHERE p.user_id = $1 AND p.status = 'completed'
      ORDER BY p.created_at DESC 
      LIMIT 5
    `;

    const recentPaymentsResult = await pool.query(recentPaymentsQuery, [userId]);

    // Get upcoming bookings
    const upcomingBookingsQuery = `
      SELECT 
        id,
        space_type,
        space_location,
        check_in_date,
        check_out_date,
        booking_status,
        total_amount
      FROM bookings 
      WHERE user_id = $1 AND check_in_date >= CURRENT_DATE AND booking_status = 'confirmed'
      ORDER BY check_in_date ASC 
      LIMIT 3
    `;

    const upcomingBookingsResult = await pool.query(upcomingBookingsQuery, [userId]);

    res.json({
      success: true,
      dashboard: {
        user: {
          id: userStats.id,
          name: userStats.name,
          email: userStats.email,
          phone: userStats.phone,
          subscriptionPlan: userStats.subscription_plan,
          subscriptionStatus: userStats.subscription_status,
          subscriptionStartDate: userStats.subscription_start_date,
          subscriptionEndDate: userStats.subscription_end_date,
          memberSince: userStats.created_at
        },
        stats: {
          totalBookings: parseInt(userStats.total_bookings),
          totalPayments: parseInt(userStats.total_payments),
          totalSpent: parseInt(userStats.total_spent)
        },
        recentBookings: recentBookingsResult.rows,
        recentPayments: recentPaymentsResult.rows,
        upcomingBookings: upcomingBookingsResult.rows
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// Get all user bookings
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    let whereClause = 'WHERE user_id = $1';
    let queryParams = [userId];

    if (status) {
      whereClause += ' AND booking_status = $2';
      queryParams.push(status);
    }

    const bookingsQuery = `
      SELECT 
        id,
        space_type,
        space_location,
        check_in_date,
        check_out_date,
        guest_count,
        total_amount,
        booking_status,
        special_requests,
        created_at
      FROM bookings 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    queryParams.push(limit, offset);

    const bookingsResult = await pool.query(bookingsQuery, queryParams);

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM bookings ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams.slice(0, status ? 2 : 1));
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      bookings: bookingsResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Create new booking
router.post('/bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      spaceType,
      spaceLocation,
      checkInDate,
      checkOutDate,
      guestCount,
      specialRequests
    } = req.body;

    // Validate required fields
    if (!spaceType || !spaceLocation || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: spaceType, spaceLocation, checkInDate, checkOutDate'
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();

    if (checkIn < today) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Calculate total amount (simplified pricing)
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const basePricePerDay = 1500; // ₹1500 per day
    const totalAmount = days * basePricePerDay * (guestCount || 1);

    // Create booking
    const bookingResult = await pool.query(
      `INSERT INTO bookings 
       (user_id, space_type, space_location, check_in_date, check_out_date, guest_count, total_amount, special_requests) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [userId, spaceType, spaceLocation, checkInDate, checkOutDate, guestCount || 1, totalAmount, specialRequests]
    );

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: bookingResult.rows[0]
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Get specific booking
router.get('/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;

    const bookingResult = await pool.query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [bookingId, userId]
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking: bookingResult.rows[0]
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// Update booking
router.put('/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;
    const { specialRequests, guestCount } = req.body;

    // Check if booking exists and belongs to user
    const bookingResult = await pool.query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [bookingId, userId]
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const booking = bookingResult.rows[0];

    // Check if booking can be modified
    if (booking.booking_status === 'cancelled' || booking.booking_status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify cancelled or completed bookings'
      });
    }

    // Update booking
    const updatedBookingResult = await pool.query(
      `UPDATE bookings 
       SET special_requests = COALESCE($1, special_requests),
           guest_count = COALESCE($2, guest_count),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [specialRequests, guestCount, bookingId, userId]
    );

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBookingResult.rows[0]
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
});

// Cancel booking
router.delete('/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;

    // Check if booking exists and belongs to user
    const bookingResult = await pool.query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [bookingId, userId]
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const booking = bookingResult.rows[0];

    // Check if booking can be cancelled
    if (booking.booking_status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.booking_status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed bookings'
      });
    }

    // Cancel booking
    await pool.query(
      'UPDATE bookings SET booking_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['cancelled', bookingId]
    );

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { confirmDelete } = req.body;

    if (!confirmDelete) {
      return res.status(400).json({
        success: false,
        message: 'Account deletion must be confirmed'
      });
    }

    // Begin transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Cancel any active subscriptions
      await client.query(
        'UPDATE subscriptions SET status = $1 WHERE user_id = $2 AND status = $3',
        ['cancelled', userId, 'active']
      );

      // Cancel any future bookings
      await client.query(
        'UPDATE bookings SET booking_status = $1 WHERE user_id = $2 AND booking_status IN ($3, $4) AND check_in_date > CURRENT_DATE',
        ['cancelled', userId, 'pending', 'confirmed']
      );

      // Delete user account (this will cascade delete related records due to foreign key constraints)
      await client.query('DELETE FROM users WHERE id = $1', [userId]);

      await client.query('COMMIT');

      res.json({
        success: true,
        message: 'Account deleted successfully'
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    });
  }
});

// Get user preferences
router.get('/preferences', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // For now, return default preferences
    // In future, you can create a preferences table
    const preferences = {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profileVisibility: 'public',
        showBookingHistory: false
      },
      communication: {
        language: 'en',
        timezone: 'Asia/Kolkata'
      }
    };

    res.json({
      success: true,
      preferences
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preferences'
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;

    // For now, just return success
    // In future, store preferences in database
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences'
    });
  }
});

module.exports = router;