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
    /* CORREÇÃO 2: Remover cores azuis/roxas e usar apenas amarelo */
    primary: 'bg-gradient-to-r from-yellow-600/90 via-yellow-500/90 to-yellow-600/90 hover:from-yellow-700/90 hover:via-yellow-600/90 hover:to-yellow-700/90 text-black focus:ring-yellow-500 shadow-lg shadow-yellow-600/25 backdrop-blur-sm border border-yellow-500/20 disabled:from-slate-600/50 disabled:to-slate-600/50 disabled:shadow-none btn-futuristic',
    secondary: 'glass-dark hover:bg-slate-700/70 text-white focus:ring-slate-500 border border-slate-500/20 disabled:bg-slate-600/30 btn-futuristic',
    outline: 'border border-slate-600/50 hover:glass-dark text-slate-300 focus:ring-slate-500 backdrop-blur-sm hover:border-slate-500/70 disabled:border-slate-700/30 disabled:text-slate-500 btn-futuristic',
    ghost: 'hover:glass-dark text-slate-300 focus:ring-slate-500 backdrop-blur-sm disabled:text-slate-500 btn-futuristic',
    /* CORREÇÃO 2: Substituir cores cyan/blue/purple por amarelo */
    futuristic: 'bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 hover:from-yellow-500/30 hover:via-yellow-400/30 hover:to-yellow-500/30 text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/50 focus:ring-yellow-500 backdrop-blur-sm shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 btn-futuristic animate-pulse-glow'
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
      
      {/* CORREÇÃO 2: Glow effect amarelo para variant futuristic */}
      {variant === 'futuristic' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 rounded-2xl blur-sm -z-10" />
      )}
    </motion.button>
  );
};