// backend/routes/carbonCoins.js
const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('./auth');
const carbonCoinService = require('../services/carbonCoinService');

const router = express.Router();

// Get user's carbon coin balance
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const balance = await carbonCoinService.getBalance(userId);
    
    res.json({
      success: true,
      balance
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get balance'
    });
  }
});

// Get user's transaction history
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 50;
    
    const transactions = await carbonCoinService.getTransactionHistory(userId, limit);
    
    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get transactions'
    });
  }
});

// Spend carbon coins
router.post('/spend', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, reason } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Reason is required'
      });
    }

    const result = await carbonCoinService.deductCoins(userId, amount, reason);
    
    res.json({
      success: true,
      message: result.message,
      newBalance: result.newBalance
    });
  } catch (error) {
    console.error('Spend coins error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to spend coins'
    });
  }
});

// Add carbon coins (for rewards, admin actions, etc.)
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, reason } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Reason is required'
      });
    }

    const result = await carbonCoinService.addCoins(userId, amount, reason);
    
    res.json({
      success: true,
      message: result.message,
      newBalance: result.newBalance
    });
  } catch (error) {
    console.error('Add coins error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add coins'
    });
  }
});

// Grant signup bonus (can be called from registration flow)
router.post('/signup-bonus', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Check if user already received signup bonus
    const existingBonus = await pool.query(
      'SELECT id FROM carbon_coin_transactions WHERE user_id = $1 AND reason = $2',
      [userId, 'Signup bonus']
    );

    if (existingBonus.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Signup bonus already claimed'
      });
    }

    const result = await carbonCoinService.grantSignupBonus(userId);
    
    res.json({
      success: true,
      message: result.message,
      newBalance: result.newBalance
    });
  } catch (error) {
    console.error('Signup bonus error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to grant signup bonus'
    });
  }
});

// Get carbon coin statistics (for dashboard)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's balance
    const balance = await carbonCoinService.getBalance(userId);
    
    // Get transaction statistics
    const statsQuery = await pool.query(`
      SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END), 0) as total_earned,
        COALESCE(SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END), 0) as total_spent,
        COUNT(CASE WHEN type = 'credit' THEN 1 END) as credit_count,
        COUNT(CASE WHEN type = 'debit' THEN 1 END) as debit_count
      FROM carbon_coin_transactions 
      WHERE user_id = $1
    `, [userId]);
    
    const stats = statsQuery.rows[0];
    
    res.json({
      success: true,
      stats: {
        currentBalance: balance,
        totalTransactions: parseInt(stats.total_transactions),
        totalEarned: parseInt(stats.total_earned),
        totalSpent: parseInt(stats.total_spent),
        creditTransactions: parseInt(stats.credit_count),
        debitTransactions: parseInt(stats.debit_count)
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

module.exports = router;