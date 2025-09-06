import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  variant?: 'default' | 'futuristic';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  variant = 'futuristic'
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (variant === 'futuristic') {
    return (
      <div className={`relative w-full h-4 glass-dark rounded-full overflow-hidden border border-slate-600/30 ${className}`}>
        {/* CORREÇÃO 2: Background glow amarelo */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 rounded-full" />
        
        {/* CORREÇÃO 2: Progress bar amarelo */}
        <motion.div
          className="relative h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 shadow-lg progress-glow"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 20px rgba(255, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          
          {/* Particle effects */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse" />
        </motion.div>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-white drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    /* CORREÇÃO 2: Cores amarelas para variant default */
    <div className={`w-full bg-slate-700/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-slate-600/30 ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          boxShadow: '0 0 20px rgba(255, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      />
    </div>
  );
};