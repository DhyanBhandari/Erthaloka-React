// middleware/auth.js
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Verify JWT token middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    // Get user from database
    const userResult = await pool.query(
      'SELECT id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Attach user to request object
    req.user = userResult.rows[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Check subscription middleware
const requireSubscription = (minLevel = null) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Check if user has any active subscription
      if (!req.user.subscription_plan || req.user.subscription_status !== 'active') {
        return res.status(403).json({
          success: false,
          message: 'Active subscription required',
          requiresSubscription: true
        });
      }

      // Check subscription level if minimum level is specified
      if (minLevel) {
        const levels = {
          'resident': 1,
          'ambassador': 2,
          'warrior': 3
        };

        const userLevel = levels[req.user.subscription_plan] || 0;
        const requiredLevel = levels[minLevel] || 999;

        if (userLevel < requiredLevel) {
          return res.status(403).json({
            success: false,
            message: `${minLevel.charAt(0).toUpperCase() + minLevel.slice(1)} subscription or higher required`,
            currentPlan: req.user.subscription_plan,
            requiredPlan: minLevel,
            requiresUpgrade: true
          });
        }
      }

      next();
    } catch (error) {
      console.error('Subscription middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Subscription verification failed'
      });
    }
  };
};

// Admin middleware
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user is admin (you can modify this logic based on your admin system)
    const adminEmails = [
      'admin@erthaloka.com',
      'rama@erthaloka.com'
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

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    const userResult = await pool.query(
      'SELECT id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    req.user = userResult.rows.length > 0 ? userResult.rows[0] : null;
    next();
  } catch (error) {
    // If token is invalid, just proceed without user
    req.user = null;
    next();
  }
};

// Rate limiting by user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    if (requests.has(userId)) {
      const userRequests = requests.get(userId).filter(time => time > windowStart);
      requests.set(userId, userRequests);
    } else {
      requests.set(userId, []);
    }
    
    const userRequests = requests.get(userId);
    
    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
    
    userRequests.push(now);
    next();
  };
};

// Ownership verification middleware
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const resourceId = req.params.id;
      const userId = req.user.id;

      let query;
      switch (resourceType) {
        case 'booking':
          query = 'SELECT user_id FROM bookings WHERE id = $1';
          break;
        case 'subscription':
          query = 'SELECT user_id FROM subscriptions WHERE id = $1';
          break;
        case 'payment':
          query = 'SELECT user_id FROM payments WHERE id = $1';
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid resource type'
          });
      }

      const result = await pool.query(query, [resourceId]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} not found`
        });
      }

      if (result.rows[0].user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You can only access your own resources'
        });
      }

      next();
    } catch (error) {
      console.error('Ownership verification error:', error);
      return res.status(500).json({
        success: false,
        message: 'Ownership verification failed'
      });
    }
  };
};

// Email verification middleware
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (!req.user.email_verified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required',
      requiresEmailVerification: true
    });
  }

  next();
};

// Phone verification middleware
const requirePhoneVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (!req.user.phone_verified) {
    return res.status(403).json({
      success: false,
      message: 'Phone verification required',
      requiresPhoneVerification: true
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireSubscription,
  requireAdmin,
  optionalAuth,
  userRateLimit,
  requireOwnership,
  requireEmailVerification,
  requirePhoneVerification
};