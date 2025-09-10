import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Send, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section 
      id="connect" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)"
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
          className="absolute top-20 left-20 w-40 h-40 rounded-full bg-green-500/10 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo in Ready to Connect section */}
            <motion.div 
              className="mb-8 flex justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <img 
                src="logo.jpeg" 
                alt="Erthaloka logo" 
                className="w-32 h-32 object-contain"
              />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Connect?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join the regenerative revolution. Get in touch with our team and discover how you can contribute to a sustainable future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">hello@erthaloka.com</p>
                  <p className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">partnerships@erthaloka.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Join Our Community</h3>
                  <p className="text-gray-400 mb-4">Connect with like-minded individuals building the future of sustainability.</p>
                  <div className="flex space-x-4">
                    {[
                      { icon: MessageCircle, label: "Discord", color: "hover:bg-green-500" },
                      { icon: Send, label: "Telegram", color: "hover:bg-emerald-500" },
                      { icon: Twitter, label: "Twitter", color: "hover:bg-green-500" },
                      { icon: Github, label: "GitHub", color: "hover:bg-emerald-500" }
                    ].map((social, i) => (
                      <motion.button
                        key={social.label}
                        className={`p-3 bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg ${social.color} hover:border-green-400/40 transition-all duration-300 group`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-300">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input 
                        placeholder="John" 
                        className="bg-black/30 border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-400/40"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Doe"
                        className="bg-black/30 border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-400/40"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com"
                      className="bg-black/30 border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-400/40"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input 
                      placeholder="I'm interested in..."
                      className="bg-black/30 border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-400/40"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your ideas, questions, or how you'd like to contribute..."
                      className="min-h-[120px] bg-black/30 border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-400/40"
                    />
                  </motion.div>

                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      {/* Outer Ring */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-3 border-green-400/30"
                        whileHover={{ 
                          borderColor: "rgb(34 197 94 / 0.6)",
                          scale: 1.02
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Rotating Ring */}
                      <motion.div 
                        className="absolute inset-2 rounded-full border-2 border-t-green-400 border-r-transparent border-b-emerald-400 border-l-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Button Background */}
                      <motion.button 
                        className="relative w-full py-6 px-8 bg-black/40 backdrop-blur-xl border-2 border-green-500/20 rounded-full text-white font-bold text-lg transition-all duration-300 group-hover:bg-green-500/10 group-hover:border-green-400/40 overflow-hidden"
                        whileHover={{
                          boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)"
                        }}
                      >
                        {/* Power Symbol */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2">
                          <div className="relative w-6 h-6">
                            {/* Power circle */}
                            <motion.div 
                              className="absolute inset-0 rounded-full border-2 border-green-400"
                              initial={{ rotate: 0, scale: 0.8 }}
                              whileHover={{ 
                                rotate: 180, 
                                scale: 1,
                                borderColor: "rgb(16 185 129)"
                              }}
                              transition={{ duration: 0.3 }}
                            />
                            {/* Power line */}
                            <motion.div 
                              className="absolute top-0 left-1/2 w-0.5 h-3 bg-green-400 -translate-x-1/2"
                              whileHover={{ 
                                backgroundColor: "rgb(16 185 129)",
                                height: "16px"
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                        
                        {/* Button Text */}
                        <span className="relative z-10 flex items-center justify-center">
                          Send Message
                        </span>
                        
                        {/* Animated Dots */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 bg-green-400 rounded-full"
                              animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.3, 1, 0.3]
                              }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Pulse Effect on Hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;