const {body, validationResult} = require('express-validator');

//validating the event //
exports.validateEvent = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    body('startDate').notEmpty().withMessage('Start date must be a valid date'),
    body('endDate').notEmpty().withMessage('End date must be a valid date'),
    body('venue').notEmpty().withMessage('Venue is required'),
    body('organizer').notEmpty().withMessage('Organizer is required'),
    body('capacity').isInt({min: 1}).withMessage('Capacity must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

exports.validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// --- END --- IGNORE --- END ---


