// scripts/migrate.js
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

const migrations = [
  {
    version: '001',
    name: 'Initial Schema',
    up: `
      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(20) UNIQUE,
        password_hash VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,
        profile_picture VARCHAR(500),
        subscription_plan VARCHAR(50) CHECK (subscription_plan IN ('resident', 'ambassador', 'warrior')),
        subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'expired', 'cancelled')),
        subscription_start_date TIMESTAMP,
        subscription_end_date TIMESTAMP,
        razorpay_customer_id VARCHAR(255),
        email_verified BOOLEAN DEFAULT FALSE,
        phone_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create subscriptions table
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan_id VARCHAR(50) NOT NULL,
        plan_name VARCHAR(100) NOT NULL,
        amount INTEGER NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled', 'expired')),
        razorpay_subscription_id VARCHAR(255),
        razorpay_plan_id VARCHAR(255),
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create payments table
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE CASCADE,
        razorpay_payment_id VARCHAR(255) UNIQUE,
        razorpay_order_id VARCHAR(255),
        razorpay_signature VARCHAR(500),
        amount INTEGER NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
        payment_method VARCHAR(50),
        failure_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create OTP table
      CREATE TABLE IF NOT EXISTS otp_verifications (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        attempts INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create user sessions table
      CREATE TABLE IF NOT EXISTS user_sessions (
        sid VARCHAR PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      );

      -- Create bookings table
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        space_type VARCHAR(50) NOT NULL,
        space_location VARCHAR(100) NOT NULL,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        guest_count INTEGER DEFAULT 1,
        total_amount INTEGER,
        booking_status VARCHAR(20) DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed')),
        special_requests TEXT,
        booking_reference VARCHAR(50) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `,
    down: `
      DROP TABLE IF EXISTS bookings;
      DROP TABLE IF EXISTS user_sessions;
      DROP TABLE IF EXISTS otp_verifications;
      DROP TABLE IF EXISTS payments;
      DROP TABLE IF EXISTS subscriptions;
      DROP TABLE IF EXISTS users;
    `
  },
  {
    version: '002',
    name: 'Add Indexes',
    up: `
      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
      CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
      CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
      CREATE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);
      CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);
      CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_verifications(expires_at);
      CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in_date, check_out_date);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
    `,
    down: `
      DROP INDEX IF EXISTS idx_users_email;
      DROP INDEX IF EXISTS idx_users_phone;
      DROP INDEX IF EXISTS idx_users_google_id;
      DROP INDEX IF EXISTS idx_users_subscription_status;
      DROP INDEX IF EXISTS idx_subscriptions_user_id;
      DROP INDEX IF EXISTS idx_subscriptions_status;
      DROP INDEX IF EXISTS idx_payments_user_id;
      DROP INDEX IF EXISTS idx_payments_razorpay_payment_id;
      DROP INDEX IF EXISTS idx_otp_phone;
      DROP INDEX IF EXISTS idx_otp_expires_at;
      DROP INDEX IF EXISTS idx_bookings_user_id;
      DROP INDEX IF EXISTS idx_bookings_dates;
      DROP INDEX IF EXISTS idx_bookings_status;
    `
  },
  {
    version: '003',
    name: 'Add Triggers and Functions',
    up: `
      -- Create trigger function to update updated_at timestamp
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Apply trigger to tables
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at 
      BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
      CREATE TRIGGER update_subscriptions_updated_at 
      BEFORE UPDATE ON subscriptions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
      CREATE TRIGGER update_payments_updated_at 
      BEFORE UPDATE ON payments
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
      CREATE TRIGGER update_bookings_updated_at 
      BEFORE UPDATE ON bookings
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      -- Function to generate booking reference
      CREATE OR REPLACE FUNCTION generate_booking_reference()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.booking_reference = 'EL' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Apply booking reference trigger
      DROP TRIGGER IF EXISTS generate_booking_reference_trigger ON bookings;
      CREATE TRIGGER generate_booking_reference_trigger
      BEFORE INSERT ON bookings
      FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();
    `,
    down: `
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
      DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
      DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
      DROP TRIGGER IF EXISTS generate_booking_reference_trigger ON bookings;
      DROP FUNCTION IF EXISTS update_updated_at_column();
      DROP FUNCTION IF EXISTS generate_booking_reference();
    `
  }
];

