import React from 'react';
import { Leaf } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Inject custom styles */}
      <style>{`
        @keyframes drop-bounce {
          0%   { transform: translateY(-200%); opacity: 0; }
          60%  { transform: translateY(20%); opacity: 1; }
          80%  { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-drop-bounce {
          animation: drop-bounce 0.8s ease-out 0.3s forwards;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>

     
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-0 z-10" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-58 flex flex-col items-center justify-center h-full text-center relative z-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in drop-shadow-2xl">
          A Decentralized Co-ExIStic ECOverse
        </h1>

        <p className="text-lg md:text-xl text-white mb-12 animate-fade-in delay-300 drop-shadow-lg">
          A regenerative ecosystem for People, Planet & Purpose — driven by communities and enabled by technology.
        </p>

        <div className="flex flex-wrap justify-center gap-24">
         

          {/* External community button with drop + bounce + spin */}
          <button
            onClick={() =>
              window.open(
                'https://ertha-coin-governance-hub.vercel.app/',
                '_blank',
                'noopener,noreferrer'
              )
            }
            className="flex items-center gap-4 bg-white text-green-700 text-base md:text-lg font-medium px-6 py-3 rounded-full border border-green-300 shadow-md hover:shadow-lg hover:bg-green-50 hover:text-green-800 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 animate-drop-bounce"
            aria-label="Join the Erthaloka Community"
          >
            <span className="text-xl spin-slow">🌍</span>
            Join the Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
