import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 rounded-full font-bold flex items-center gap-2 tracking-wide overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-amber-500 text-slate-950 shadow-[0_4px_15px_rgba(245,158,11,0.2)]",
    outline: "border border-amber-500/40 text-amber-500 bg-transparent",
    ghost: "text-slate-400 bg-transparent"
  };

  const motionVariants = {
    hover: {
      primary: {
        scale: 1.03,
        backgroundColor: "#fbbf24", // amber-400
        boxShadow: "0 10px 25px rgba(245,158,11,0.4)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      outline: {
        scale: 1.03,
        borderColor: "rgba(245, 158, 11, 1)",
        backgroundColor: "rgba(245, 158, 11, 0.08)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      ghost: {
        scale: 1.03,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#ffffff",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }
    },
    tap: {
      scale: 0.96,
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  };

  return (
    <motion.button
      whileHover={motionVariants.hover[variant]}
      whileTap={motionVariants.tap}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Sub-pixel shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;