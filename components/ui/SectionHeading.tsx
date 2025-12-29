import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 sm:mb-16 px-4 ${center ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-amber-500 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase font-black mb-3 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-100 leading-tight font-extrabold tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`h-1 sm:h-1.5 w-16 sm:w-24 bg-gradient-to-r from-amber-500 to-transparent mt-4 sm:mt-6 ${center ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionHeading;