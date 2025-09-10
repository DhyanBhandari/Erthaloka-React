import { motion } from "framer-motion";
import { Award, Rocket, Building2, Users, Star, Globe, Sparkles, Zap } from "lucide-react";

const BackedBy = () => {
  const backers = [
    {
      category: "MENTOR / ADVISOR",
      name: "Dr. Viveka Kalidasan, PhD",
      title: "Founder-CEO | River Venture Studio Global",
      image: "/partners_images/viveka.png",
      achievements: [
        "Thought Leader in Industry 5.0/4.0",
        "Deeptech Venture Builder AI/ML", 
        "MIT 35 Innovators Under 35",
        "SG Top 100 Women in Tech",
        "NUS Outstanding Young Alumni",
        "DEI in Deeptech"
      ],
      icon: Star,
      gradient: "from-green-400 via-emerald-400 to-green-500"
    },
    {
      category: "ACCELERATOR",
      name: "River Venture Studio",
      title: "Supported by Enterprise SG",
      image: "/partners_images/river_ventures.jpeg",
      achievements: [
        "World's first DeepTech Industry 5.0 Incubator-accelerator",
        "Based in Singapore",
        "Empowering global startups inclusively",
        "Enterprise Singapore Backed",
        "Global Innovation Hub",
        "Industry 5.0 Pioneer"
      ],
      icon: Rocket,
      gradient: "from-emerald-400 via-green-400 to-emerald-500"
    },
    {
      category: "INCUBATOR",
      name: "AIC - PECF",
      title: "Atal Incubation Centre",
      image: "/partners_images/aic-pcf.png",
      achievements: [
        "Atal Incubation Centre - Puducherry",
        "Engineering College Foundation",
        "Ecosystem enabler in Puducherry",
        "Supported by CEFP",
        "Government of India Initiative",
        "Innovation & Startup Hub"
      ],
      icon: Building2,
      gradient: "from-green-500 via-emerald-400 to-green-400"
    }
  ];

  const supporters = [
    { name: "Enterprise Singapore", icon: Globe },
    { name: "CEFP - Puducherry", icon: Building2 },
    { name: "EICF", icon: Users },
    { name: "T-Hub", icon: Rocket }
  ];

  return (
    <motion.section 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)"
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-emerald-900/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full mb-6 backdrop-blur-sm"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-sm tracking-wider">BACKED BY</span>
            <Sparkles className="w-5 h-5 text-green-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            World-Class{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Support System
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Backed by industry leaders, accelerators, and incubators driving innovation in sustainability and technology
          </p>
        </motion.div>

        {/* Alternating Left-Right Layout */}
        <div className="max-w-6xl mx-auto space-y-20">
          {backers.map((backer, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Image Section */}
              <motion.div 
                className="lg:w-1/2 flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Subtle Shadow Glow - Only on Hover */}
                  <motion.div 
                    className={`absolute -inset-4 bg-gradient-to-r ${backer.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />
                  
                  {/* Image Container */}
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                    <img 
                      src={backer.image}
                      alt={backer.name}
                      className="w-full h-full rounded-2xl object-cover border-2 border-green-500/20 group-hover:border-green-400/40 transition-all duration-300"
                    />
                    
                    {/* Category Badge */}
                    <motion.div 
                      className={`absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r ${backer.gradient} rounded-full flex items-center gap-2 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <backer.icon className="w-4 h-4 text-black" />
                      <span className="text-xs font-bold text-black">{backer.category}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="lg:w-1/2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {backer.name}
                  </h3>
                  <p className="text-lg text-gray-400 mb-6">
                    {backer.title}
                  </p>
                </motion.div>

                {/* Achievements List */}
                <div className="space-y-3">
                  {backer.achievements.map((achievement, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-3 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                    >
                      <div className="mt-1.5">
                        <Zap className="w-4 h-4 text-green-400 group-hover/item:text-green-300 transition-colors" />
                      </div>
                      <p className="text-gray-300 group-hover/item:text-white transition-colors">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Button */}
                <motion.button
                  className="mt-6 px-6 py-3 bg-transparent border border-green-500/30 text-green-400 rounded-full hover:bg-green-500/10 hover:border-green-400/50 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Supporters */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-center text-lg text-gray-400 mb-12">Also supported by</p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {supporters.map((supporter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group"
              >
                <div className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-full group-hover:bg-black/60 group-hover:border-green-400/40 transition-all duration-300">
                  <supporter.icon className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300 font-medium text-sm">{supporter.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BackedBy;