import { Leaf, Users, Zap, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Ecosystem = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const ecosystemPillars = [
    {
      icon: Leaf,
      title: "Regenerative Impact",
      description: "Every action within our ecosystem contributes to environmental restoration and sustainability.",
      color: "from-green-400 to-emerald-400",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      stats: [
        { label: "Trees Planted", value: "50K+" },
        { label: "Carbon Offset", value: "1000T" }
      ]
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Decentralized decision-making powered by DAO structures that give every member a voice.",
      color: "from-emerald-400 to-green-400",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      stats: [
        { label: "Active Members", value: "3.5K+" },
        { label: "Proposals Passed", value: "150+" }
      ]
    },
    {
      icon: Zap,
      title: "Innovative Technology",
      description: "Cutting-edge blockchain, AI, and IoT solutions driving sustainable innovation forward.",
      color: "from-green-400 to-emerald-400",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      stats: [
        { label: "DApps Built", value: "30+" },
        { label: "Smart Contracts", value: "100+" }
      ]
    },
    {
      icon: Shield,
      title: "Transparent & Secure",
      description: "Blockchain-verified impact tracking ensures complete transparency in all ecosystem activities.",
      color: "from-emerald-400 to-green-400",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      stats: [
        { label: "Transactions", value: "100K+" },
        { label: "Security Audits", value: "12" }
      ]
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="ecosystem" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-emerald-900/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Regenerative{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive platform where technology meets sustainability, community drives innovation, and every participant contributes to planetary regeneration.
          </p>
        </motion.div>

        {/* Zig-Zag Layout Sections */}
        <div className="space-y-32">
          {ecosystemPillars.map((pillar, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Image Side */}
              <motion.div 
                className="flex-1 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${pillar.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative overflow-hidden rounded-3xl border border-green-500/20">
                  <img 
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex gap-8">
                      {pillar.stats.map((stat, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="text-3xl font-bold text-white">{stat.value}</div>
                          <div className="text-sm text-gray-300">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <pillar.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {pillar.title}
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {pillar.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DAO Section with Horizontal Scroll */}
        <motion.div 
          className="mt-32 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-3xl p-12 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Join Our DAO
            </h3>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto text-center">
              Become a guardian of regeneration. Participate in governance, earn rewards for sustainable actions, and help shape the future of our ecosystem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Vote", subtitle: "on ecosystem proposals", icon: "🗳️" },
                { title: "Earn", subtitle: "guardian rewards", icon: "💎" },
                { title: "Impact", subtitle: "real-world change", icon: "🌍" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    {item.title}
                  </div>
                  <div className="text-gray-400">{item.subtitle}</div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                className="relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-500/25 transition-all duration-300 overflow-hidden group"
                onClick={() => window.open('https://el-dao.onrender.com/', '_blank')}>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: [-200, 200] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10">Become a Guardian</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Ecosystem;