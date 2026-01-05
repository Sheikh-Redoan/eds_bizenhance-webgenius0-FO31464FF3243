import React from 'react';
import { clsx } from 'clsx';

const Input = ({ className, ...props }) => {
  return (
    <div 
      className={clsx(
        'flex h-[48px] w-full items-center gap-[10px] self-stretch',
        'px-[30px] py-[10px]',
        
        'border border-[#B49267]',
        'bg-[#B49267]/30',
        
        className
      )}
    >
      <input
        className={clsx(
          'font-merriweather font-normal text-[16px] leading-[24px]',
          'text-[#AAAAAA] placeholder:text-[#AAAAAA]',
          
          'h-full w-full bg-transparent border-none outline-none'
        )}
        {...props}
      />
    </div>
  );
};

export default Input;