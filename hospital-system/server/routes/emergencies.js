const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const logController = require('../controllers/logController');

// Create new emergency request (patients only)
router.post('/', 
  auth.authenticate(['patient']),
  validate.sanitizeInput,
  validate.validateEmergency,
  logController.logAccess,
  emergencyController.createEmergency
);

// Get all emergencies (personnel and crew only)
router.get('/', 
  auth.authenticate(['personnel', 'crew']),
  logController.logAccess,
  emergencyController.getEmergencies
);

// Assign crew to emergency
router.put('/:id/assign', 
  auth.authenticate(['crew']),
  validate.sanitizeInput,
  logController.logAccess,
  emergencyController.assignEmergency
);

// Update emergency status
router.put('/:id/status', 
  auth.authenticate(['crew']),
  validate.sanitizeInput,
  logController.logAccess,
  emergencyController.updateEmergencyStatus
);

// Get emergency by ID
router.get('/:id', 
  auth.authenticate(['patient', 'personnel', 'crew']),
  logController.logAccess,
  emergencyController.getEmergencyById
);

module.exports = router;