import React from 'react';

interface ErthalokaEcosystemSectionProps {
  setCurrentPath: (path: string) => void;
}

const ErthalokaEcosystemSection: React.FC<ErthalokaEcosystemSectionProps> = ({ setCurrentPath }) => {
  const ecosystemItems = [
    {
      title: "🌿 ErthaGrama",
      image: "../images/Erthagrama.png",
      gradient: "from-green-800 to-green-900",
      hoverGradient: "group-hover:from-green-600 group-hover:to-lime-500",
      link: "/erthagrama"
    },
    {
      title: "🌍 ErthaCANnect",
      image: "../images/ErthaCANnect.png",
      gradient: "from-blue-800 to-blue-900",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-cyan-400",
      link: "/erthacannect"
    },
    {
      title: "🛒 ErthaMart ",
      image: "../images/ErthaMart.png",
      gradient: "from-teal-800 to-teal-900",
      hoverGradient: "group-hover:from-teal-500 group-hover:to-green-300",
      link: "/erthabazaar"
    },
    {
      title: "🔧 Sustainable Circle ",
      image: "../images/SustainableCircle.png",
      gradient: "from-orange-800 to-orange-900",
      hoverGradient: "group-hover:from-orange-500 group-hover:to-yellow-400",
      link: "/sustainablecircle"
    }
  ];

  const handleEcosystemClick = (link: string) => {
    setCurrentPath(link);
  };

  return (
    <section id="ecosystem" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in text-white">
            The ErthaLoka Ecosystem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {ecosystemItems.map((item, index) => (
              <button
                key={index}
                className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group animate-fade-in focus:outline-none focus:ring-4 focus:ring-green-500/50 rounded-2xl"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleEcosystemClick(item.link)}
              >
                <div className={`bg-gradient-to-br ${item.gradient} ${item.hoverGradient} p-4 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-500 border border-white/10 hover:border-white/30`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-bold text-white text-center group-hover:text-yellow-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErthalokaEcosystemSection;