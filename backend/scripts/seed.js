// scripts/seed.js
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'erthaloka_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Sample data
const sampleUsers = [
  {
    name: 'ErthaLoka Admin',
    email: 'admin@erthaloka.com',
    password: 'admin123',
    subscription_plan: 'warrior',
    subscription_status: 'active'
  },
  {
    name: 'Demo Resident',
    email: 'resident@demo.com',
    password: 'demo123',
    subscription_plan: 'resident',
    subscription_status: 'active'
  },
  {
    name: 'Demo Ambassador',
    email: 'ambassador@demo.com',
    password: 'demo123',
    subscription_plan: 'ambassador',
    subscription_status: 'active'
  },
  {
    name: 'Demo Warrior',
    email: 'warrior@demo.com',
    password: 'demo123',
    subscription_plan: 'warrior',
    subscription_status: 'active'
  },
  {
    name: 'Ramachandran KP',
    email: 'rama@erthaloka.com',
    password: 'founder123',
    subscription_plan: 'warrior',
    subscription_status: 'active'
  }
];

const sampleBookings = [
  {
    space_type: 'Private Room',
    space_location: 'Bengaluru',
    check_in_date: '2025-07-15',
    check_out_date: '2025-07-20',
    guest_count: 1,
    total_amount: 7500,
    booking_status: 'confirmed'
  },
  {
    space_type: 'Shared Space',
    space_location: 'Near Auroville',
    check_in_date: '2025-08-01',
    check_out_date: '2025-08-07',
    guest_count: 2,
    total_amount: 15000,
    booking_status: 'pending'
  },
  {
    space_type: 'Co-working Space',
    space_location: 'Puducherry',
    check_in_date: '2025-06-20',
    check_out_date: '2025-06-25',
    guest_count: 1,
    total_amount: 5000,
    booking_status: 'completed'
  }
];

