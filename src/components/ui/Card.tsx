import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'glow';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padding = 'md',
  variant = 'glass'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl',
    glass: 'glass-card',
    glow: 'glass-card animate-glow'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      } : undefined}
      className={clsx(
        'shadow-2xl shadow-black/20 relative overflow-hidden max-h-screen-safe',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'cursor-pointer transition-transform duration-200',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 custom-scrollbar overflow-y-auto max-h-full">
        {children}
      </div>
    </motion.div>
  );
};