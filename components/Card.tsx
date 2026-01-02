'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = true,
  onClick,
}: CardProps) {
  return (
    <motion.div
      className={`
        bg-dark-card 
        border border-dark-border 
        rounded-xl 
        overflow-hidden
        ${hover ? 'card-hover' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -8 } : {}}
    >
      {children}
    </motion.div>
  );
}

