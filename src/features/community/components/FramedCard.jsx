import React from 'react';
import { clsx } from 'clsx';

export const FramedCard = ({
  children,
  className,
  hoverable = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative bg-[#fcf9f2] border-2 border-stone-300 rounded-xl p-5 shadow-sm transition-all duration-200 overflow-hidden',
        hoverable && 'hover:shadow-md hover:border-amber-800/60 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Subtle corner ornament accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-900/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-900/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-900/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-900/50" />
      {children}
    </div>
  );
};

export default FramedCard;
