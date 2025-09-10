import { Brain, Wifi, Vote, Recycle, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Innovation = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "Deep Technology",
      description: "Leveraging AI, neural networks, and advanced simulations to model ecosystems, predict outcomes, and optimize resources — delivering science-backed, high-impact sustainability solutions",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      details: "Our deep technology stack includes advanced machine learning models, predictive analytics, and real-time data processing capabilities. We utilize neural networks to analyze complex environmental patterns and generate actionable insights for sustainable development.",
      stats: [
        { label: "AI Models", value: "50+" },
        { label: "Predictions/Day", value: "10K+" }
      ]
    },
    {
      icon: Wifi,
      title: "Embedded Systems",
      description: "Smart, energy-efficient embedded devices process environmental data at the source, enabling real-time insights and reliable sustainability tracking.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      details: "Our IoT network consists of thousands of sensors monitoring air quality, water levels, soil health, and energy consumption. These devices operate on ultra-low power and communicate via efficient protocols.",
      stats: [
        { label: "Active Sensors", value: "5K+" },
        { label: "Data Points/Min", value: "1M+" }
      ]
    },
    {
      icon: Vote,
      title: "DAO Governance",
      description: "Decentralized decision-making processes that empower community members to guide the platform's future development.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      details: "Every token holder has voting rights proportional to their stake. Proposals are submitted on-chain, discussed transparently, and executed automatically through smart contracts.",
      stats: [
        { label: "Active Voters", value: "2K+" },
        { label: "Proposals Passed", value: "150+" }
      ]
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      description: "Blockchain-enabled circular systems that track resources throughout their lifecycle, minimizing waste and maximizing reuse.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
      details: "Our blockchain tracks materials from production to recycling, ensuring transparency and accountability. Smart contracts automatically reward sustainable practices and penalize waste.",
      stats: [
        { label: "Items Tracked", value: "100K+" },
        { label: "Waste Reduced", value: "40%" }
      ]
    }
  ];

  return (
    <motion.section 
      id="innovation" 
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
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
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
            Innovation Through{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge blockchain solutions combined with AI, IoT, and community governance to create a truly regenerative ecosystem.
          </p>
        </motion.div>

        {/* Interactive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Card */}
              <motion.div
                className="relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-400/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-green-400" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Stats Preview */}
                  <div className="flex gap-8 mb-6">
                    {feature.stats.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <motion.div
                      animate={{ rotate: expandedCard === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative border-t border-green-500/20"
                    >
                      <div className="p-8 pt-6">
                        <p className="text-gray-300 leading-relaxed">
                          {feature.details}
                        </p>
                        <motion.button
                          onClick={() => setExpandedCard(null)}
                          className="mt-4 text-gray-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-gray-300 mb-8">
            Ready to be part of the technological revolution in sustainability?
          </p>
          <motion.button 
            className="relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-500/25 transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://el-dao.onrender.com/', '_blank')}
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
            <span className="relative z-10">Explore Our Tech Stack</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Innovation;