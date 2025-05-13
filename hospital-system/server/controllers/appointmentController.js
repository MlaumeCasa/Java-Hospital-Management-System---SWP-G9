const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { appointmentTime } = req.body;
    
    if (!appointmentTime) {
      return res.status(400).json({ message: 'Appointment time is required' });
    }
    
    // Validate the date format
    const dateObj = new Date(appointmentTime);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid appointment time format' });
    }
    
    // Ensure only patients can book appointments
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can book appointments' });
    }
    
    const appointment = new Appointment({
      patient: req.user._id,
      appointmentTime: dateObj
    });
    
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let appointments;
    
    // Patients can only see their own appointments
    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patient: req.user._id })
        .sort({ appointmentTime: 1 });
    } 
    // Personnel can see all appointments
    else if (['personnel', 'crew'].includes(req.user.role)) {
      appointments = await Appointment.find()
        .populate('patient', 'email')
        .sort({ appointmentTime: 1 });
    }
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!['scheduled', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Patients can only cancel their own appointments
    if (req.user.role === 'patient') {
      if (appointment.patient.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Patients can only cancel appointments
      if (status !== 'cancelled') {
        return res.status(403).json({ message: 'Patients can only cancel appointments' });
      }
    }
    
    appointment.status = status;
    await appointment.save();
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Patients can only delete their own appointments
    if (req.user.role === 'patient' && 
        appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await appointment.remove();
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};