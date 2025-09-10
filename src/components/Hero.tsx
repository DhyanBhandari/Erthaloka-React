import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? "rgba(34, 197, 94, 0.5)" : "rgba(16, 185, 129, 0.5)"
    }));

    const connectDistance = 120;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(34, 197, 94, ${0.3 * (1 - dist / connectDistance)})`);
            gradient.addColorStop(1, `rgba(16, 185, 129, ${0.3 * (1 - dist / connectDistance)})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.width / 2) / 20);
      mouseY.set((e.clientY - rect.height / 2) / 20);
    }
  };

  return (
    <motion.section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #111111 100%)"
      }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      {/* Particle Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Floating Gradient Orbs */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 text-center relative z-10"
        style={{ y, opacity }}
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Unleashing the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Web3 Revolution
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>{" "}
            in Regeneration and Sustainability
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            A regenerative ecosystem for{" "}
            <span className="text-green-400 font-semibold">People</span>,{" "}
            <span className="text-emerald-400 font-semibold">Planet</span> &{" "}
            <span className="text-green-300 font-semibold">Purpose</span> — driven
            by communities and enabled by blockchain technology.
          </motion.p>

          {/* CTA Button - 60% Width, Centered */}
          <motion.div
            className="flex justify-center items-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div 
              className="w-full md:w-3/5 lg:w-3/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full py-8 px-12 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-400 hover:via-emerald-400 hover:to-green-400 text-white font-bold text-lg md:text-xl rounded-full relative overflow-hidden group shadow-2xl shadow-green-500/30 transition-all duration-300"
                onClick={() => window.open("https://el-dao.onrender.com/", "_blank")}
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
                <span className="relative z-10 flex items-center justify-center text-center">
                  Join the Community
                  <motion.span
                    className="ml-3 inline-block"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Counter with Icons */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {[
              { value: 3500, label: "Active Members", color: "from-green-400 to-emerald-400", icon: "👥", prefix: "", suffix: "+" },
              { value: 20, label: "Countries", color: "from-emerald-400 to-green-400", icon: "🌍", prefix: "", suffix: "+" },
              { value: 30, label: "DApps Built", color: "from-green-400 to-emerald-400", icon: "🚀", prefix: "", suffix: "+" },
              { value: 50, label: "Million $", color: "from-emerald-400 to-green-400", icon: "💎", prefix: "$", suffix: "M+" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-400/40 transition-all duration-300">
                  <motion.div 
                    className="text-4xl mb-3"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.prefix}
                    <CountUp 
                      end={item.value} 
                      duration={2.5} 
                      separator="," 
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {item.suffix}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 mt-2">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;