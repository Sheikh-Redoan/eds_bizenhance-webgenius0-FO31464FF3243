import React from 'react';
import { clsx } from 'clsx';

export const ParchmentPanel = ({
  children,
  className,
  padded = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-[#f9f5ec] border border-amber-900/30 rounded-xl shadow-xs relative',
        padded && 'p-5 sm:p-7',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParchmentPanel;
