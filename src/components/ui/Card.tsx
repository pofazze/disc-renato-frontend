import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'selected';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  onClick
}) => {
  const baseClasses = 'card-base';
  
  const variantClasses = {
    default: '',
    interactive: 'card-interactive cursor-pointer',
    selected: 'card-selected'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};