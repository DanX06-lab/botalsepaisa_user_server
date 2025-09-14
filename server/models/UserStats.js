const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bottlesReturnedTotal: { type: Number, default: 0 },
  upiEarnedTotal: { type: Number, default: 0 },
  rewardsTotal: { type: Number, default: 0 },
  withdrawalsTotal: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  recyclingRate: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserStats', userStatsSchema);
