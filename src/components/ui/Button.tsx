import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'futuristic';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-cyan-600/90 hover:from-blue-700/90 hover:via-purple-700/90 hover:to-cyan-700/90 text-white focus:ring-blue-500 shadow-lg shadow-blue-600/25 backdrop-blur-sm border border-blue-500/20 disabled:from-slate-600/50 disabled:to-slate-600/50 disabled:shadow-none btn-futuristic',
    secondary: 'glass-dark hover:bg-slate-700/70 text-white focus:ring-slate-500 border border-slate-500/20 disabled:bg-slate-600/30 btn-futuristic',
    outline: 'border border-slate-600/50 hover:glass-dark text-slate-300 focus:ring-slate-500 backdrop-blur-sm hover:border-slate-500/70 disabled:border-slate-700/30 disabled:text-slate-500 btn-futuristic',
    ghost: 'hover:glass-dark text-slate-300 focus:ring-slate-500 backdrop-blur-sm disabled:text-slate-500 btn-futuristic',
    futuristic: 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:via-blue-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 focus:ring-cyan-500 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 btn-futuristic animate-pulse-glow'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-2xl'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: loading || disabled ? 1 : 1.02,
        y: loading || disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: loading || disabled ? 1 : 0.98,
        y: loading || disabled ? 0 : 0
      }}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect */}
      {!disabled && !loading && (
        <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
      )}
      
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin spinner-glow" />}
      <span className="relative z-10">{children}</span>
      
      {/* Glow effect for futuristic variant */}
      {variant === 'futuristic' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-sm -z-10" />
      )}
    </motion.button>
  );
};