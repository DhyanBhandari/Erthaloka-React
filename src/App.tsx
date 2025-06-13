// src/App.tsx
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ErthaGramaPage from './pages/ErthaGramaPage.tsx';
import ErthaCANnectPage from './pages/ErthaCANnectPage.tsx';
import ErthaBazaarPage from './pages/ErthaBazaarPage.tsx';
import SustainableCirclePage from './pages/SustainableCirclePage.tsx';


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

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath} />
        <main>
          <CurrentComponent setCurrentPath={setCurrentPath} /> {/* Pass setCurrentPath to CurrentComponent */}
        </main>
        <Footer />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          background: #000;
        }

        /* Enhanced Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(17, 17, 17, 0.8);
          backdrop-filter: blur(10px);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #22c55e, #16a34a);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #16a34a, #15803d);
        }

        /* Parallax Effect */
        .parallax-bg {
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        /* Glass morphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-dark {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Smooth hover effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Enhanced focus styles */
        button:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #22c55e;
          outline-offset: 2px;
          border-color: #22c55e;
        }

        /* Improved text shadows for better readability */
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .text-shadow-strong {
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        /* Loading state animations */
        .loading-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-black { background-color: #000; }
          .text-white { color: #fff; }
          .text-gray-300 { color: #ddd; }
          .text-gray-400 { color: #ccc; }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-pulse,
          .animate-bounce,
          .animate-spin {
            animation: none;
          }

          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }

          .hover\\:scale-105:hover,
          .hover\\:scale-110:hover {
            transform: none;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .text-4xl { font-size: 2rem; line-height: 1.2; }
          .text-5xl { font-size: 2.5rem; line-height: 1.1; }
          .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
          .py-28 { padding-top: 4rem; padding-bottom: 4rem; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }

          /* Fixed background on mobile */
          .fixed {
            background-attachment: scroll !important;
          }
        }

        @media (max-width: 480px) {
          .text-3xl { font-size: 1.5rem; line-height: 1.2; }
          .text-4xl { font-size: 1.75rem; line-height: 1.2; }
          .text-5xl { font-size: 2rem; line-height: 1.1; }
          .px-6 { padding-left: 1rem; padding-right: 1rem; }
          .py-20 { padding-top: 2rem; padding-bottom: 2rem; }
          .gap-8 { gap: 1rem; }
          .gap-10 { gap: 1.5rem; }
        }

        /* Touch-friendly button sizes for mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
            touch-action: manipulation;
          }

          .text-sm { font-size: 0.9rem; }
          .text-lg { font-size: 1.1rem; }
        }

        /* Improve text readability on all devices */
        p, li {
          line-height: 1.6;
        }

        /* Ensure images are responsive */
        img {
          max-width: 100%;
          height: auto;
        }

        /* Better hover states for touch devices */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover,
          .hover\\:scale-110:hover,
          .hover\\:bg-green-700:hover {
            transform: none;
            background-color: inherit;
          }
        }

        /* Enhanced backdrop blur support */
        @supports (backdrop-filter: blur(10px)) {
          .backdrop-blur-lg {
            backdrop-filter: blur(16px);
          }
          .backdrop-blur-md {
            backdrop-filter: blur(12px);
          }
        }

        /* Fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(10px)) {
          .backdrop-blur-lg,
          .backdrop-blur-md {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default App;