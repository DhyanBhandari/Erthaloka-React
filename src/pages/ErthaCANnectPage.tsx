import React from 'react';
import { Network, Map, Users, Calendar, MapPin, Leaf, Clock, User, Ticket } from 'lucide-react';

const ErthaCANnectPage: React.FC = () => {
  const pastEvents = [
    {
      title: "Puducherry - Startup meet 01",
      subtitle: "Sustainable Startups Meet",
      date: "01 March 2025",
      time: "10 AM – 12 PM",
      location: "Erthaloka, Near Auroville",
      host: "Hosted by Erthaloka",
      audience: "Startups & Entrepreneurs"
    },
    {
      title: "Bengaluru - Startup meet 02",
      subtitle: "Sustainable Startups Meet",
      date: "15 March 2025",
      time: "10 AM – 12 PM",
      location: "Erthaloka, Bengaluru",
      host: "Hosted by Erthaloka",
      audience: "Startups & Entrepreneurs"
    },
    {
      title: "Hyderabad - Startup meet 03",
      subtitle: "Sustainable Startups Meet",
      date: "29 March 2025",
      time: "10 AM – 12 PM",
      location: "Erthaloka, Near Hitech City",
      host: "Hosted by Erthaloka",
      audience: "Startups, Entrepreneurs, Investors"
    },
    {
      title: "Puducherry - Startupmeet 04",
      subtitle: "Sustainable Startups Meet",
      date: "07 June 2025",
      time: "10 AM – 2 PM",
      location: "ErthaLoka, Puducherry",
      host: "Hosted by Erthaloka",
      audience: "Eco-innovators, Change Leaders"
    }
  ];

  const ecosystemData = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "Current Ecosystem",
      description: "ErthaCANnect, Lokations, ErthaMART (SustainABLE Circle, Erthitect Studio, XplorED, Travellers Triibe in pipeline) power a living regenerative ecosystem."
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Geographic Presence",
      description: "Proudly rooted in Tamil Nadu (Auroville) & Puducherry—with growing footprints."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Strength",
      description: "80+ conscious creators collaborating via SustainABLE Circle to reimagine prosperity."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events & Circles",
      description: "6 impact events completed. Monthly regeneration circles igniting across Bengaluru, Puducherry, TN & Hyderabad."
    }
  ];

  return (
    <div className="text-white min-h-screen pt-20 relative z-10">
      {/* Ecosystem Overview */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-400 animate-fade-in drop-shadow-lg">
              🌍 ErthaCANnect: The Global Network
            </h1>
            <div className="grid md:grid-cols-2 gap-12">
              {ecosystemData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900/60 backdrop-blur-lg border border-green-700/30 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:shadow-green-500/20 transition-all duration-400 animate-fade-in hover:-translate-y-2 group"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-14 h-14 bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-green-300 group-hover:text-green-200 transition-colors duration-300">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item.description.split('**').map((part, idx) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-white">{part}</strong> : part
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500">
            <h2 className="text-4xl font-bold text-center mb-16 text-green-400 animate-fade-in drop-shadow-lg">
              🌱 Past Events
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-black/80 p-8 rounded-lg shadow-xl border-l-8 border-green-600 hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in hover:border-green-400 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-2xl font-bold text-green-400 text-center mb-4 flex justify-center items-center gap-2 group-hover:text-green-300 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" /> {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p className="font-semibold flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Leaf className="w-5 h-5 text-green-400" /> {event.subtitle}
                    </p>
                    <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Calendar className="w-5 h-5 text-green-400" /> {event.date}
                    </p>
                    <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Clock className="w-5 h-5 text-green-400" /> {event.time}
                    </p>
                    <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Map className="w-5 h-5 text-green-400" /> {event.location}
                    </p>
                    <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <User className="w-5 h-5 text-green-400" /> {event.host}
                    </p>
                    <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                      <Users className="w-5 h-5 text-green-400" /> {event.audience}
                    </p>
                  </div>
                  <button className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-md flex justify-center items-center gap-2 hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Ticket className="w-5 h-5" /> Concluded
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErthaCANnectPage;