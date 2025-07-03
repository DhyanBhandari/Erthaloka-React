import React, { useState } from 'react';

const LokationsPage: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<any>(null);

  const spaces = [
    {
      id: 'bengaluru',
      title: '🌆 Bengaluru',
      description: 'Eco-living pod in the city for urban innovators.',
      image: '/api/placeholder/400/250',
      fullDescription: 'Urban eco-living pod with a community garden and co-working studio. Ideal for digital nomads and creators. Located in South Bengaluru.',
      location: '📍 South Bengaluru, Karnataka'
    },
    {
      id: 'auroville',
      title: '🌿 Near Auroville',
      description: 'A regenerative space for creators and seekers.',
      image: '/api/placeholder/400/250',
      fullDescription: 'Regenerative habitat with clay architecture, food forests, and yoga decks. Suitable for residencies and co-living learning spaces.',
      location: '📍 Near Auroville, Tamil Nadu'
    },
    {
      id: 'puducherry',
      title: '🏖️ Puducherry',
      description: 'Beachside co-living and innovation lab.',
      image: '/api/placeholder/400/250',
      fullDescription: 'Beachside creative zone for sustainability projects, co-living, and immersive workshops near Serenity Beach.',
      location: '📍 Puducherry North, Near Serenity Beach'
    }
  ];

  return (
    <div className="text-white min-h-screen pt-20 relative z-10">
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white animate-fade-in drop-shadow-lg">
              🏡 Our Living Spaces
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg text-white mb-10 animate-fade-in delay-200 drop-shadow-md">
              Welcome to the Lokations living spaces—designed for those who seek to live regeneratively.
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {spaces.map((space, index) => (
                <div
                  key={space.id}
                  onClick={() => setSelectedSpace(space)}
                  className="cursor-pointer bg-black/80 p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in border border-green-500/20 hover:border-green-500/50 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={space.image}
                    alt={space.title}
                    className="rounded-lg w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">{space.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{space.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedSpace && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-lg max-w-3xl w-full rounded-xl p-6 relative border border-green-700 shadow-2xl">
            <button
              onClick={() => setSelectedSpace(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl hover:scale-110 transition-all duration-300 focus:outline-none"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">{selectedSpace.title}</h2>
            <img
              src={selectedSpace.image}
              alt={selectedSpace.title}
              className="w-full rounded-lg mb-4 max-h-64 object-cover"
            />
            <p className="text-white mb-2">{selectedSpace.fullDescription}</p>
            <p className="font-semibold text-green-400">{selectedSpace.location}</p>
            <div className="mt-4">
              <button className="text-green-400 underline hover:text-green-300 transition-colors hover:scale-105 transform duration-300">
                🔗 Login & Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LokationsPage;