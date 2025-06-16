// =============================================
// 🆕 NEW FILE: backend/scripts/carbon-coins-migration.js
// =============================================
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'erthaloka_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const addCarbonCoinsToUsers = async () => {
  try {
    console.log('🪙 Adding carbon_coins to users table...');
    
    // Add carbon_coins column
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS carbon_coins INTEGER DEFAULT 0
    `);
    
    // Give existing users 50 coins
    await pool.query(`
      UPDATE users 
      SET carbon_coins = 50 
      WHERE carbon_coins = 0 OR carbon_coins IS NULL
    `);
    
    console.log('✅ Carbon coins migration completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await pool.end();
  }
};

if (require.main === module) {
  addCarbonCoinsToUsers();
}

module.exports = { addCarbonCoinsToUsers };