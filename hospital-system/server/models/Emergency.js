const mongoose = require ('mongoose');

const emergencySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  emergencyType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  crew: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

emergencySchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Emergency', emergencySchema);