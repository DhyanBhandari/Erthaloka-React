import React, { useState } from 'react';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const GetInTouchSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      const mailtoLink = `mailto:erthaloka@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.name}%0D%0AEmail: ${formData.email}`;
      window.location.href = mailtoLink;
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <section id="contact" className="py-20 text-white relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 text-center mt-2">Get in Touch</h2>
              <div className="space-y-6">
                <p className="flex items-center text-lg animate-fade-in delay-200 hover:text-green-300 transition-colors duration-300 cursor-pointer group">
                  <Phone className="mr-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href="tel:+917829778299" className="text-white hover:text-green-400 transition-colors">
                    +91 78297 78299
                  </a>
                </p>
                <p className="flex items-center text-lg animate-fade-in delay-300 hover:text-green-300 transition-colors duration-300 cursor-pointer group">
                  <Mail className="mr-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href="mailto:erthaloka@gmail.com" className="text-white hover:text-green-400 transition-colors">
                    erthaloka@gmail.com
                  </a>
                </p>
                <p className="flex items-start text-lg animate-fade-in delay-400 hover:text-green-300 transition-colors duration-300 group">
                  <MapPin className="mr-4 text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span>MDR 1115, Kaatu Meetu Vidhi, Kuilapalyam, Near Auroville, Tamilnadu - 605101</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in delay-300">
              <h3 className="text-4xl font-bold mb-6 mt-0">Send us a Message</h3>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-lg font-semibold mb-2 text-white">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center border border-green-700 hover:border-green-500 bg-green-900/50 hover:bg-green-900/70 rounded-lg p-3 transition-all duration-300 group">
                    <User className="w-5 h-5 text-green-400 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-white placeholder-green-200 focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg font-semibold mb-2 text-white">
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center border border-green-700 hover:border-green-500 bg-green-900/50 hover:bg-green-900/70 rounded-lg p-3 transition-all duration-300 group">
                    <Mail className="w-5 h-5 text-green-400 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-white placeholder-green-200 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-lg font-semibold mb-2 text-white">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <div className="border border-green-700 hover:border-green-500 bg-green-900/50 hover:bg-green-900/70 rounded-lg p-3 transition-all duration-300">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full h-32 bg-transparent text-white placeholder-green-200 focus:outline-none resize-vertical"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
                >
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;