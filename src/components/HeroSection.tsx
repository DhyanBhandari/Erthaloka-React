import React from 'react';
import { Leaf } from 'lucide-react';



const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full text-center relative z-10">
        <div className="w-32 h-32 mb-8 bg-green-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
          <Leaf className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in drop-shadow-2xl">
          A Tech-Powered SustainABLE ECOverse
        </h1>
        <p className="text-lg md:text-2xl text-white mb-8 animate-fade-in delay-300 drop-shadow-lg">
          A regenerative ecosystem for People, Planet & Purpose — driven by communities and enabled by technology.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-500">
          <button
            onClick={() => {
              const ecosystemSection = document.getElementById('ecosystem');
              if (ecosystemSection) {
                ecosystemSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xl hover:shadow-green-500/50"
            aria-label="Explore the Erthaloka Ecosystem"
          >
            Explore the ECOsystem
          </button>
          <button
    onClick={() => window.open('/ErthaCANnect', '_blank', 'noopener,noreferrer')}
  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-green-800 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white shadow-2xl hover:shadow-white/50"
  aria-label="Join our WhatsApp community"
>
  Join the Community
</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;