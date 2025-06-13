import React from 'react';
import { Leaf, Coins, Network, Flower, Gem, Sparkles } from 'lucide-react'; // More relevant icons for the themes

const AboutErthaLokaSection: React.FC = () => {
  return (
    <section id="what-is-erthaloka" className="py-24 text-white text-center relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Futuristic Background Elements (Orbs/Glows) */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-move-1 z-0"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float-move-2 delay-1000 z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-move-1 delay-2000 z-0"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="bg-black/70 backdrop-blur-md rounded-3xl p-10 lg:p-16 border border-purple-800/50 shadow-2xl animate-scale-in-center transition-all duration-700">
          <h2 className="text-4xl md:text-6xl font-extrabold text-teal-400 mb-8 animate-fade-in drop-shadow-lg flex items-center justify-center text-white">
            <Sparkles className="inline-block mr-4 w-12 h-12 text-white animate-spin-slow" /> What is ErthaLoka?
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-200">
            ErthaLoka is a global initiative to build regenerative, self-sustaining communities—<span className="text-purple-300 font-bold">EcoVerses</span>—that blend traditional ecological wisdom with modern technology.
            These interconnected habitats are meticulously designed to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Feature Card 1: Restore Ecosystems */}
            <div className="bg-gray-800/60 p-6 rounded-xl border border-green-600/40 shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/30 animate-fade-up delay-300">
              <Leaf className="w-16 h-16 text-green-400 mb-4 animate-float-pulse" />
              <h3 className="text-2xl font-bold text-green-300 mb-3">Restore Ecosystems</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Implement innovative ecological practices to rejuvenate degraded environments.
              </p>
            </div>

            {/* Feature Card 2: Empower Local Economies */}
            <div className="bg-gray-800/60 p-6 rounded-xl border border-yellow-600/40 shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-500/30 animate-fade-up delay-400">
              <Coins className="w-16 h-16 text-yellow-400 mb-4 animate-float-pulse" />
              <h3 className="text-2xl font-bold text-yellow-300 mb-3">Empower Local Economies</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Foster circular economies, local trade, and sustainable livelihoods for residents.
              </p>
            </div>

            {/* Feature Card 3: Enable Decentralized Governance */}
            <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-600/40 shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30 animate-fade-up delay-500">
              <Network className="w-16 h-16 text-blue-400 mb-4 animate-float-pulse" />
              <h3 className="text-2xl font-bold text-blue-300 mb-3">Decentralized Governance</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Build transparent and participatory systems for community decision-making.
              </p>
            </div>

            {/* Feature Card 4: Promote Regenerative, Holistic Living */}
            <div className="bg-gray-800/60 p-6 rounded-xl border border-pink-600/40 shadow-lg flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-pink-500/30 animate-fade-up delay-600">
              <Flower className="w-16 h-16 text-pink-400 mb-4 animate-float-pulse" />
              <h3 className="text-2xl font-bold text-pink-300 mb-3">Holistic Living</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Cultivate well-being, connectivity, and a deep respect for natural cycles.
              </p>
            </div>
          </div>

          <p className="text-2xl md:text-3xl font-semibold text-purple-200 mt-12 animate-fade-in delay-700 drop-shadow-md flex items-center justify-center gap-3">
            <Gem className="w-10 h-10 text-orange-400 animate-spin-slow" /> Our goal is to reshape the way humans live, work, and thrive together—<span className="text-orange-300 font-extrabold">on Earth, and for Earth.</span>
          </p>
        </div>
      </div>
      <style>{`
        /* Add these to your global styles or tailwind.config.js if you want them globally available */
        @keyframes scale-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-scale-in-center {
          animation: scale-in-center 1s ease-out forwards;
        }

        /* Using existing animations from previous sections for consistency */
        /*
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-pulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float-move-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -15px) scale(1.05); }
          70% { transform: translate(-10px, 10px) scale(0.98); }
        }

        @keyframes float-move-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-15px, 20px) scale(0.95); }
          70% { transform: translate(10px, -10px) scale(1.03); }
        }
        */
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
        .animate-float-pulse { animation: float-pulse 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-float-move-1 { animation: float-move-1 15s ease-in-out infinite alternate; }
        .animate-float-move-2 { animation: float-move-2 18s ease-in-out infinite alternate-reverse; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
};

export default AboutErthaLokaSection;