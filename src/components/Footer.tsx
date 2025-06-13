import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email.trim()) {
      console.log("Newsletter subscription:", email);
      setEmail('');
      alert('Thank you for subscribing!');
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ErthaLoka</h3>
            <p className="text-gray-400">
              A Universe Beyond Sustainability
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#ecosystem" className="text-gray-400 hover:text-white transition-colors">Ecosystem</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">📷</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl">💼</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 ErthaLoka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;