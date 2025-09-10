import { Button } from "@/components/ui/button";
import { Menu, X, Twitter, Github, MessageCircle, Send, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navHeight = useTransform(scrollY, [0, 100], [100, 70]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "DAO", href: "#dao" },
    { name: "Innovation", href: "#innovation" },
    { name: "Connect", href: "#connect" },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: "https://discord.gg/erthaloka", label: "Discord" },
    { icon: Send, href: "https://t.me/erthaloka", label: "Telegram" },
    { icon: Twitter, href: "https://twitter.com/erthaloka", label: "Twitter" },
    { icon: Github, href: "https://github.com/erthaloka", label: "GitHub" },
  ];

  return (
    <>
    <motion.header
      className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
        isScrolled 
          ? "bg-black/95 shadow-2xl shadow-green-500/10" 
          : "bg-gradient-to-b from-black/80 via-black/60 to-transparent"
      }`}
    >
      {/* Top Social Bar - Hidden on mobile */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`hidden md:block border-b border-white/5 transition-all duration-500 ${
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-10"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-end items-center h-full space-x-4 lg:space-x-6">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <social.icon size={14} className="lg:w-4 lg:h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className="container mx-auto px-4"
        style={{ height: navHeight }}
      >
        <div className="flex items-center justify-between h-full">
          {/* Logo with Animation */}
          <motion.div 
            className="flex items-center space-x-2 lg:space-x-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-lg opacity-50 animate-pulse" />
              <img 
                src="logo.jpeg" 
                alt="Erthaloka logo" 
                className={`relative transition-all duration-500 ${
                  isScrolled 
                    ? "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" 
                    : "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20"
                } object-contain`}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation - Horizontal */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group text-sm lg:text-base"
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button with Gradient */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="relative px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold rounded-full overflow-hidden group shadow-lg shadow-green-500/25 text-sm lg:text-base"
                onClick={() => window.open('https://el-cc.vercel.app/', '_blank')}
              >
                <span className="relative z-10 flex items-center gap-1 md:gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  >
                    <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                  <span className="hidden lg:inline">Wallet</span>
                  <span className="lg:hidden">💳</span>
                  <motion.span
                    className="ml-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </motion.button>
        </div>

      </motion.nav>
    </motion.header>

    {/* Mobile Menu - Outside Header with Blur Effect */}
    {isMenuOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed inset-0 z-[100]"
      >
        {/* Blur Background Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        
        {/* Navigation Menu */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <div className="w-full max-w-sm space-y-8 text-center">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="block w-full text-3xl text-white hover:text-green-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Wallet Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="w-full flex justify-center mt-12"
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium text-lg rounded-full flex items-center gap-3 transition-all duration-300"
                onClick={() => {
                  window.open('https://el-cc.vercel.app/', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                <Wallet className="w-5 h-5" />
                Wallet
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )}
  </>
  );
};

export default Navigation;