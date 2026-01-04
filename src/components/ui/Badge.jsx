import React from 'react';
import { clsx } from 'clsx';

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-wood text-paper-light',
    gold: 'bg-gold text-wood-dark',
    success: 'bg-green-600 text-white',
  };

  return (
    <span className={clsx('px-3 py-1 rounded-full text-sm font-bold', variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
