import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


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
<div className="flex flex-col items-center text-center">
  <img src="/logo4.png" alt="ErthaLoka Logo" className="w-30 h-26 mb-2" />
  <p className="text-gray-400">A Universe Beyond Sustainability</p>
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
          {/* Social Links */}
<div>
  <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
  <div className="flex space-x-4 text-2xl">
    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF /></a>
    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter /></a>
    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram /></a>
    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedinIn /></a>
  </div>
</div>


          {/* Newsletter */}
         
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 ErthaLoka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;