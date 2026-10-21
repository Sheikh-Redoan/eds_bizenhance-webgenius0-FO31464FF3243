import React from 'react';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import FramedCard from './FramedCard';

export const ChamberCard = ({
  icon: Icon,
  title,
  description,
  count,
  onClick,
  className,
}) => {
  return (
    <FramedCard
      onClick={onClick}
      className={clsx('flex items-start justify-between gap-4 group', className)}
    >
      <div className="flex items-start gap-3.5">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-amber-900/10 text-amber-900 border border-amber-900/20 flex items-center justify-center shrink-0 group-hover:bg-amber-900 group-hover:text-amber-100 transition-colors">
            <Icon size={20} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
              {title}
            </h3>
            {count !== undefined && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                {count}
              </span>
            )}
          </div>
          <p className="font-serif text-xs text-stone-600 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        size={18}
        className="text-stone-400 group-hover:text-amber-900 group-hover:translate-x-1 transition-all shrink-0 mt-2"
      />
    </FramedCard>
  );
};

export default ChamberCard;
