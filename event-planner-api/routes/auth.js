// routes/auth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ensure passport strategies are loaded
require('../passport-setup');

/**
 * @route GET /auth/google
 * @desc Start Google OAuth flow
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // request profile + email
    session: false,              // disable express-session if using JWT
  })
);

/**
 * @route GET /auth/google/callback
 * @desc Google OAuth callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: false,
  }),
  (req, res) => {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env file');
      }

      // Payload for JWT
      const payload = {
        id: req.user._id,
        role: req.user.role,
        username: req.user.username,
        email: req.user.email,
      };

      // Sign JWT (valid for 1 hour)
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // ✅ Respond with JWT + user info
      res.json({
        success: true,
        message: 'Google authentication successful',
        token,
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (err) {
      console.error('JWT error:', err.message);
      res.status(500).json({
        success: false,
        message: 'Failed to generate JWT',
        error: err.message,
      });
    }
  }
);

/**
 * @route GET /auth/failure
 * @desc Handle auth failure
 */
router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentication failed',
  });
});

module.exports = router;
