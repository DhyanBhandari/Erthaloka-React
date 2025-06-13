import React from 'react';
import { Cpu, Layers, RefreshCw } from 'lucide-react';

const SustainableTechInnovationsSection: React.FC = () => {
  const innovations = [
    {
      icon: <Cpu className="w-10 h-10 text-lime-300 animate-pulse" />,
      title: "Smart Resource Management",
      description: "AI + IoT for optimized energy and water use—automated, smart, efficient.",
      bgColor: "bg-green-900/80"
    },
    {
      icon: <Layers className="w-10 h-10 text-sky-300 animate-bounce" />,
      title: "Decentralized Governance",
      description: "Transparent, blockchain-powered decision-making by the people.",
      bgColor: "bg-blue-900/80"
    },
    {
      icon: <RefreshCw className="w-10 h-10 text-amber-300 animate-spin" />,
      title: "Circular Economy",
      description: "Closing the loop with upcycling and regenerative product cycles.",
      bgColor: "bg-yellow-900/80"
    }
  ];

  return (
    <section id="innovation" className="py-16 relative z-10">
      <div className="mx-auto px-6 max-w-5xl">
        <div className="rounded-3xl bg-black/70 border border-green-400/30 backdrop-blur-xl shadow-2xl p-10 hover:shadow-green-500/20 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-14 animate-fade-in">
            🌿 Sustainable Tech Innovations
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovations.map((innovation, index) => (
              <div
                key={index}
                className={`${innovation.bgColor} backdrop-blur-md rounded-xl p-6 shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in cursor-pointer border border-white/10 hover:border-white/30 group`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {innovation.icon}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                  {innovation.title}
                </h3>
                <p className="text-sm text-gray-100 text-center group-hover:text-white transition-colors duration-300">
                  {innovation.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainableTechInnovationsSection;