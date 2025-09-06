import React from 'react';
import { formatWhatsApp } from '../../lib/validators';
import { Input } from './Input';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label = 'WhatsApp',
  error,
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        className={`custom-input pl-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        value={value}
        onChange={handleChange}
        placeholder="(11) 99999-9999"
        maxLength={15}
        type="tel"
      />
      {error && (
        <p className="text-sm text-red-400 flex items-center space-x-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};