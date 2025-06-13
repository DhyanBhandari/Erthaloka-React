// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('./database');

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
}, async (payload, done) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at FROM users WHERE id = $1',
      [payload.userId]
    );

    if (result.rows.length > 0) {
      return done(null, result.rows[0]);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE google_id = $1 OR email = $2',
      [profile.id, profile.emails[0].value]
    );

    if (existingUser.rows.length > 0) {
      // User exists, update their information if needed
      const user = existingUser.rows[0];
      
      // Update Google ID if it's not set
      if (!user.google_id) {
        await pool.query(
          'UPDATE users SET google_id = $1, profile_picture = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
          [profile.id, profile.photos[0]?.value, user.id]
        );
      }

      return done(null, user);
    } else {
      // Create new user
      const newUser = await pool.query(
        `INSERT INTO users (name, email, google_id, profile_picture) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at`,
        [
          profile.displayName,
          profile.emails[0].value,
          profile.id,
          profile.photos[0]?.value || null
        ]
      );

      return done(null, newUser.rows[0]);
    }
  } catch (error) {
    console.error('Google Strategy Error:', error);
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, profile_picture, subscription_plan, subscription_status, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;