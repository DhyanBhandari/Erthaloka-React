// src/components/UserDashboard.tsx
import React, { useState, useEffect } from 'react'; // Added useEffect import
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Edit3, 
  Check, 
  X,
  Crown,
  Star,
  Leaf,
  MapPin,
  Clock,
  Bell,
  Coins // Import the Coins icon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

const UserDashboard: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  // IMPORTANT: Added 'coins' to the activeTab type
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'bookings' | 'coins' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateUser(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'resident': return <Leaf className="w-6 h-6 text-green-400" />;
      case 'ambassador': return <Star className="w-6 h-6 text-blue-400" />;
      case 'warrior': return <Crown className="w-6 h-6 text-purple-400" />;
      default: return <User className="w-6 h-6 text-gray-400" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'resident': return 'text-green-400';
      case 'ambassador': return 'text-blue-400';
      case 'warrior': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'resident': return 'EcoVerse Resident';
      case 'ambassador': return 'EcoVerse Ambassador';
      case 'warrior': return 'EcoVerse Warrior';
      default: return 'No Active Plan';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-5 h-5" /> },
    // NEW TAB: Carbon Coins
    { id: 'coins', label: 'Carbon Coins', icon: <Coins className="w-5 h-5 text-green-300" /> }, 
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <ProtectedRoute fallbackMessage="Please sign in to access your dashboard">
      <div className="min-h-screen pt-20 bg-black text-white">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Header */}
          <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h1>
                  <div className="flex items-center gap-2 mt-1">
                    {user?.subscriptionPlan && getPlanIcon(user.subscriptionPlan)}
                    <span className={`font-semibold ${getPlanColor(user?.subscriptionPlan || '')}`}>
                      {getPlanName(user?.subscriptionPlan || '')}
                    </span>
                    {/* Display Carbon Coins in header */}
                    {user?.carbonCoins !== undefined && (
                      <span className="ml-4 flex items-center gap-1 text-green-300">
                        <Coins className="w-5 h-5" />
                        {user.carbonCoins} Carbon Coins
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-green-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateProfile}
                            disabled={loading}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm({
                                name: user?.name || '',
                                email: user?.email || '',
                                phone: user?.phone || '',
                              });
                            }}
                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-white">{user?.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-white">{user?.email}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-white">{user?.phone || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-white">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'subscription' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Subscription Details</h2>

                    {user?.subscriptionPlan ? (
                      <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {getPlanIcon(user.subscriptionPlan)}
                              <div>
                                <h3 className={`text-xl font-bold ${getPlanColor(user.subscriptionPlan)}`}>
                                  {getPlanName(user.subscriptionPlan)}
                                </h3>
                                <p className="text-gray-400">Current Plan</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm ${
                              user.subscriptionStatus === 'active' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-red-600 text-white'
                            }`}>
                              {user.subscriptionStatus?.toUpperCase()}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Next Billing Date</p>
                              <p className="text-white font-semibold">Coming Soon</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Billing Amount</p>
                              <p className="text-white font-semibold">
                                {user.subscriptionPlan === 'resident' && '₹999/month'}
                                {user.subscriptionPlan === 'ambassador' && '₹1,999/month'}
                                {user.subscriptionPlan === 'warrior' && '₹4,999/month'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => window.location.href = '/subscription-plans'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                          >
                            Upgrade Plan
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                            Manage Billing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Active Subscription</h3>
                        <p className="text-gray-400 mb-6">Join the EcoVerse to access exclusive spaces and community features.</p>
                        <button
                          onClick={() => window.location.href = '/subscription-plans'}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors"
                        >
                          Choose Your Plan
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Your Bookings</h2>
                    
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
                      <p className="text-gray-400 mb-6">
                        Book your first Lokations space or event to get started.
                      </p>
                      <button
                        onClick={() => window.location.href = '/Lokations'}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors"
                      >
                        Explore Spaces
                      </button>
                    </div>
                  </div>
                )}

                {/* NEW CONTENT: Carbon Coins Tab */}
                {activeTab === 'coins' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Your Carbon Coins</h2>
                    
                    <div className="bg-gradient-to-r from-green-700 to-blue-700 rounded-xl p-6 text-center shadow-lg">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Coins className="w-12 h-12 text-white" />
                        <span className="text-5xl font-extrabold text-white">
                          {user?.carbonCoins !== undefined ? user.carbonCoins : '0'}
                        </span>
                      </div>
                      <p className="text-white text-lg font-semibold">Your Current Carbon Coins Balance</p>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">What are these Carbon Coins?</h3>
                      <p className="text-gray-400 mb-4">
                        Carbon Coins are ErthaLoka's virtual currency designed to reward your commitment to sustainability and community engagement. They are similar to loyalty points or digital rewards you might find on platforms like Zepto, Magicpin, or Swiggy.
                      </p>
                      <p className="text-gray-400 mb-2">
                        You've received an initial **50 Carbon Coins** upon signing up as a welcome bonus!
                      </p>
                      <h4 className="text-lg font-semibold text-white mb-2">How Carbon Coins are added:</h4>
                      <ul className="list-disc list-inside text-gray-400 mb-4">
                        <li>**Sign-up Bonus:** 50 coins upon successful registration.</li>
                        <li>**Future Eco-Actions:** Soon, you'll earn coins for participating in virtual eco-events, contributing to community projects, or achieving sustainability milestones (logic to be added by the platform).</li>
                        <li>**Referrals & Promotions:** Special campaigns may offer bonus coins.</li>
                      </ul>
                      <h4 className="text-lg font-semibold text-white mb-2">How you can use Carbon Coins:</h4>
                      <ul className="list-disc list-inside text-gray-400 mb-4">
                        <li>**Discounts:** Use your coins to get discounts on purchasing virtual "spacing" within Lokations or other platform services.</li>
                        <li>**Exclusive Access:** Unlock access to premium content, events, or community features.</li>
                        <li>**Future Rewards:** More options for using coins will be introduced, including unique digital assets or charitable contributions.</li>
                      </ul>
                      <p className="text-gray-400">
                        Coins will be automatically deducted from your balance when used for eligible purchases or discounts. Keep an eye on this page for updates on new ways to earn and spend your Carbon Coins!
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Account Settings</h2>

                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <div>
                              <h3 className="text-white font-semibold">Email Notifications</h3>
                              <p className="text-gray-400 text-sm">Receive updates about events and community news</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <h3 className="text-white font-semibold">SMS Notifications</h3>
                              <p className="text-gray-400 text-sm">Get booking confirmations and urgent updates</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          These actions cannot be undone. Please proceed with caution.
                        </p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;