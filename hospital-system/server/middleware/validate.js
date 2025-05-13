const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['patient', 'personnel', 'crew']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateAppointment = [
  body('appointmentTime').isISO8601().toDate().withMessage('Invalid appointment date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateEmergency = [
  body('coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be [longitude, latitude]'),
  body('coordinates.0').isFloat().withMessage('Invalid longitude'),
  body('coordinates.1').isFloat().withMessage('Invalid latitude'),
  body('emergencyType').isIn(['cardiac', 'trauma', 'respiratory']).withMessage('Invalid emergency type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.sanitizeInput = (req, res, next) => {
  // Sanitize request body to prevent MongoDB injection
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove MongoDB operators ($, etc.)
        req.body[key] = req.body[key].replace(/\$/g, '');
      }
    });
  }
  next();
};