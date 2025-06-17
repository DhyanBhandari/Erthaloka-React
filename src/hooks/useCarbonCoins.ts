import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface CarbonCoinTransaction {
  amount: number;
  type: 'credit' | 'debit';
  reason: string;
  created_at: string;
}

export const useCarbonCoins = () => {
  const { user, refreshUser } = useAuth();
  const [transactions, setTransactions] = useState<CarbonCoinTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Get balance from user context
  const balance = user?.carbonCoins || 0;

  // Fetch transaction history
  const fetchTransactions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/carbon-coins/transactions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Failed to fetch carbon coin transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Spend carbon coins
  const spendCoins = async (amount: number, reason: string) => {
    if (!user || balance < amount) {
      throw new Error('Insufficient carbon coins');
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/carbon-coins/spend`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, reason }),
      });

      if (response.ok) {
        const data = await response.json();
        // Refresh user data to get updated balance
        await refreshUser();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to spend coins');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add carbon coins (for admin or special cases)
  const addCoins = async (amount: number, reason: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/carbon-coins/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, reason }),
      });

      if (response.ok) {
        const data = await response.json();
        // Refresh user data to get updated balance
        await refreshUser();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add coins');
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

  // Fetch transactions when user changes
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return {
    balance,
    transactions,
    loading,
    spendCoins,
    addCoins,
    canAfford,
    formatCoins,
    fetchTransactions,
    refreshBalance: refreshUser,
  };
};