// Seed functions
const seedUsers = async () => {
  try {
    console.log('👤 Seeding users...');
    
    for (const userData of sampleUsers) {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );
      
      if (existingUser.rows.length > 0) {
        console.log(`   ⏭️  User ${userData.email} already exists, skipping...`);
        continue;
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, 12);
      
      // Set subscription dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      
      // Insert user
      const result = await pool.query(
        `INSERT INTO users 
         (name, email, password_hash, subscription_plan, subscription_status, subscription_start_date, subscription_end_date, email_verified) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE) 
         RETURNING id, email`,
        [
          userData.name,
          userData.email,
          passwordHash,
          userData.subscription_plan,
          userData.subscription_status,
          startDate,
          endDate
        ]
      );
      
      console.log(`   ✅ Created user: ${result.rows[0].email} (ID: ${result.rows[0].id})`);
    }
    
    console.log('✅ Users seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const seedSubscriptions = async () => {
  try {
    console.log('💳 Seeding subscriptions...');
    
    // Get users with active subscriptions
    const usersResult = await pool.query(
      'SELECT id, subscription_plan FROM users WHERE subscription_status = $1',
      ['active']
    );
    
    const planPrices = {
      resident: 99900,
      ambassador: 199900,
      warrior: 499900
    };
    
    const planNames = {
      resident: 'EcoVerse Resident',
      ambassador: 'EcoVerse Ambassador',
      warrior: 'EcoVerse Warrior'
    };
    
    for (const user of usersResult.rows) {
      // Check if subscription already exists
      const existingSubscription = await pool.query(
        'SELECT id FROM subscriptions WHERE user_id = $1',
        [user.id]
      );
      
      if (existingSubscription.rows.length > 0) {
        console.log(`   ⏭️  Subscription for user ${user.id} already exists, skipping...`);
        continue;
      }
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      
      const result = await pool.query(
        `INSERT INTO subscriptions 
         (user_id, plan_id, plan_name, amount, currency, status, start_date, end_date) 
         VALUES ($1, $2, $3, $4, 'INR', 'active', $5, $6) 
         RETURNING id`,
        [
          user.id,
          user.subscription_plan,
          planNames[user.subscription_plan],
          planPrices[user.subscription_plan],
          startDate,
          endDate
        ]
      );
      
      console.log(`   ✅ Created subscription for user ${user.id}: ${planNames[user.subscription_plan]} (ID: ${result.rows[0].id})`);
    }
    
    console.log('✅ Subscriptions seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding subscriptions:', error);
    throw error;
  }
};

const seedBookings = async () => {
  try {
    console.log('🏠 Seeding bookings...');
    
    // Get sample users for bookings
    const usersResult = await pool.query(
      'SELECT id FROM users WHERE email LIKE $1 LIMIT 3',
      ['%demo.com']
    );
    
    if (usersResult.rows.length === 0) {
      console.log('   ⚠️  No demo users found, skipping bookings...');
      return;
    }
    
    for (let i = 0; i < sampleBookings.length && i < usersResult.rows.length; i++) {
      const bookingData = sampleBookings[i];
      const userId = usersResult.rows[i].id;
      
      // Check if booking already exists
      const existingBooking = await pool.query(
        'SELECT id FROM bookings WHERE user_id = $1 AND space_type = $2',
        [userId, bookingData.space_type]
      );
      
      if (existingBooking.rows.length > 0) {
        console.log(`   ⏭️  Booking for user ${userId} already exists, skipping...`);
        continue;
      }
      
      const result = await pool.query(
        `INSERT INTO bookings 
         (user_id, space_type, space_location, check_in_date, check_out_date, guest_count, total_amount, booking_status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING id, booking_reference`,
        [
          userId,
          bookingData.space_type,
          bookingData.space_location,
          bookingData.check_in_date,
          bookingData.check_out_date,
          bookingData.guest_count,
          bookingData.total_amount,
          bookingData.booking_status
        ]
      );
      
      console.log(`   ✅ Created booking: ${result.rows[0].booking_reference} for user ${userId}`);
    }
    
    console.log('✅ Bookings seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding bookings:', error);
    throw error;
  }
};

const seedPayments = async () => {
  try {
    console.log('💰 Seeding payments...');
    
    // Get subscriptions without payments
    const subscriptionsResult = await pool.query(`
      SELECT s.id, s.user_id, s.amount FROM subscriptions s
      LEFT JOIN payments p ON s.id = p.subscription_id
      WHERE p.id IS NULL
      LIMIT 5
    `);
    
    for (const subscription of subscriptionsResult.rows) {
      const result = await pool.query(
        `INSERT INTO payments 
         (user_id, subscription_id, amount, currency, status, payment_method, razorpay_payment_id, razorpay_order_id) 
         VALUES ($1, $2, $3, 'INR', 'completed', 'card', $4, $5) 
         RETURNING id`,
        [
          subscription.user_id,
          subscription.id,
          subscription.amount,
          `pay_${Math.random().toString(36).substr(2, 9)}`, // Mock Razorpay payment ID
          `order_${Math.random().toString(36).substr(2, 9)}` // Mock Razorpay order ID
        ]
      );
      
      console.log(`   ✅ Created payment for subscription ${subscription.id} (Payment ID: ${result.rows[0].id})`);
    }
    
    console.log('✅ Payments seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding payments:', error);
    throw error;
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    await seedUsers();
    console.log('');
    
    await seedSubscriptions();
    console.log('');
    
    await seedBookings();
    console.log('');
    
    await seedPayments();
    console.log('');
    
    console.log('🎉 Database seeding completed successfully!');
    
    // Display summary
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const subscriptionCount = await pool.query('SELECT COUNT(*) FROM subscriptions');
    const bookingCount = await pool.query('SELECT COUNT(*) FROM bookings');
    const paymentCount = await pool.query('SELECT COUNT(*) FROM payments');
    
    console.log('\n📊 Summary:');
    console.log('===========');
    console.log(`👤 Users: ${userCount.rows[0].count}`);
    console.log(`💳 Subscriptions: ${subscriptionCount.rows[0].count}`);
    console.log(`🏠 Bookings: ${bookingCount.rows[0].count}`);
    console.log(`💰 Payments: ${paymentCount.rows[0].count}`);
    console.log('');
    
    // Display demo credentials
    console.log('🔑 Demo Credentials:');
    console.log('==================');
    console.log('Admin: admin@erthaloka.com / admin123');
    console.log('Resident: resident@demo.com / demo123');
    console.log('Ambassador: ambassador@demo.com / demo123');
    console.log('Warrior: warrior@demo.com / demo123');
    console.log('');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Clear database function
const clearDatabase = async () => {
  try {
    console.log('🗑️  Clearing database...\n');
    
    // Delete in reverse order due to foreign key constraints
    await pool.query('DELETE FROM payments');
    console.log('   ✅ Cleared payments');
    
    await pool.query('DELETE FROM bookings');
    console.log('   ✅ Cleared bookings');
    
    await pool.query('DELETE FROM subscriptions');
    console.log('   ✅ Cleared subscriptions');
    
    await pool.query('DELETE FROM otp_verifications');
    console.log('   ✅ Cleared OTP verifications');
    
    await pool.query('DELETE FROM users');
    console.log('   ✅ Cleared users');
    
    console.log('\n🧹 Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'seed':
    seedDatabase();
    break;
  case 'clear':
    clearDatabase();
    break;
  case 'reset':
    (async () => {
      await clearDatabase();
      await seedDatabase();
    })();
    break;
  default:
    console.log(`
🌱 ErthaLoka Database Seeding Tool

Usage: node scripts/seed.js <command>

Commands:
  seed  - Populate database with sample data
  clear - Clear all data from database
  reset - Clear database and re-seed with sample data

Examples:
  node scripts/seed.js seed
  node scripts/seed.js clear
  node scripts/seed.js reset

Note: Make sure to run migrations first with:
  node scripts/migrate.js up
    `);
    process.exit(1);
}