// Migration tracking table
const createMigrationsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      version VARCHAR(10) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Get executed migrations
const getExecutedMigrations = async () => {
  try {
    const result = await pool.query('SELECT version FROM migrations ORDER BY version');
    return result.rows.map(row => row.version);
  } catch (error) {
    return [];
  }
};

// Execute migration
const executeMigration = async (migration, direction = 'up') => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    if (direction === 'up') {
      console.log(`⬆️  Migrating ${migration.version}: ${migration.name}`);
      await client.query(migration.up);
      await client.query(
        'INSERT INTO migrations (version, name) VALUES ($1, $2) ON CONFLICT (version) DO NOTHING',
        [migration.version, migration.name]
      );
    } else {
      console.log(`⬇️  Rolling back ${migration.version}: ${migration.name}`);
      await client.query(migration.down);
      await client.query('DELETE FROM migrations WHERE version = $1', [migration.version]);
    }
    
    await client.query('COMMIT');
    console.log(`✅ ${direction === 'up' ? 'Migrated' : 'Rolled back'} ${migration.version}: ${migration.name}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Error ${direction === 'up' ? 'migrating' : 'rolling back'} ${migration.version}:`, error.message);
    throw error;
  } finally {
    client.release();
  }
};

// Run migrations
const runMigrations = async (direction = 'up') => {
  try {
    await createMigrationsTable();
    const executedMigrations = await getExecutedMigrations();
    
    if (direction === 'up') {
      // Run pending migrations
      const pendingMigrations = migrations.filter(
        migration => !executedMigrations.includes(migration.version)
      );
      
      if (pendingMigrations.length === 0) {
        console.log('✅ No pending migrations');
        return;
      }
      
      console.log(`🚀 Running ${pendingMigrations.length} pending migrations...`);
      
      for (const migration of pendingMigrations) {
        await executeMigration(migration, 'up');
      }
      
      console.log('🎉 All migrations completed successfully!');
    } else {
      // Rollback latest migration
      if (executedMigrations.length === 0) {
        console.log('✅ No migrations to rollback');
        return;
      }
      
      const latestVersion = executedMigrations[executedMigrations.length - 1];
      const migrationToRollback = migrations.find(m => m.version === latestVersion);
      
      if (migrationToRollback) {
        await executeMigration(migrationToRollback, 'down');
        console.log('🎉 Rollback completed successfully!');
      } else {
        console.log('❌ Migration to rollback not found');
      }
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'up':
    runMigrations('up');
    break;
  case 'down':
    runMigrations('down');
    break;
  case 'status':
    (async () => {
      try {
        await createMigrationsTable();
        const executedMigrations = await getExecutedMigrations();
        
        console.log('\n📊 Migration Status:');
        console.log('==================');
        
        migrations.forEach(migration => {
          const status = executedMigrations.includes(migration.version) ? '✅' : '⏳';
          console.log(`${status} ${migration.version}: ${migration.name}`);
        });
        
        console.log(`\nExecuted: ${executedMigrations.length}/${migrations.length} migrations\n`);
      } catch (error) {
        console.error('❌ Error checking migration status:', error);
      } finally {
        await pool.end();
      }
    })();
    break;
  default:
    console.log(`
🗄️  ErthaLoka Database Migration Tool

Usage: node scripts/migrate.js <command>

Commands:
  up     - Run all pending migrations
  down   - Rollback the latest migration
  status - Show migration status

Examples:
  node scripts/migrate.js up
  node scripts/migrate.js down
  node scripts/migrate.js status
    `);
    process.exit(1);
}