import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Handshake, Blocks, ArrowRight } from 'lucide-react';

const GetInvolvedSection: React.FC = () => {
  const ctas = [
    {
      label: 'Request Deck',
      icon: FileText,
      href: '#request-deck',
      bgColor: 'bg-purple-700',
      hoverBgColor: 'hover:bg-purple-600',
      shadow: 'shadow-purple-500/40',
      delay: 0.3,
    },
    {
      label: 'Become a Partner',
      icon: Handshake,
      href: '#get-in-touch',
      bgColor: 'bg-teal-700',
      hoverBgColor: 'hover:bg-teal-600',
      shadow: 'shadow-teal-500/40',
      delay: 0.5,
    },
    {
      label: 'Join Our DAO',
      icon: Blocks,
      href: 'https://ertha-coin-governance-hub.vercel.app/',
      bgColor: 'bg-blue-700',
      hoverBgColor: 'hover:bg-blue-600',
      shadow: 'shadow-blue-500/40',
      delay: 0.7,
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const handleScrollClick = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (label === 'Become a Partner') {
      (window as any).scrollToGetInTouch?.();
    } else if (label === 'Request Deck') {
      (window as any).scrollToRequestDeck?.();
    }
  };

  return (
    <section
      id="get-involved"
      className="py-24 text-white relative overflow-hidden flex items-center justify-center"
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-12 lg:p-16 shadow-3xl">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-purple-400 mb-8 drop-shadow-glow leading-tight"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Get Involved
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Investors, partners, designers, technologists, farmers, builders—this is your call. Join us in creating the
          first working <span className="text-pink-300 font-semibold">EcoVerse prototypes</span> and building a
          movement toward the new regenerative civilization.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {ctas.map((cta, index) => {
            const Icon = cta.icon;
            const shouldScroll = ['Become a Partner', 'Request Deck'].includes(cta.label);

            return (
              <motion.a
                key={index}
                href={cta.href}
                onClick={shouldScroll ? (e) => handleScrollClick(cta.label, e) : undefined}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`${cta.bgColor} text-white font-semibold py-4 px-8 rounded-full
                  flex items-center justify-center gap-3 text-lg
                  transform transition-all duration-300 ease-in-out
                  ${cta.hoverBgColor} hover:scale-105 hover:shadow-2xl
                  border border-transparent hover:border-white/20`}
                variants={buttonVariants}
                custom={cta.delay}
              >
                <Icon className="w-6 h-6" />
                {cta.label}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .drop-shadow-glow {
          text-shadow:
            0 0 5px rgba(255, 255, 255, 0.4),
            0 0 15px rgba(168, 85, 247, 0.7),
            0 0 25px rgba(192, 38, 211, 0.5);
        }
      `}</style>
    </section>
  );
};

export default GetInvolvedSection;
