const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const jwt = require('jsonwebtoken');

exports.logAccess = async (req, res, next) => {
  try {
    const user = req.user;
    
    // Create log entry
    const logEntry = new LoginLog({
      user: user._id,
      role: user.role,
      action: req.method + ' ' + req.originalUrl
    });
    
    await logEntry.save();
    next();
  } catch (error) {
    // Don't block the request if logging fails
    console.error('Logging error:', error);
    next();
  }
};

exports.getAccessLogs = async (req, res) => {
  try {
    // Only allow admins and personnel to access logs
    if (!['personnel', 'crew'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const logs = await LoginLog.find()
      .populate('user', 'email role')
      .sort({ loginTime: -1 })
      .limit(100);
      
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
};