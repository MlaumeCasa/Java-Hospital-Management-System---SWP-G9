const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', 
  validate.sanitizeInput,
  validate.validateUser, 
  authController.register
);

// Login user
router.post('/login', 
  validate.sanitizeInput,
  validate.validateLogin, 
  authController.login
);

// Get current user profile
router.get('/me', 
  auth.authenticate(['patient', 'personnel', 'crew']), 
  authController.getMe
);

module.exports = router;