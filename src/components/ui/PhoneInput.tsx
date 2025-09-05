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
    <Input
      label={label}
      value={value}
      onChange={handleChange}
      placeholder="(11) 99999-9999"
      error={error}
      required={required}
      maxLength={15}
    />
  );
};