const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const BottleReturn = require('./models/BottleReturn');
const Transaction = require('./models/Transaction');
const Leaderboard = require('./models/Leaderboard');

async function addTestData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find YOUR actual user (rahul@gmail.com)
    const testUser = await User.findOne({ email: 'rahul@gmail.com' });
    if (!testUser) {
      console.log('❌ User with email rahul@gmail.com not found!');
      console.log('Make sure you signed up with exactly: rahul@gmail.com');
      return;
    }

    console.log(`✅ Found user: ${testUser.name} (${testUser.email})`);
    const userId = testUser._id;

    // Clear any existing test data
    await BottleReturn.deleteMany({ userId });
    await Transaction.deleteMany({ userId });
    console.log('🧹 Cleared existing data');

    // Add bottle returns
    const bottleReturns = await BottleReturn.create([
      { userId, count: 10, type: 'plastic', value: 50 },
      { userId, count: 5, type: 'glass', value: 30 },
      { userId, count: 8, type: 'plastic', value: 40 }
    ]);
    console.log('✅ Added 3 bottle return records (Total: 23 bottles)');

    // Add transactions
    const transactions = await Transaction.create([
      { userId, kind: 'credit', amount: 50 },
      { userId, kind: 'credit', amount: 30 },
      { userId, kind: 'credit', amount: 40 },
      { userId, kind: 'withdrawal', amount: 20 },
      { userId, kind: 'reward', amount: 10 }
    ]);
    console.log('✅ Added 5 transaction records');
    console.log('   - Credits: ₹120 (50+30+40)');
    console.log('   - Withdrawals: ₹20');  
    console.log('   - Rewards: ₹10');
    console.log('   - Balance: ₹110 (120+10-20)');

    // Update leaderboard
    if (Leaderboard.updateLeaderboard) {
      await Leaderboard.updateLeaderboard();
      console.log('✅ Leaderboard updated');
    }

    console.log('\n🎉 SUCCESS! Test data added successfully!');
    console.log('\n📱 Now login to dashboard with:');
    console.log('   Email: rahul@gmail.com');
    console.log('   Password: [your password]');
    console.log('\n📊 Expected dashboard values:');
    console.log('   - Bottles Returned: 23');
    console.log('   - UPI Earned: ₹120');
    console.log('   - Balance: ₹110');
    console.log('   - Withdrawals: ₹20');
    console.log('   - Rewards: ₹10');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('🔐 Database connection closed');
  }
}

addTestData();
