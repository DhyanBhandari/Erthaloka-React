import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx'; 
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ErthaGramaPage from './pages/ErthaGramaPage.tsx';
import ErthaCANnectPage from './pages/ErthaCANnectPage.tsx';
import ErthaBazaarPage from './pages/ErthaBazaarPage.tsx';
import SustainableCirclePage from './pages/SustainableCirclePage.tsx';
import SubscriptionPlansPage from './pages/SubscriptionPlansPage.tsx';
import UserDashboard from './components/UserDashboard.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { useAnalytics } from './services/analytics.ts';

// Auth Success Handler Component
const AuthSuccessHandler: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('authToken', token);
      // Redirect to dashboard after successful authentication
      window.location.href = '/dashboard';
    } else {
      // If no token, redirect to home
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-white">Completing sign in...</p>
      </div>
    </div>
  );
};

// Auth Error Handler Component
const AuthErrorHandler: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">✗</span>
        </div>
        <h2 className="text-2xl font-bold text-red-400 mb-4">Authentication Failed</h2>
        <p className="text-gray-400 mb-6">There was an error signing you in. Please try again.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');

  // Initialize path from URL
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
    
    // Handle browser back/forward navigation
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when currentPath changes
  useEffect(() => {
    if (window.location.pathname !== currentPath) {
      window.history.pushState(null, '', currentPath);
    }
  }, [currentPath]);

  // Route components mapping
  const routes: { [key: string]: React.FC<{ setCurrentPath?: (path: string) => void }> } = {
    '/': () => <HomePage setCurrentPath={setCurrentPath} />,
    '/erthagrama': ErthaGramaPage,
    '/erthacannect': ErthaCANnectPage,
    '/erthabazaar': ErthaBazaarPage,
    '/sustainablecircle': SustainableCirclePage,
    '/subscription-plans': SubscriptionPlansPage,
    '/dashboard': UserDashboard,
    '/admin': AdminPanel,
    '/auth/success': AuthSuccessHandler,
    '/auth/error': AuthErrorHandler,
    '/erthakriya': () => (
      <div className="pt-20 min-h-screen text-white flex items-center justify-center relative z-10">
        <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20">
          <h1 className="text-4xl">ErthaKriya - Coming Soon</h1>
        </div>
      </div>
    )
  };

  const CurrentComponent = routes[currentPath] || (() => <HomePage setCurrentPath={setCurrentPath} />);

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content wrapped by AuthProvider */}
      <AuthProvider> 
        <AnalyticsWrapper currentPath={currentPath} />
        <div className="relative z-10">
          <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath} />
          <main>
            <CurrentComponent setCurrentPath={setCurrentPath} />
          </main>
          {/* Don't show footer on auth pages or dashboard */}
          {!currentPath.startsWith('/auth') && currentPath !== '/dashboard' && currentPath !== '/admin' && (
            <Footer />
          )}
        </div>
      </AuthProvider>
    </div>
  );
};

// Analytics Wrapper Component
const AnalyticsWrapper: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  const analytics = useAnalytics();

  useEffect(() => {
    // Track page views when path changes
    analytics.trackPageView(currentPath);
  }, [currentPath, analytics]);

  return null;
};

export default App;