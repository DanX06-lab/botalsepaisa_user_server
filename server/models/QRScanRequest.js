const mongoose = require('mongoose');

const qrScanRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  qrCode: { 
    type: String, 
    required: true 
  },
  qrType: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  adminComment: { 
    type: String 
  },
  metadata: { 
    type: mongoose.Schema.Types.Mixed 
  },
  processedAt: { 
    type: Date 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('QRScanRequest', qrScanRequestSchema);
