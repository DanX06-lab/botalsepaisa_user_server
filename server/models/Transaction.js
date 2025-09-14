const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  kind: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  type: {
    type: String,
    enum: ['bottle_return', 'withdrawal', 'referral', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'completed'
  },
  referenceId: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
