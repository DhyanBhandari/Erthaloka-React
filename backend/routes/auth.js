// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs for auth endpoints
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 OTP requests per minute
  message: 'Too many OTP requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to send OTP (mock implementation)
const sendOTP = async (phone, otp) => {
  // In production, integrate with SMS service like Twilio, MSG91, etc.
  console.log(`📱 OTP for ${phone}: ${otp}`);
  
  // Mock implementation - in production replace with actual SMS service
  return Promise.resolve(true);
};

// Validation middleware
const validateRegistration = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Invalid email format'),
  body('phone').optional().isMobilePhone('en-IN').withMessage('Invalid phone number format'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validatePhone = [
  body('phone').isMobilePhone('en-IN').withMessage('Invalid phone number format'),
];

// Register endpoint
router.post('/register', authLimiter, validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, password } = req.body;

    // Check if email or phone already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 12);
    }

    // Create user
    const newUser = await pool.query(
      `INSERT INTO users (name, email, phone, password_hash) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, phone, subscription_plan, subscription_status, created_at`,
      [name, email, phone, passwordHash]
    );

    const user = newUser.rows[0];
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        subscriptionPlan: user.subscription_plan,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login endpoint
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const userResult = await pool.query(
      'SELECT id, name, email, phone, password_hash, subscription_plan, subscription_status, created_at FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = userResult.rows[0];

    // Check password
    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        message: 'Please use Google login or phone verification'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        subscriptionPlan: user.subscription_plan,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Send OTP endpoint
router.post('/send-otp', otpLimiter, validatePhone, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTP for this phone
    await pool.query('DELETE FROM otp_verifications WHERE phone = $1', [phone]);

    // Store OTP
    await pool.query(
      'INSERT INTO otp_verifications (phone, otp, expires_at) VALUES ($1, $2, $3)',
      [phone, otp, expiresAt]
    );

    // Send OTP
    await sendOTP(phone, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', authLimiter, async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required'
      });
    }

    // Check OTP
    const otpResult = await pool.query(
      'SELECT * FROM otp_verifications WHERE phone = $1 AND otp = $2 AND expires_at > NOW() AND verified = FALSE',
      [phone, otp]
    );

    if (otpResult.rows.length === 0) {
      // Increment attempts
      await pool.query(
        'UPDATE otp_verifications SET attempts = attempts + 1 WHERE phone = $1',
        [phone]
      );

      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark OTP as verified
    await pool.query(
      'UPDATE otp_verifications SET verified = TRUE WHERE phone = $1',
      [phone]
    );

    // Check if user exists
    let userResult = await pool.query(
      'SELECT id, name, email, phone, subscription_plan, subscription_status, created_at FROM users WHERE phone = $1',
      [phone]
    );

    let user;
    if (userResult.rows.length === 0) {
      // Create new user
      const newUser = await pool.query(
        `INSERT INTO users (name, phone) 
         VALUES ($1, $2) 
         RETURNING id, name, email, phone, subscription_plan, subscription_status, created_at`,
        [`User ${phone.slice(-4)}`, phone]
      );
      user = newUser.rows[0];
    } else {
      user = userResult.rows[0];
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Phone verified successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        subscriptionPlan: user.subscription_plan,
        subscriptionStatus: user.subscription_status,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed'
    });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const token = generateToken(req.user.id);
      
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error`);
    }
  }
);

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production', async (err, payload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    try {
      const userResult = await pool.query(
        'SELECT id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at FROM users WHERE id = $1',
        [payload.userId]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = userResult.rows[0];
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Authentication failed'
      });
    }
  });
};

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      profilePicture: req.user.profile_picture,
      subscriptionPlan: req.user.subscription_plan,
      subscriptionStatus: req.user.subscription_status,
      createdAt: req.user.created_at
    }
  });
});

// Update user profile
router.put('/update-profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.id;

    // Check if email or phone is already taken by another user
    if (email || phone) {
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE (email = $1 OR phone = $2) AND id != $3',
        [email, phone, userId]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email or phone number already taken'
        });
      }
    }

    // Update user
    const updatedUser = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email), 
           phone = COALESCE($3, phone),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 
       RETURNING id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at`,
      [name, email, phone, userId]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.rows[0].id,
        name: updatedUser.rows[0].name,
        email: updatedUser.rows[0].email,
        phone: updatedUser.rows[0].phone,
        profilePicture: updatedUser.rows[0].profile_picture,
        subscriptionPlan: updatedUser.rows[0].subscription_plan,
        subscriptionStatus: updatedUser.rows[0].subscription_status,
        createdAt: updatedUser.rows[0].created_at
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

module.exports = { router, authenticateToken };