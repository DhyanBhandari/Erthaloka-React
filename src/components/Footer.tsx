import { motion } from "framer-motion";
import { Twitter, Github, MessageCircle, Send, Mail, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: MessageCircle, href: "https://discord.gg/erthaloka", label: "Discord", color: "hover:text-green-400" },
    { icon: Send, href: "https://t.me/erthaloka", label: "Telegram", color: "hover:text-emerald-400" },
    { icon: Twitter, href: "https://twitter.com/erthaloka", label: "Twitter", color: "hover:text-green-400" },
    { icon: Github, href: "https://github.com/erthaloka", label: "GitHub", color: "hover:text-emerald-400" }
  ];

  const footerLinks = {
    Ecosystem: [
      { name: "DAO Governance", href: "#dao" },
      { name: "Innovation Hub", href: "#innovation" },
      { name: "Community", href: "#community" },
      { name: "Documentation", href: "#" }
    ],
    Resources: [
      { name: "Whitepaper", href: "#" },
      { name: "Roadmap", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" }
    ]
  };

  return (
    <footer 
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent" />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="logo.jpeg" 
                  alt="Erthaloka logo" 
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ErthaLoka
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Building the future of regenerative Web3 technology. Join our community of innovators creating sustainable solutions.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg ${social.color} hover:bg-green-500/10 hover:border-green-400/40 transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="relative">
                        {link.name}
                        <motion.span 
                          className="absolute -bottom-1 left-0 h-0.5 bg-green-400"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="border-t border-green-500/20 pt-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400">Get the latest updates on our regenerative ecosystem</p>
            </div>
            <motion.div 
              className="flex gap-4 w-full md:w-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-full text-white placeholder:text-gray-500 focus:border-green-400/40 focus:outline-none flex-1 md:w-64"
              />
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-green-500/20 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            © 2024 ErthaLoka. All rights reserved. Building a regenerative future through Web3 technology.
          </p>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;