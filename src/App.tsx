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
import AdminPanel from './components/AdminPanel.tsx'; // NEW
import { useAnalytics } from './services/analytics.ts'; // NEW

// Main App Component
const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');

  // Route components mapping
  const routes: { [key: string]: React.FC<{ setCurrentPath?: (path: string) => void }> } = {
    '/': () => <HomePage setCurrentPath={setCurrentPath} />,
    '/erthagrama': ErthaGramaPage,
    '/erthacannect': ErthaCANnectPage,
    '/erthabazaar': ErthaBazaarPage,
    '/sustainablecircle': SustainableCirclePage,
    '/subscription-plans': SubscriptionPlansPage,
    '/dashboard': UserDashboard,
    '/admin': AdminPanel, // NEW ADMIN ROUTE
    '/erthakriya': () => <div className="pt-20 min-h-screen text-white flex items-center justify-center relative z-10"><div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20"><h1 className="text-4xl">ErthaKriya - Coming Soon</h1></div></div>
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
          <Footer />
        </div>
      </AuthProvider>

      {/* Global styles remain the same */}
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