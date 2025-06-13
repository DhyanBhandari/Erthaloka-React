import React, { useState, useEffect } from 'react';
import { 
  Leaf, Users, Target, Sparkles, Zap, Globe, 
  Lightbulb, Heart, TreePine, Recycle, Shield, Rocket, Flame
} from 'lucide-react';

const WhatWeDoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Users className="w-10 h-10" />,
      decorativeIcon: <Heart className="w-6 h-6" />,
      title: "🧑 People",
      subtitle: "Community-Centered Living",
      description: "Building regenerative communities through collaborative systems:",
      items: [
        "Smart eco-villages and habitat design",
        "Community-led governance via DAOs",
        "Time-banking & local collaboration systems",
        "Education for regenerative living"
      ],
      link: "/erthabazaar",
      gradient: "from-blue-500/20 to-cyan-600/20",
      hoverGradient: "group-hover:from-blue-400/30 group-hover:to-cyan-500/30",
      accentColor: "text-blue-400",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Leaf className="w-10 h-10" />,
      decorativeIcon: <TreePine className="w-6 h-6" />,
      title: "🌿 Planet",
      subtitle: "Regenerative Systems",
      description: "Creating circular systems that restore and sustain our environment:",
      items: [
        "Circular food-water-energy systems",
        "Climate-resilient architecture",
        "Real-time environmental monitoring with AI & IoT",
        "Waste-to-resource loops"
      ],
      link: "/erthagrama",
      gradient: "from-green-500/20 to-emerald-600/20",
      hoverGradient: "group-hover:from-green-400/30 group-hover:to-emerald-500/30",
      accentColor: "text-green-400",
      borderColor: "border-green-500/30"
    },
    {
      icon: <Target className="w-10 h-10" />,
      decorativeIcon: <Flame className="w-6 h-6" />,
      title: "🔥 Purpose",
      subtitle: "Values-Driven Innovation",
      description: "Building economies and cultures rooted in regenerative values:",
      items: [
        "Values-driven economies",
        "Local digital currencies",
        "Contribution-based incentives",
        "Cultural regeneration & creative expression"
      ],
      link: "/erthakriya",
      gradient: "from-orange-500/20 to-red-600/20",
      hoverGradient: "group-hover:from-orange-400/30 group-hover:to-red-500/30",
      accentColor: "text-orange-400",
      borderColor: "border-orange-500/30"
    }
  ];

  const floatingIcons = [
    { icon: <Sparkles className="w-4 h-4" />, delay: 0 },
    { icon: <Zap className="w-4 h-4" />, delay: 1000 },
    { icon: <Globe className="w-4 h-4" />, delay: 2000 },
    { icon: <Lightbulb className="w-4 h-4" />, delay: 3000 },
    { icon: <Recycle className="w-4 h-4" />, delay: 4000 },
    { icon: <Flame className="w-4 h-4" />, delay: 5000 }
  ];

  return (
    <section className="py-32 relative z-10 overflow-hidden" id="about">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute animate-float ${
              index % 3 === 0 ? 'text-blue-400/20' : 
              index % 3 === 1 ? 'text-green-400/20' : 
              'text-orange-400/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${item.delay}ms`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-8xl">
        <div className="relative">
          {/* Enhanced Glass Container */}
          <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 shadow-2xl hover:shadow-green-500/20 transition-all duration-700 relative overflow-hidden">
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-orange-500/5 pointer-events-none"></div>
            
            {/* Header Section */}
            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center animate-spin-slow">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-white text-5xl md:text-7xl font-black `}>
                  The EcoVerse Model
                </h2>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center animate-spin-slow" style={{ animationDirection: 'reverse' }}>
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className={`text-xl md:text-2xl text-gray-300 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-up' : 'translate-y-10 opacity-0'}`}>
                  <span className="font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">People. Planet. Purpose.</span> The three foundational forces behind{" "}
                  <span className="font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">ErthaLoka</span> — creating regenerative ecosystems that unite community, environment, and meaningful innovation.
                </p>
              </div>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group transform transition-all duration-700 hover:scale-105 hover:-translate-y-6 cursor-pointer ${isVisible ? 'animate-slide-up' : 'translate-y-20 opacity-0'}`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Enhanced Glass Card */}
                  <div className={`h-full bg-black/60 backdrop-blur-xl ${feature.borderColor} border rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient}`}>
                    
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* Floating Decorative Icon */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className="animate-float" style={{ animationDelay: `${index * 500}ms` }}>
                        {feature.decorativeIcon}
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className={`w-20 h-20 bg-gradient-to-br from-black/80 to-black/40 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border ${feature.borderColor}`}>
                          <div className={`${feature.accentColor} group-hover:scale-110 transition-all duration-300`}>
                            {feature.icon}
                          </div>
                        </div>
                        {/* Icon Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                      <h3 className={`text-3xl font-bold ${feature.accentColor} mb-2 group-hover:scale-105 transition-all duration-300`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 font-semibold text-lg mb-4 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.subtitle}
                      </p>
                      <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3 mb-6">
                      {feature.items.map((item, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-3 text-gray-200 group-hover:text-gray-100 transition-all duration-300 hover:translate-x-2"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <div className={`w-2 h-2 ${feature.accentColor.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Animated Progress Bar */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${feature.gradient.replace('/20', '')} rounded-full transition-all duration-1000 group-hover:w-full w-0`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slide-up {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSection;