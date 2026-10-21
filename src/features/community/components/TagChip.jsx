import React from 'react';
import { clsx } from 'clsx';

export const TagChip = ({
  label,
  selected = false,
  onClick,
  removable = false,
  onRemove,
  className,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-medium border transition-colors select-none',
        selected
          ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-xs'
          : 'bg-stone-200/80 text-stone-800 border-stone-300 hover:border-amber-700/60 hover:bg-amber-100/60',
        isClickable && 'cursor-pointer active:scale-95',
        className
      )}
    >
      <span>{label}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(label);
          }}
          className="hover:text-red-300 rounded-full text-sm font-bold ml-0.5 leading-none"
        >
          &times;
        </button>
      )}
    </span>
  );
};

export default TagChip;
