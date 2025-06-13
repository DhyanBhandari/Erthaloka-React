// utils/index.js
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Generate random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate secure OTP
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

// Generate booking reference
const generateBookingReference = () => {
  const prefix = 'EL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Format phone number
const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle Indian phone numbers
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  } else if (cleaned.length === 13 && cleaned.startsWith('+91')) {
    return cleaned;
  }
  
  return phone; // Return original if format not recognized
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
const isValidPhone = (phone) => {
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// Generate JWT token
const generateJWT = (payload, expiresIn = '7d') => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn }
  );
};

// Verify JWT token
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Format currency
const formatCurrency = (amount, currency = 'INR') => {
  if (currency === 'INR') {
    return `₹${(amount / 100).toLocaleString('en-IN')}`;
  }
  return `${currency} ${amount / 100}`;
};

// Calculate days between dates
const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

// Check if date is in future
const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

// Generate slug from text
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

// Capitalize first letter
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Deep clone object
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Remove sensitive data from user object
const sanitizeUser = (user) => {
  const userCopy = { ...user };
  delete userCopy.password_hash;
  delete userCopy.google_id;
  delete userCopy.razorpay_customer_id;
  return userCopy;
};

// Pagination helper
const getPagination = (page, limit) => {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(limit) || 10));
  const offset = (currentPage - 1) * perPage;
  
  return {
    limit: perPage,
    offset,
    page: currentPage
  };
};

// Build pagination response
const buildPaginationResponse = (data, total, page, limit) => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  const totalPages = Math.ceil(total / perPage);
  
  return {
    data,
    pagination: {
      page: currentPage,
      limit: perPage,
      total: parseInt(total),
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null
    }
  };
};

// Error response helper
const errorResponse = (message, statusCode = 500, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

// Success response helper
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

// Async wrapper for handling errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Sleep function for delays
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if environment is production
const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// Check if environment is development
const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Get client IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
};

// Mask sensitive data
const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email;
  const [username, domain] = email.split('@');
  const maskedUsername = username.length > 2 
    ? username.substring(0, 2) + '*'.repeat(username.length - 2)
    : username;
  return `${maskedUsername}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return phone;
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 6) {
    return cleaned.substring(0, 2) + '*'.repeat(cleaned.length - 4) + cleaned.slice(-2);
  }
  return phone;
};

// Validate required fields
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    throw errorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
  }
};

// File size formatter
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Time ago formatter
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

module.exports = {
  generateRandomString,
  generateOTP,
  generateBookingReference,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  sanitizeInput,
  generateJWT,
  verifyJWT,
  formatCurrency,
  daysBetween,
  isFutureDate,
  generateSlug,
  capitalize,
  deepClone,
  sanitizeUser,
  getPagination,
  buildPaginationResponse,
  errorResponse,
  successResponse,
  asyncHandler,
  sleep,
  isProduction,
  isDevelopment,
  getClientIP,
  maskEmail,
  maskPhone,
  validateRequiredFields,
  formatFileSize,
  timeAgo
};