const mongoose = require('mongoose');
const BottleReturn = require('./BottleReturn');

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rank: { type: Number, required: true, index: true },
  totalBottles: { type: Number, default: 0, index: true },
  region: { type: String, index: true, default: 'Global' },
  lastUpdated: { type: Date, default: Date.now }
});

// Static method to calculate and update leaderboard
leaderboardSchema.statics.updateLeaderboard = async function() {
  try {
    console.log('Updating leaderboard based on total bottles returned...');
    
    // Get total bottles returned per user
    const userBottleTotals = await BottleReturn.aggregate([
      {
        $group: {
          _id: '$userId',
          totalBottles: { $sum: '$count' }
        }
      },
      {
        $sort: { totalBottles: -1 } // Sort by total bottles descending
      }
    ]);
    
    // Update leaderboard with ranks
    for (let i = 0; i < userBottleTotals.length; i++) {
      const userData = userBottleTotals[i];
      await this.findOneAndUpdate(
        { userId: userData._id },
        {
          userId: userData._id,
          rank: i + 1, // Rank starts from 1
          totalBottles: userData.totalBottles,
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );
    }
    
    console.log(`Leaderboard updated for ${userBottleTotals.length} users`);
    return userBottleTotals.length;
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
};

// Static method to get user's current rank
leaderboardSchema.statics.getUserRank = async function(userId) {
  try {
    const entry = await this.findOne({ userId }).lean();
    return entry ? entry.rank : 0;
  } catch (error) {
    console.error('Error getting user rank:', error);
    return 0;
  }
};

// Static method to get top users
leaderboardSchema.statics.getTopUsers = async function(limit = 10, region = 'Global') {
  try {
    const query = region === 'Global' ? {} : { region };
    return await this.find(query)
      .populate('userId', 'name email')
      .sort({ rank: 1 })
      .limit(limit)
      .lean();
  } catch (error) {
    console.error('Error getting top users:', error);
    return [];
  }
};

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
