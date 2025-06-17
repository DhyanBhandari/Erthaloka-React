// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  profilePicture?: string;
  carbonCoins: number; // Add carbon coins
  subscriptionPlan?: 'resident' | 'ambassador' | 'warrior' | null;
  subscriptionStatus?: 'active' | 'inactive' | 'expired';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string) => Promise<{ otpSent: boolean }>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>; // Add refresh function
}

interface RegisterData {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Map backend snake_case to frontend camelCase
        const mappedUser = {
          id: userData.user.id,
          name: userData.user.name,
          email: userData.user.email,
          phone: userData.user.phone,
          profilePicture: userData.user.profile_picture,
          carbonCoins: userData.user.carbon_coins || 0,
          subscriptionPlan: userData.user.subscription_plan,
          subscriptionStatus: userData.user.subscription_status,
          createdAt: userData.user.created_at,
        };
        setUser(mappedUser);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      await fetchUserProfile(token);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        // Map backend response to frontend format
        const mappedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: data.user.profile_picture,
          carbonCoins: data.user.carbonCoins || data.user.carbon_coins || 0,
          subscriptionPlan: data.user.subscriptionPlan || data.user.subscription_plan,
          subscriptionStatus: data.user.subscriptionStatus || data.user.subscription_status,
          createdAt: data.user.createdAt || data.user.created_at,
        };
        setUser(mappedUser);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      // Redirect to Google OAuth endpoint
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (error) {
      throw error;
    }
  };

  const loginWithPhone = async (phone: string): Promise<{ otpSent: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        return { otpSent: true };
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        // Map backend response to frontend format
        const mappedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: data.user.profile_picture,
          carbonCoins: data.user.carbonCoins || data.user.carbon_coins || 0,
          subscriptionPlan: data.user.subscriptionPlan || data.user.subscription_plan,
          subscriptionStatus: data.user.subscriptionStatus || data.user.subscription_status,
          createdAt: data.user.createdAt || data.user.created_at,
        };
        setUser(mappedUser);
      } else {
        throw new Error(data.message || 'OTP verification failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        // Map backend response to frontend format
        const mappedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: data.user.profile_picture,
          carbonCoins: data.user.carbonCoins || data.user.carbon_coins || 50, // Default 50 coins
          subscriptionPlan: data.user.subscriptionPlan || data.user.subscription_plan,
          subscriptionStatus: data.user.subscriptionStatus || data.user.subscription_status,
          createdAt: data.user.createdAt || data.user.created_at,
        };
        setUser(mappedUser);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Map backend response to frontend format
        const mappedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: data.user.profile_picture,
          carbonCoins: data.user.carbonCoins || data.user.carbon_coins || 0,
          subscriptionPlan: data.user.subscriptionPlan || data.user.subscription_plan,
          subscriptionStatus: data.user.subscriptionStatus || data.user.subscription_status,
          createdAt: data.user.createdAt || data.user.created_at,
        };
        setUser(mappedUser);
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginWithGoogle,
    loginWithPhone,
    verifyOTP,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};