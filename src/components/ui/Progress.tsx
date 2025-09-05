import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full bg-slate-700/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-slate-600/30 ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 shadow-lg shadow-blue-500/30"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      />
    </div>
  );
};