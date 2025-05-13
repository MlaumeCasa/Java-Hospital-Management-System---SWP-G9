const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Check for token in headers
      const authHeader = req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      // Verify token
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      // Check if user has required role
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Add user data to request
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

// Rate limiting middleware for specific routes
exports.rateLimit = (windowMs, max) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    // Clean up old requests
    for (const [key, timestamp] of requests.entries()) {
      if (now - timestamp > windowMs) {
        requests.delete(key);
      }
    }
    
    // Count requests from this IP
    const count = Array.from(requests.entries())
      .filter(([key, _]) => key.startsWith(ip))
      .length;
    
    if (count >= max) {
      return res.status(429).json({ 
        message: 'Too many requests, please try again later' 
      });
    }
    
    // Add this request
    const key = `${ip}-${now}`;
    requests.set(key, now);
    
    next();
  };
};