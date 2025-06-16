import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface CarbonCoinTransaction {
  amount: number;
  type: 'credit' | 'debit';
  reason: string;
  created_at: string;
}

export const useCarbonCoins = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<CarbonCoinTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch user's carbon coin balance
  const fetchBalance = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.user.carbonCoins || 0);
      }
    } catch (error) {
      console.error('Failed to fetch carbon coin balance:', error);
    }
  };

  // Spend carbon coins
  const spendCoins = async (amount: number, reason: string) => {
    if (!user || balance < amount) {
      throw new Error('Insufficient carbon coins');
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/spend-coins`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, reason }),
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.newBalance);
        return data;
      } else {
        throw new Error('Failed to spend coins');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user can afford something
  const canAfford = (amount: number): boolean => {
    return balance >= amount;
  };

  // Format coins for display
  const formatCoins = (amount: number): string => {
    return `${amount.toLocaleString()} CC`;
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user]);

  return {
    balance,
    transactions,
    loading,
    spendCoins,
    canAfford,
    formatCoins,
    fetchBalance,
  };
};
