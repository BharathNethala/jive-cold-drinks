import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './ui/Button';

const AboutSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const xBg = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background text - parallax effect */}
      <motion.div 
        style={{ x: xBg }}
        className="absolute top-20 left-0 w-[300%] overflow-hidden opacity-[0.03] pointer-events-none select-none"
      >
        <h2 className="text-[12rem] sm:text-[18rem] lg:text-[25rem] font-black text-white whitespace-nowrap uppercase">
          Fresh Organic Tasty Quality Refreshing Authentic Fresh Organic Tasty Quality
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none group cursor-pointer" onClick={scrollToMenu}>
              <div className="absolute -inset-2 sm:-inset-6 border-2 border-amber-500/5 rounded-2xl transform rotate-3 pointer-events-none group-hover:rotate-0 group-hover:border-amber-500/20 transition-all duration-700" />
              <div className="overflow-hidden rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative z-10 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000" 
                  alt="Premium Jive Store Ambience" 
                  className="w-full h-[400px] sm:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-[0.2em] shadow-2xl">View Menu</div>
                </div>
              </div>
              
              {/* Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="absolute -bottom-8 -left-4 sm:bottom-12 sm:-left-12 bg-slate-800 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-3xl z-20 hover:border-amber-500/50 transition-colors"
              >
                <p className="text-3xl sm:text-5xl text-amber-500 font-black mb-1">25+</p>
                <p className="text-slate-300 text-[10px] sm:text-xs uppercase tracking-widest font-bold leading-tight">
                  Years of Iconic<br className="hidden sm:block"/> Legacy in Blr
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-amber-500 font-black tracking-[0.3em] uppercase text-xs mb-6 block"
            >
              Our Story
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-8 leading-[1.1] font-black tracking-tighter">
              Crafting refreshing <br className="hidden xs:block" />
              <span className="text-slate-500">traditions daily</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl mb-8 leading-relaxed font-medium max-w-xl">
              Since 1998, we've been the heart of Bangalore's beverage scene, blending historical flavors with modern artisan techniques.
            </p>
            <p className="text-slate-400 mb-10 leading-relaxed font-medium text-base max-w-xl">
              Every Badam Milk we pour is a testament to our commitment to pure, unadulterated ingredients. We don't believe in shortcuts, only in the slow-cooked perfection that has defined us for over two decades.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12 w-full">
              {[
                { title: "100% Pure", desc: "No artificial colors or preservatives." },
                { title: "Local Love", desc: "A Bangalore staple for generations." }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group"
                  onClick={scrollToMenu}
                >
                  <h4 className="text-white font-black text-lg mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{stat.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="font-bold px-10 py-4 text-lg" onClick={scrollToMenu}>
              Our Full Menu
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;