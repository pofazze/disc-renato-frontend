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
    default: 'bg-slate-800/30 backdrop-blur-xl border border-slate-700/50',
    glass: 'glass-card squircle',
    glow: 'glass-card squircle animate-glow'
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
        'shadow-2xl shadow-black/20 relative overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'card-hover cursor-pointer',
        className
      )}
      style={{
        background: variant === 'glass' || variant === 'glow' ? 
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)' : 
          undefined
      }}
    >
      {/* Animated border gradient */}
      {variant !== 'default' && (
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 -z-10">
          <div className="w-full h-full rounded-3xl bg-slate-900/50" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Floating particles effect */}
      {variant === 'glow' && (
        <>
          <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
        </>
      )}
    </motion.div>
  );
};