import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-3 py-2 bg-slate-900/50 backdrop-blur-sm border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300',
          error 
            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30 focus:shadow-lg focus:shadow-red-500/20' 
            : 'border-slate-600/50 focus:border-blue-500/70 focus:ring-blue-500/30 focus:shadow-lg focus:shadow-blue-500/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
};