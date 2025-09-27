// middleware/validation.js
const { body, validationResult } = require('express-validator');

// Event validators
exports.validateEventCreate = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be text'),
  body('startDate').notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  body('endDate').notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  body('venue').notEmpty().withMessage('Venue is required'),
  body('organizer').notEmpty().withMessage('Organizer is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateEventUpdate = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString(),
  body('startDate').optional().isISO8601().withMessage('Start date must be valid'),
  body('endDate').optional().isISO8601().withMessage('End date must be valid'),
  body('venue').optional().notEmpty(),
  body('organizer').optional().notEmpty(),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// User validators
exports.validateUserCreate = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateUserUpdate = [
  body('username').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
