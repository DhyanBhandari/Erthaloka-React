import { motion } from "framer-motion";

const Partners = () => {
  // Partner companies with actual logos from public/partners_images
  const partners = [
    { 
      name: "River Venture Studio", 
      logo: "/partners_images/river_ventures.jpeg",
      description: "Innovation Hub - Singapore",
      location: "Singapore"
    },
    { 
      name: "AIC-PECF", 
      logo: "/partners_images/aic-pcf.png",
      description: "Atal Incubation Centre",
      location: "Puducherry"
    },
    { 
      name: "T-Hub", 
      logo: "/partners_images/thub.png",
      description: "Ecosystem Partner",
      location: "Hyderabad"
    },
    { 
      name: "EICF", 
      logo: "/partners_images/eicf.jpeg",
      description: "European Indian Cooperation Forum",
      location: "International"
    },
    { 
      name: "Pondy Friends", 
      logo: "/partners_images/pondy_friends.png",
      description: "Community Partner",
      location: "Puducherry"
    }
  ];

  // Duplicate partners for infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <motion.section 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #000000 50%, #0a0a0a 100%)"
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10" />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Working alongside visionary organizations to build a transparent, decentralized, and regenerative ecosystem.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Partners */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
          
          <motion.div 
            className="flex gap-8"
            animate={{ x: [-1000, 0] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`partner-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 shadow-lg hover:shadow-green-500/20 hover:border-green-400/40 transition-all duration-300 w-80 h-48 flex flex-col items-center justify-center hover:bg-white/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className="h-20 w-auto object-contain mb-4 filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-1">{partner.name}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                      {partner.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{partner.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partner Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {[
            { value: "5+", label: "Strategic Partners" },
            { value: "3", label: "Countries" },
            { value: "10+", label: "Joint Projects" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-gray-300 mb-8">
            Interested in partnering with us to create sustainable impact?
          </p>
          <motion.button 
            className="relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-500/25 transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{ x: [-200, 200] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            <span className="relative z-10">Become a Partner</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Partners;