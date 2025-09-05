import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      className={clsx(
        'bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/20',
        paddingClasses[padding],
        hoverable && 'cursor-pointer',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
        backdropFilter: 'blur(20px)',
        borderImage: 'linear-gradient(135deg, rgba(148, 163, 184, 0.3), rgba(71, 85, 105, 0.1)) 1'
      }}
    >
      {children}
    </motion.div>
  );
};