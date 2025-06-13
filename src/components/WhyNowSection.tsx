import React from 'react';
import { motion } from 'framer-motion'; // motion is still used for card animations
import { AlertCircle, HardDrive, Rocket, Lightbulb, CheckCircle, Sparkles } from 'lucide-react'; // Icons

const WhyNowSection: React.FC = () => {
  const reasons = [
    {
      icon: AlertCircle,
      title: 'Global Ecological Collapse',
      description: 'The urgent need to reverse environmental degradation and foster biodiversity.',
      color: 'text-red-400',
      borderColor: 'border-red-600/40',
      shadowColor: 'shadow-red-500/30',
    },
    {
      icon: HardDrive,
      title: 'Failing Centralized Systems',
      description: 'Inefficiencies and inequities of traditional economic and governance models.',
      color: 'text-orange-400',
      borderColor: 'border-orange-600/40',
      shadowColor: 'shadow-orange-500/30',
    },
    {
      icon: Rocket,
      title: 'Rise of Digital Tools',
      description: 'Emergence of DAOs, DeFi, and AI offers unprecedented tools for new societies.',
      color: 'text-blue-400',
      borderColor: 'border-blue-600/40',
      shadowColor: 'shadow-blue-500/30',
    },
    {
      icon: Lightbulb,
      title: 'Conscious Generation',
      description: 'A growing global awareness demanding sustainable and equitable alternatives.',
      color: 'text-yellow-400',
      borderColor: 'border-yellow-600/40',
      shadowColor: 'shadow-yellow-500/30',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    // Removed bg-gray-900 and overflow-hidden from section
    <section id="why-now" className="py-24 text-white relative flex items-center justify-center">
      {/* Removed Background radial gradient div */}

      {/* Glassmorphism effect applied to this content container */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10
                  bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-12 lg:p-16 shadow-3xl">
        <h2 // Changed from motion.h2 to h2
          className="text-5xl md:text-7xl font-extrabold text-center mb-16
                     text-teal-400 leading-tight" // Enhanced text: solid color, removed gradient and text-animations
        >
          <Sparkles className="inline-block mr-4 w-12 h-12 text-purple-400 animate-spin-slow" /> Why Now?
        </h2>

        <p // Changed from motion.p to p
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed" // Enhanced text: clear, no animations
        >
          ErthaLoka is a global initiative to build regenerative, self-sustaining communities—<span className="text-purple-300 font-bold">EcoVerses</span>—that blend traditional ecological wisdom with modern technology.
          These interconnected habitats are meticulously designed to:
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show" // Animate when in view
          viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% visible
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800/70 p-8 rounded-2xl ${reason.borderColor} border shadow-xl flex flex-col items-center justify-start text-center
                          transform transition-all duration-300 hover:scale-[1.02] hover:${reason.shadowColor} hover:border-opacity-100`}
              variants={itemVariants}
            >
              <reason.icon className={`w-20 h-20 ${reason.color} mb-6 transform animate-float-pulse-subtle`} />
              <h3 className="text-3xl font-bold text-gray-100 mb-4 leading-snug">{reason.title}</h3>
              <p className="text-lg text-gray-300 leading-relaxed flex-grow">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <p // Changed from motion.p to p
          className="text-3xl md:text-4xl font-bold text-center text-green-300 max-w-4xl mx-auto leading-normal" // Enhanced text: clear, no animations
        >
          <CheckCircle className="inline-block w-10 h-10 mr-4 text-emerald-400 animate-spin-slow-reverse" />
          ErthaLoka responds with a working model that is <span className="text-purple-400">scalable</span>, <span className="text-pink-400">self-sustaining</span>, and <span className="text-cyan-400">inclusive</span>.
        </p>
      </div>

      <style>{`
        /* Existing animations (ensure these are in your tailwind.config.js or global.css) */
        @keyframes float-pulse-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }

        @keyframes spin-slow-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        /* The custom 3xl shadow from your tailwind.config.js */
        /*
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)', // Custom glowing shadow
        }
        */
      `}</style>
    </section>
  );
};

export default WhyNowSection;