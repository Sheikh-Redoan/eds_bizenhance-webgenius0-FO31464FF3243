import React from 'react';
import { clsx } from 'clsx';
import { parseDateBlock } from '../utils/formatters';

export const DateBlock = ({ date, className }) => {
  const { day, month } = parseDateBlock(date);

  return (
    <div
      className={clsx(
        'w-13 h-14 rounded-lg bg-gradient-to-b from-amber-900 to-amber-950 text-amber-100 border border-amber-700/80 flex flex-col items-center justify-center shadow-md shrink-0 select-none',
        className
      )}
    >
      <span className="text-[10px] font-serif tracking-widest text-amber-300 font-bold leading-none uppercase">
        {month}
      </span>
      <span className="text-xl font-bold font-serif leading-none mt-1 text-white">
        {day}
      </span>
    </div>
  );
};

export default DateBlock;
