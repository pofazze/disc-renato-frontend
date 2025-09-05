import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={clsx(
            'w-full px-4 py-3 glass-dark backdrop-blur-sm border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300',
            icon && 'pl-10',
            error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30 focus:shadow-lg focus:shadow-red-500/20' 
              : 'border-slate-600/50 focus:border-blue-500/70 focus:ring-blue-500/30 focus:shadow-lg focus:shadow-blue-500/20 hover:border-slate-500/70',
            className
          )}
          {...props}
        />
        
        {/* Focus glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
      </div>
      
      {error && (
        <p className="text-sm text-red-400 flex items-center space-x-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
};