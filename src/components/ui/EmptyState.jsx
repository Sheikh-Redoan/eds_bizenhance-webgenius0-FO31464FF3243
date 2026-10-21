import React from 'react';
import { clsx } from 'clsx';
import { Feather } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Feather,
  title = 'No scrolls found',
  description = 'There are currently no items in this chamber. Be the first to compose one.',
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-amber-900/30 bg-[#fbf7ee]/60',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-amber-900/10 text-amber-800 flex items-center justify-center mb-3">
        <Icon size={28} />
      </div>
      <h3 className="font-serif font-bold text-lg text-stone-900">{title}</h3>
      <p className="font-serif text-sm text-stone-600 max-w-sm mt-1 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="ornate" onClick={onAction} className="mt-4 px-5 py-2 text-sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
