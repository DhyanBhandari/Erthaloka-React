// src/components/ProtectedRoute.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import AuthModal from './AuthModal.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  minSubscriptionLevel?: 'resident' | 'ambassador' | 'warrior';
  fallbackMessage?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireSubscription = false,
  minSubscriptionLevel,
  fallbackMessage
}) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
            <p className="text-gray-400 mb-6">
              {fallbackMessage || "Please sign in to access this content and join the regenerative revolution."}
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  if (requireSubscription && (!user.subscriptionPlan || user.subscriptionStatus !== 'active')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-orange-500/30">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Subscription Required</h2>
            <p className="text-gray-400 mb-6">
              This content is exclusive to EcoVerse members. Join our community to access regenerative resources and spaces.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/subscription-plans'}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                View Subscription Plans
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (minSubscriptionLevel && user.subscriptionPlan) {
    const levels = { resident: 1, ambassador: 2, warrior: 3 };
    const userLevel = levels[user.subscriptionPlan as keyof typeof levels] || 0;
    const requiredLevel = levels[minSubscriptionLevel];

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
          <div className="max-w-md w-full text-center">
            <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Upgrade Required</h2>
              <p className="text-gray-400 mb-2">
                This content requires {minSubscriptionLevel.charAt(0).toUpperCase() + minSubscriptionLevel.slice(1)} level access or higher.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Your current plan: {user.subscriptionPlan?.charAt(0).toUpperCase() + user.subscriptionPlan?.slice(1)}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/subscription-plans'}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Upgrade Plan
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;