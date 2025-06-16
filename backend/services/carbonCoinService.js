const pool = require('../config/database');

class CarbonCoinService {
  // Add coins to user
  async addCoins(userId, amount, reason = 'Manual add') {
    try {
      const result = await pool.query(
        'UPDATE users SET carbon_coins = carbon_coins + $1 WHERE id = $2 RETURNING carbon_coins',
        [amount, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      // Log the transaction (optional)
      await this.logTransaction(userId, amount, 'credit', reason);

      return {
        success: true,
        newBalance: result.rows[0].carbon_coins,
        message: `Added ${amount} carbon coins`
      };
    } catch (error) {
      throw new Error(`Failed to add coins: ${error.message}`);
    }
  }

  // Deduct coins from user
  async deductCoins(userId, amount, reason = 'Purchase') {
    try {
      // Check if user has sufficient coins
      const userResult = await pool.query(
        'SELECT carbon_coins FROM users WHERE id = $1',
        [userId]
      );

      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }

      const currentBalance = userResult.rows[0].carbon_coins;
      if (currentBalance < amount) {
        throw new Error('Insufficient carbon coins');
      }

      // Deduct coins
      const result = await pool.query(
        'UPDATE users SET carbon_coins = carbon_coins - $1 WHERE id = $2 RETURNING carbon_coins',
        [amount, userId]
      );

      // Log the transaction
      await this.logTransaction(userId, amount, 'debit', reason);

      return {
        success: true,
        newBalance: result.rows[0].carbon_coins,
        message: `Deducted ${amount} carbon coins`
      };
    } catch (error) {
      throw new Error(`Failed to deduct coins: ${error.message}`);
    }
  }

  // Get user's coin balance
  async getBalance(userId) {
    try {
      const result = await pool.query(
        'SELECT carbon_coins FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return result.rows[0].carbon_coins;
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  // Log coin transactions (optional feature)
  async logTransaction(userId, amount, type, reason) {
    try {
      // Create transactions table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS carbon_coin_transactions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          amount INTEGER NOT NULL,
          type VARCHAR(10) CHECK (type IN ('credit', 'debit')),
          reason VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(
        'INSERT INTO carbon_coin_transactions (user_id, amount, type, reason) VALUES ($1, $2, $3, $4)',
        [userId, amount, type, reason]
      );
    } catch (error) {
      console.error('Failed to log transaction:', error);
      // Don't throw error here as it's optional
    }
  }

  // Get user's transaction history
  async getTransactionHistory(userId, limit = 50) {
    try {
      const result = await pool.query(
        `SELECT amount, type, reason, created_at 
         FROM carbon_coin_transactions 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );

      return result.rows;
    } catch (error) {
      console.error('Failed to get transaction history:', error);
      return [];
    }
  }

  // Grant signup bonus
  async grantSignupBonus(userId) {
    return this.addCoins(userId, 50, 'Signup bonus');
  }
}

module.exports = new CarbonCoinService();