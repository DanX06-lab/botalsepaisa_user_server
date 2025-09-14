const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  codeId: { type: String, required: true, unique: true, index: true },
  type: { type: String, required: true },
  value: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QRCode', qrCodeSchema);
