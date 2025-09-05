import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700/90 hover:to-purple-700/90 text-white focus:ring-blue-500 shadow-lg shadow-blue-600/25 backdrop-blur-sm border border-blue-500/20 disabled:from-slate-600/50 disabled:to-slate-600/50 disabled:shadow-none',
    secondary: 'bg-slate-600/70 hover:bg-slate-700/70 text-white focus:ring-slate-500 backdrop-blur-sm border border-slate-500/20 disabled:bg-slate-600/30',
    outline: 'border border-slate-600/50 hover:bg-slate-800/50 text-slate-300 focus:ring-slate-500 backdrop-blur-sm hover:border-slate-500/70 disabled:border-slate-700/30 disabled:text-slate-500',
    ghost: 'hover:bg-slate-800/50 text-slate-300 focus:ring-slate-500 backdrop-blur-sm disabled:text-slate-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base rounded-xl'
  };

  return (
    <motion.button
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};