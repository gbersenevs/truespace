'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  className = '',
  icon,
}: InputProps) {
  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-secondary">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 ${icon ? 'pl-12' : 'pl-4'}
          bg-dark-card text-white
          border border-dark-border
          rounded-lg
          focus:outline-none focus:border-white
          placeholder-accent-secondary
          transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      />
    </motion.div>
  );
}

