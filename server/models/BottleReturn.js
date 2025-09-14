const mongoose = require('mongoose');

const bottleReturnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  type: {
    type: String,
    enum: ['scanned', 'manual'],
    default: 'scanned'
  },
  value: {
    type: Number,
    required: true
  },
  qrCode: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'completed'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('BottleReturn', bottleReturnSchema);
