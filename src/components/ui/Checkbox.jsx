import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export const Checkbox = ({
  id,
  label,
  description,
  checked,
  onChange,
  variant = 'default', // 'default' | 'card'
  className,
  disabled = false,
  ...props
}) => {
  if (variant === 'card') {
    return (
      <label
        htmlFor={id}
        className={clsx(
          'flex items-start gap-3 p-3.5 rounded-lg border transition-all cursor-pointer select-none',
          checked
            ? 'bg-amber-100/70 border-amber-800/80 shadow-xs'
            : 'bg-stone-100/50 border-stone-300 hover:border-amber-700/40',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <div
            className={clsx(
              'w-4 h-4 rounded border flex items-center justify-center transition-colors',
              checked ? 'bg-amber-800 border-amber-900 text-amber-50' : 'border-stone-400 bg-white'
            )}
          >
            {checked && <Check size={12} strokeWidth={3} />}
          </div>
        </div>
        <div className="text-sm">
          {label && <p className="font-serif font-semibold text-stone-900">{label}</p>}
          {description && <p className="text-stone-600 text-xs mt-0.5">{description}</p>}
        </div>
      </label>
    );
  }

  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex items-center gap-2 cursor-pointer select-none text-sm font-serif text-stone-800',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={clsx(
            'w-4 h-4 rounded border flex items-center justify-center transition-colors',
            checked ? 'bg-amber-800 border-amber-900 text-amber-50' : 'border-stone-400 bg-white'
          )}
        >
          {checked && <Check size={12} strokeWidth={3} />}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
