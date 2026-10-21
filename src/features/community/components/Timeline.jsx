import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, Clock } from 'lucide-react';

export const Timeline = ({
  items = [],
  className,
}) => {
  return (
    <div className={clsx('space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-amber-900/20', className)}>
      {items.map((item, idx) => {
        const isCompleted = item.completed;
        const isCurrent = item.current;

        return (
          <div key={idx} className="relative flex items-start gap-4 pl-8 group">
            <div
              className={clsx(
                'absolute left-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white transition-all',
                isCompleted
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : isCurrent
                  ? 'border-amber-700 bg-amber-100 ring-2 ring-amber-400/50'
                  : 'border-stone-400 bg-stone-200'
              )}
            >
              {isCompleted && <CheckCircle2 size={10} />}
              {isCurrent && <Clock size={10} className="text-amber-900" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className={clsx('font-serif font-bold text-sm', isCurrent ? 'text-amber-900' : 'text-stone-800')}>
                  {item.title}
                </span>
                {item.date && (
                  <span className="text-xs text-stone-500 font-sans">{item.date}</span>
                )}
              </div>
              {item.description && (
                <p className="text-xs font-serif text-stone-600 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
