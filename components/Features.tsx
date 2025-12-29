import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Zap, Leaf, Heart } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const features = [
  {
    icon: Droplets,
    title: "Pure Ingredients",
    desc: "We use only mineral water and premium dairy products for our beverages.",
    link: "#about"
  },
  {
    icon: Leaf,
    title: "Organic Fruits",
    desc: "Sourced directly from local farmers to ensure maximum freshness and taste.",
    link: "#menu"
  },
  {
    icon: Zap,
    title: "Fast Service",
    desc: "Quick preparation without compromising on the quality or hygiene.",
    link: "#contact"
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Every glass is prepared with the same passion as our very first day.",
    link: "#testimonials"
  }
];

const Features: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Why Choose Jive?" subtitle="THE DIFFERENCE" center />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              onClick={() => scrollToSection(feature.link)}
              className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer hover:bg-slate-900 active:scale-95 shadow-lg hover:shadow-amber-500/5"
            >
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-sans font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
              <span className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest group-hover:text-amber-500 transition-colors flex items-center gap-2">
                Learn More <Zap size={10} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;