import React, { useState } from 'react';
import {
  Lightbulb, Zap, Mail, Phone, User,
  Building2, Sparkles, Goal, GitBranch, Handshake
} from 'lucide-react';

interface UpcomingSectionProps {
  setCurrentPath: (path: string) => void;
}

const UpcomingSection: React.FC<UpcomingSectionProps> = ({ setCurrentPath }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: ''
  });

  const handleIncubationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIncubationFormSubmit = () => {
    const { name, organization, phone, email } = formData;
    if (name && organization && phone && email) {
      const subject = encodeURIComponent("Incubation Interest - ErthaLoka");
      const body = encodeURIComponent(
        `Name: ${name}\nOrganization: ${organization}\nPhone: ${phone}\nEmail: ${email}\n\nSent from ErthaLoka's incubation signup form.`
      );
      window.location.href = `mailto:erthaloka@gmail.com?subject=${subject}&body=${body}`;
      alert("Submission ready in your email client!");
    } else {
      alert("Please fill all fields before submitting.");
    }
  };

  return (
    <section id="incubation-program" className="py-24 text-white text-center relative z-10 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Orbs */}
      
      

      <div className="container mx-auto px-4 md:px-12 relative z-10 max-w-6xl  ">
        {/* GLASS CONTAINER */}
        <div className="max-w-4xl mx-auto backdrop-blur-md border bg-black/70 backdrop-blur-lg corners rounded-3xl p-10 lg:p-16 border border-purple-800/50 shadow-2xl animate-scale-in-center transition-all duration-700">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in ">
            <Sparkles className="inline-block w-10 h-10 mr-3 text-purple-400 animate-float-pulse" />
            ErthaLoka Incubation Program
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-sm animate-fade-in delay-200">
            Empowering sustainable innovation through mentorship, resources, and partnerships.
          </p>

          {/* Partnership Logos */}
            <p className="text-xl text-white/90 drop-shadow mb-8 bg-gradient-to-br from-black via-gray-900 to-green-900">In partnership with:</p>
          <div className="flex flex-col items-center gap-8 mb-20 ">
            <div className="flex items-center justify-center gap-16 flex-wrap ">
              <a href="#" className="bg-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
                <img src="/logo2.png" alt="ErthaLoka Logo" className="h-32 w-auto object-contain rounded-full" />
              </a>
              <a href="https://aim.atalinnovationmission.nic.in/" target="_blank" rel="noopener noreferrer"
                className="bg-white p-4 rounded-md shadow-xl hover:scale-110 transition-transform">
                <img src="/atal-incubation.png" alt="Atal Incubation Logo" className="h-32 w-auto object-contain rounded-md" />
              </a>
            </div>
          </div>

          {/* Incubation Form */}
          <div className="bg-black/30 border border-purple-700/40 p-10 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold text-cyan-300 mb-8">Apply Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { label: 'Full Name', icon: <User className="w-5 h-5 mr-2" />, name: 'name', placeholder: 'Your Name' },
                { label: 'Organization', icon: <Building2 className="w-5 h-5 mr-2" />, name: 'organization', placeholder: 'Org / Project Name' },
                { label: 'Phone Number', icon: <Phone className="w-5 h-5 mr-2" />, name: 'phone', placeholder: 'e.g. +919876543210' },
                { label: 'Email Address', icon: <Mail className="w-5 h-5 mr-2" />, name: 'email', placeholder: 'example@mail.com' }
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block mb-2 text-white flex items-center">{field.icon} {field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleIncubationFormChange}
                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-green-500 text-white placeholder-white/70 focus:ring focus:ring-green-400 outline-none"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleIncubationFormSubmit}
              className="mt-10 w-full py-4 px-8 bg-gradient-to-r from-purple-600 via-green-500 to-teal-400 rounded-xl text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              Submit & Launch Idea
            </button>
          </div>
        </div>
      </div>

      {/* Global animation styles */}
      <style>{`
        @keyframes float-move-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.02); }
        }
        @keyframes float-move-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.02); }
        }
        .animate-float-move-1 {
          animation: float-move-1 18s ease-in-out infinite;
        }
        .animate-float-move-2 {
          animation: float-move-2 22s ease-in-out infinite;
        }
        .animate-float-pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default UpcomingSection;
