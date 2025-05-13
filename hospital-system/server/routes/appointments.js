const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const logController = require('../controllers/logController');

// Create a new appointment (patients only)
router.post('/', 
  auth.authenticate(['patient']),
  validate.sanitizeInput,
  validate.validateAppointment,
  logController.logAccess,
  appointmentController.createAppointment
);

// Get all appointments (filtered by role)
router.get('/', 
  auth.authenticate(['patient', 'personnel', 'crew']),
  logController.logAccess,
  appointmentController.getAppointments
);

// Update appointment status
router.put('/:id', 
  auth.authenticate(['patient', 'personnel', 'crew']),
  validate.sanitizeInput,
  logController.logAccess,
  appointmentController.updateAppointment
);

// Delete an appointment
router.delete('/:id', 
  auth.authenticate(['patient', 'personnel', 'crew']),
  logController.logAccess,
  appointmentController.deleteAppointment
);

module.exports = router;