import React from 'react';

const ErthaBazaarPage: React.FC = () => {
  return (
    <div className="text-white min-h-screen pt-20 relative z-10">
      <div className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-yellow-500/20 shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500">
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold animate-fade-in drop-shadow-lg text-yellow-400">🛒 ErthaBazaar</h1>
              <p className="text-xl mt-4 animate-fade-in delay-200 text-yellow-200">Decentralized Nature-Based Economy</p>
            </header>
            <section className="max-w-4xl mx-auto">
              <div className="bg-yellow-900/50 backdrop-blur-md rounded-2xl p-8 animate-fade-in delay-400 hover:scale-105 transition-all duration-500 border border-yellow-600/30">
                <p className="text-lg leading-relaxed mb-6 text-white">
                  ErthaBazaar is an ecosystem of ethical commerce that connects conscious consumers with sustainable products and services.
                  Our marketplace prioritizes environmental impact, social responsibility, and regenerative practices.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-900/50 p-6 rounded-xl hover:bg-yellow-800/50 transition-all duration-300 hover:scale-105 border border-yellow-600/20">
                    <h3 className="text-xl font-bold mb-3 text-yellow-300">🌱 Sustainable Products</h3>
                    <p className="text-yellow-100">Curated selection of eco-friendly products that support regenerative practices.</p>
                  </div>
                  <div className="bg-yellow-900/50 p-6 rounded-xl hover:bg-yellow-800/50 transition-all duration-300 hover:scale-105 border border-yellow-600/20">
                    <h3 className="text-xl font-bold mb-3 text-yellow-300">🤝 Community-Driven</h3>
                    <p className="text-yellow-100">Direct connections between conscious producers and mindful consumers.</p>
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

export default ErthaBazaarPage;