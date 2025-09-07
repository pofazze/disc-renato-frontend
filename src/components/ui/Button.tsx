import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

import { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'flex flex-row flex-nowrap bg-primary-500 hover:bg-primary-600 text-black focus:ring-primary-500 shadow-lg shadow-primary-500/25 font-semibold btn-futuristic',
    secondary: 'flex flex-row flex-nowrap bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500 border border-gray-600 btn-futuristic',
    outline: 'flex flex-row flex-nowrap border-2 border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white focus:ring-gray-500 backdrop-blur-sm btn-futuristic',
    ghost: 'flex flex-row flex-nowrap hover:bg-gray-800 text-gray-300 hover:text-white focus:ring-gray-500 backdrop-blur-sm btn-futuristic',
    futuristic: 'flex flex-row flex-nowrap bg-gradient-to-r from-primary-500/20 to-primary-400/20 hover:from-primary-500/30 hover:to-primary-400/30 text-primary-300 border border-primary-500/30 hover:border-primary-400/50 focus:ring-primary-500 backdrop-blur-sm shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 btn-futuristic'
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
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};