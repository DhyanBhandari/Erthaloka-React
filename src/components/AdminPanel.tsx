import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Edit, 
  Plus, 
  Minus, 
  DollarSign,
  BarChart3,
  UserCheck,
  Coins,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  carbon_coins: number;
  subscription_plan: string;
  subscription_status: string;
  created_at: string;
}

interface AdminStats {
  users: {
    total_users: number;
    active_subscribers: number;
    total_carbon_coins: number;
  };
  subscriptions: Array<{
    subscription_plan: string;
    count: number;
  }>;
  payments: {
    total_payments: number;
    total_revenue: number;
  };
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCoins, setEditingCoins] = useState<{ userId: string; amount: number } | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/users?search=${searchTerm}&page=${currentPage}&limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCoins = async (userId: string, amount: number, action: 'set' | 'add' | 'subtract') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/edit-coins`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, action }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state
        setUsers(users.map(u => u.id === userId ? { ...u, carbon_coins: data.newBalance } : u));
        setEditingCoins(null);
        alert(`Coins updated successfully! New balance: ${data.newBalance}`);
      } else {
        throw new Error('Failed to update coins');
      }
    } catch (error) {
      console.error('Update coins error:', error);
      alert('Failed to update coins');
    }
  };

  // Check if current user is admin
  const isAdmin = user?.email && [
    'admin@erthaloka.com',
    'rama@erthaloka.com',
    'erthaloka@gmail.com'
  ].includes(user.email);

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400">Admin Panel</h1>

        {/* Stats Dashboard */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Total Users</h3>
              </div>
              <p className="text-3xl font-bold text-blue-400">{stats.users.total_users}</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">Active Subscribers</h3>
              </div>
              <p className="text-3xl font-bold text-green-400">{stats.users.active_subscribers}</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Coins className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">Total Carbon Coins</h3>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{stats.users.total_carbon_coins}</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold">Total Revenue</h3>
              </div>
              <p className="text-3xl font-bold text-purple-400">
                ₹{((stats.payments.total_revenue || 0) / 100).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* User Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Carbon Coins</th>
                    <th className="py-3 px-4">Subscription</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4 text-sm">{user.phone || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">{user.carbon_coins}</span>
                          <button
                            onClick={() => setEditingCoins({ userId: user.id, amount: user.carbon_coins })}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.subscription_status === 'active' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {user.subscription_plan || 'None'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateCoins(user.id, 50, 'add')}
                            className="text-green-400 hover:text-green-300"
                            title="Add 50 coins"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateCoins(user.id, 50, 'subtract')}
                            className="text-red-400 hover:text-red-300"
                            title="Remove 50 coins"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Coins Modal */}
        {editingCoins && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Edit Carbon Coins</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">New Amount</label>
                  <input
                    type="number"
                    value={editingCoins.amount}
                    onChange={(e) => setEditingCoins({ ...editingCoins, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateCoins(editingCoins.userId, editingCoins.amount, 'set')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Set Amount
                  </button>
                  <button
                    onClick={() => setEditingCoins(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;