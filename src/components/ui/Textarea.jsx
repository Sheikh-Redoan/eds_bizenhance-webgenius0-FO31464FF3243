import React from 'react';
import { clsx } from 'clsx';

const Textarea = ({ className, rows = 4, resize = 'none', ...props }) => {
  return (
    <div 
      className={clsx(
        'flex w-full items-start gap-[10px] self-stretch',
        'px-[30px] py-[10px]',
        
        'border border-[#B49267]',
        'bg-[#B49267]/30',
        'rounded-sm', 
        
        className
      )}
    >
      <textarea
        rows={rows}
        className={clsx(
          'font-merriweather font-normal text-[16px] leading-[24px]',
          'text-[#AAAAAA] placeholder:text-[#AAAAAA]',
          
          'w-full min-h-[48px] bg-transparent border-none outline-none',
          `resize-${resize}`, 
          
          'scrollbar-thin scrollbar-thumb-amber-800/30 scrollbar-track-transparent'
        )}
        {...props}
      />
    </div>
  );
};

export default Textarea;