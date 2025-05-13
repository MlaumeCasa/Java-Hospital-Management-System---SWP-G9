const Emergency = require('../models/Emergency');

exports.createEmergency = async (req, res) => {
  try {
    const { coordinates, emergencyType } = req.body;
    
    const emergency = new Emergency({
      patient: req.user._id,
      location: {
        type: 'Point',
        coordinates
      },
      emergencyType
    });

    await emergency.save();
    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: 'Error creating emergency' });
  }
};

exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate('patient', 'email createdAt')
      .populate('crew', 'email')
      .sort({ createdAt: -1 });

    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emergencies' });
  }
};

exports.getEmergencyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const emergency = await Emergency.findById(id)
      .populate('patient', 'email createdAt')
      .populate('crew', 'email');
      
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency not found' });
    }
    
    // Patients can only view their own emergencies
    if (req.user.role === 'patient' && 
        emergency.patient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emergency' });
  }
};

exports.assignEmergency = async (req, res) => {
  try {
    const { id } = req.params;
    
    const emergency = await Emergency.findById(id);
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency not found' });
    }
    
    // Only assign if status is pending
    if (emergency.status !== 'pending') {
      return res.status(400).json({ 
        message: `Cannot assign emergency with status: ${emergency.status}` 
      });
    }
    
    emergency.crew = req.user._id;
    emergency.status = 'assigned';
    await emergency.save();
    
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning emergency' });
  }
};

exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'assigned', 'en-route', 'arrived', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const emergency = await Emergency.findById(id);
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency not found' });
    }
    
    // Only the assigned crew can update status
    if (emergency.crew && emergency.crew.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    emergency.status = status;
    await emergency.save();
    
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: 'Error updating emergency status' });
  }
};