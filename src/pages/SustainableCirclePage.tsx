import React from 'react';

const SustainableCirclePage: React.FC = () => {
  return (
    <div className="text-white min-h-screen pt-20 relative z-10">
      <div className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-orange-500/20 shadow-2xl hover:shadow-orange-500/30 transition-all duration-500">
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold animate-fade-in drop-shadow-lg text-orange-400">🔧 Sustainable Circle</h1>
              <p className="text-xl mt-4 animate-fade-in delay-200 text-orange-200">Empowering Action Through Events</p>
            </header>
            <section className="max-w-4xl mx-auto">
              <div className="bg-orange-900/50 backdrop-blur-md rounded-2xl p-8 animate-fade-in delay-400 hover:scale-105 transition-all duration-500 border border-orange-600/30">
                <p className="text-lg leading-relaxed mb-6 text-white">
                  Sustainable Circle organizes transformative events that bring together changemakers, innovators, and conscious individuals
                  to create positive impact in their communities and beyond.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-orange-900/50 p-6 rounded-xl text-center hover:bg-orange-800/50 transition-all duration-300 hover:scale-105 border border-orange-600/20">
                    <div className="text-3xl mb-3">🎪</div>
                    <h3 className="text-xl font-bold mb-2 text-orange-300">Impact Events</h3>
                    <p className="text-orange-100">Gatherings that inspire action and collaboration for sustainability.</p>
                  </div>
                  <div className="bg-orange-900/50 p-6 rounded-xl text-center hover:bg-orange-800/50 transition-all duration-300 hover:scale-105 border border-orange-600/20">
                    <div className="text-3xl mb-3">🌐</div>
                    <h3 className="text-xl font-bold mb-2 text-orange-300">Network Building</h3>
                    <p className="text-orange-100">Connecting like-minded individuals and organizations worldwide.</p>
                  </div>
                  <div className="bg-orange-900/50 p-6 rounded-xl text-center hover:bg-orange-800/50 transition-all duration-300 hover:scale-105 border border-orange-600/20">
                    <div className="text-3xl mb-3">💡</div>
                    <h3 className="text-xl font-bold mb-2 text-orange-300">Innovation Labs</h3>
                    <p className="text-orange-100">Collaborative spaces for developing sustainable solutions.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainableCirclePage;