import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath, setCurrentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { label: 'About Us', path: '#about' },
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
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-md' : 'bg-black'
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

          <div className="hidden md:flex space-x-8 text-md font-medium">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="relative text-gray-600 hover:text-green-600 transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                aria-label={`Maps to ${item.label}`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
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
                aria-label={`Maps to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;