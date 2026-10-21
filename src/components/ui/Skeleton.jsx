import React from 'react';
import { clsx } from 'clsx';

export const Skeleton = ({ className, variant = 'text', ...props }) => {
  const base = 'animate-pulse bg-stone-300/60 rounded';
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'w-10 h-10 rounded-full',
    thumbnail: 'w-24 h-24 rounded-lg',
    card: 'h-48 w-full rounded-xl',
  };

  return <div className={clsx(base, variants[variant], className)} {...props} />;
};

export default Skeleton;
