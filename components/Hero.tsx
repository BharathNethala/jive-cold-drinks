import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TICKER_ITEMS = [
  "Loved by thousands of people",
  "Bangalore's best badam milk",
  "100% natural",
  "Super tasty",
];

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const orbVariants = {
    animate: (i: number) => ({
      x: [0, i % 2 === 0 ? 30 : -30, 0],
      y: [0, i % 2 === 0 ? -40 : 40, 0],
      transition: {
        duration: 10 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-[var(--navbar-height)]">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&q=80&w=1920" 
          alt="Premium textured background" 
          className="w-full h-full object-cover grayscale-[40%] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={orbVariants}
              animate="animate"
              className="absolute rounded-full blur-[120px] opacity-[0.07] bg-amber-500"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                top: `${15 * i}%`,
                left: `${(i % 2 === 0 ? 10 : 60) + (i * 2)}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-6 py-12 lg:py-20 flex-1 flex flex-col justify-center">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center w-full"
        >
          {/* Top Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm"
          >
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-amber-500">
              The Original Taste of Indiranagar
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="w-full text-[clamp(2.5rem,10vw,9rem)] font-black text-white leading-[0.95] mb-8 sm:mb-12 tracking-[-0.04em] uppercase"
          >
            <span className="block mb-2 text-slate-100">Bengaluru’s Favorite</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 drop-shadow-[0_10px_30px_rgba(245,158,11,0.3)]">
              Badam Milk
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-slate-400 text-base sm:text-xl md:text-2xl leading-relaxed font-medium mb-10 px-4">
              A local legacy since 1998. Crafted with pure milk, organic saffron, and the finest hand-picked almonds.
            </p>
            
            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="hidden sm:flex flex-col items-center gap-2 opacity-30 mt-12"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative w-full py-5 bg-slate-950/60 backdrop-blur-xl border-y border-white/5 overflow-hidden z-20">
        <motion.div 
          className="flex whitespace-nowrap gap-16 sm:gap-32"
          animate={{ x: [0, -1200] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(12)].map((_, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {TICKER_ITEMS.map((text, i) => (
                <div key={`${groupIndex}-${i}`} className="flex items-center gap-4 sm:gap-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-amber-500 transition-colors duration-500 cursor-default">
                    {text}
                  </span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
        
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Hero;