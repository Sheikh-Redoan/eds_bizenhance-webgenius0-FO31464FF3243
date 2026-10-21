import React from 'react';
import { clsx } from 'clsx';

export const SectionHeader = ({
  title,
  subtitle,
  action,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-amber-900/20 mb-5', className)}>
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
