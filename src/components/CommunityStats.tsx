import { Users, Calendar, Award, Activity, Code, Globe, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const CommunityStats = () => {
  const sectionRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    {
      icon: Users,
      value: "5",
      label: "Accounts on voyage",
      description: "Growing community of regenerative innovators"
    },
    {
      icon: Calendar,
      value: "10+",
      label: "Offline Events",
      description: "Real-world gatherings and workshops"
    },
    {
      icon: Award,
      value: "0",
      label: "Guardian Rewards",
      description: "Distributed to community contributors"
    },
    {
      icon: Activity,
      value: "0",
      label: "TestNet Interactions",
      description: "Active blockchain participation"
    },
    {
      icon: Code,
      value: "0",
      label: "Applications",
      description: "Built on our regenerative platform"
    },
    {
      icon: Globe,
      value: "3+",
      label: "Countries",
      description: "Global community presence"
    }
  ];

  // Real community images and videos
  const communityMedia = [
    { id: 1, type: 'image', url: "/com1.jpg", alt: "Community Event 1" },
    { id: 2, type: 'video', url: "/vid1.mp4", alt: "Community Video 1" },
    { id: 3, type: 'image', url: "/com2.jpg", alt: "Community Event 2" },
    { id: 4, type: 'image', url: "/com3.jpg", alt: "Community Event 3" },
    { id: 5, type: 'video', url: "/vid2.mp4", alt: "Community Video 2" },
    { id: 6, type: 'image', url: "/com4.jpg", alt: "Community Event 4" },
    { id: 7, type: 'image', url: "/com5.jpg", alt: "Community Event 5" }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="community" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #000000 50%, #0a0a0a 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10" />
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0]
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
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Join Our Growing{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Regenerative Community
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Be part of a global movement driving sustainable innovation through blockchain technology and community collaboration.
          </motion.p>
        </motion.div>

        {/* Creative Community Media Mosaic */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] max-w-6xl mx-auto">
            {/* Large feature video - top left */}
            <motion.div
              className="col-span-6 row-span-3 relative group overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <video 
                src={communityMedia[1].url}
                className="w-full h-full object-cover"
                autoPlay={playingVideo === 1}
                muted
                loop
                playsInline
              />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20"
                whileHover={{ scale: 1.1 }}
                onClick={() => setPlayingVideo(playingVideo === 1 ? null : 1)}
              >
                <div className="w-20 h-20 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer group-hover:bg-green-400/90 transition-all duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </motion.div>
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-white font-semibold">Community Highlights</p>
              </div>
            </motion.div>

            {/* Tall image - top right */}
            <motion.div
              className="col-span-3 row-span-4 relative group overflow-hidden rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img 
                src={communityMedia[0].url}
                alt={communityMedia[0].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-2 border-green-400/0 group-hover:border-green-400/50 transition-all duration-300 rounded-2xl" />
            </motion.div>

            {/* Medium squares - right side */}
            <motion.div
              className="col-span-3 row-span-2 relative group overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <img 
                src={communityMedia[2].url}
                alt={communityMedia[2].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Bottom left images */}
            <motion.div
              className="col-span-3 row-span-3 relative group overflow-hidden rounded-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: -1 }}
            >
              <img 
                src={communityMedia[3].url}
                alt={communityMedia[3].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Second video - bottom center */}
            <motion.div
              className="col-span-3 row-span-3 relative group overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <video 
                src={communityMedia[4].url}
                className="w-full h-full object-cover"
                autoPlay={playingVideo === 4}
                muted
                loop
                playsInline
              />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20"
                whileHover={{ scale: 1.1 }}
                onClick={() => setPlayingVideo(playingVideo === 4 ? null : 4)}
              >
                <div className="w-16 h-16 bg-emerald-500/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer group-hover:bg-emerald-400/90 transition-all duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </motion.div>
            </motion.div>

            {/* Additional images filling remaining spaces */}
            <motion.div
              className="col-span-6 row-span-3 grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div 
                className="relative group overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <img 
                  src={communityMedia[5].url}
                  alt={communityMedia[5].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              <motion.div 
                className="relative group overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05, rotate: -1 }}
              >
                <img 
                  src={communityMedia[6].url}
                  alt={communityMedia[6].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          </div>

          {/* Creative floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 right-20 w-3 h-3 bg-green-400 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-32 left-16 w-2 h-2 bg-emerald-400 rounded-full"
              animate={{
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-400/40 transition-all duration-300">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8 text-green-400" />
                </motion.div>
                
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                
                <div className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
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
            <span className="relative z-10">Join the Movement</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CommunityStats;