import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import CarbonCoinDisplay from './CarbonCoinDisplay.tsx';
import AuthModal from './AuthModal.tsx';

interface NavbarProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath, setCurrentPath }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { label: 'Lokations', path: '#about' },
    { label: 'Ecosystem', path: '#ecosystem' },
    { label: 'Innovation', path: '#innovation' },
    { label: 'Contact', path: '#contact' }
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPath(path);
    }
    setIsOpen(false);
    setShowUserMenu(false);
  };

  const isAdmin = user?.email && [
    'admin@erthaloka.com',
    'rama@erthaloka.com',
    'erthaloka@gmail.com'
  ].includes(user.email);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick('/')}
            className="group flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
            aria-label="Go to homepage"
          >
            <img
              src="../logo4.png"
              alt="Erthaloka Logo"
              className="w-26 h-14 group-hover:animate-pulse"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8 text-md font-medium">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className="relative text-gray-600 hover:text-green-600 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <CarbonCoinDisplay size="sm" />
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                      <button
                        onClick={() => handleNavClick('/dashboard')}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-t-lg transition-colors"
                      >
                        Dashboard
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleNavClick('/admin')}
                          className="w-full text-left px-4 py-2 text-orange-300 hover:text-orange-200 hover:bg-gray-700 transition-colors"
                        >
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-300 hover:text-red-200 hover:bg-gray-700 rounded-b-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-8 h-8 text-green-600" />
            ) : (
              <Menu className="w-8 h-8 text-green-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black text-white px-6 pt-4 pb-6 space-y-4 shadow-md mt-4 rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="block w-full text-left py-2 font-medium text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
            
            {user ? (
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">{user.name}</span>
                  <CarbonCoinDisplay size="sm" />
                </div>
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="block w-full text-left py-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  Dashboard
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="block w-full text-left py-2 text-orange-300 hover:text-orange-200 transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-300 hover:text-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsOpen(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default Navbar;