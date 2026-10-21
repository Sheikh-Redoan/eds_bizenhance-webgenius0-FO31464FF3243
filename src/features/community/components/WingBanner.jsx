import React from 'react';
import { clsx } from 'clsx';
import { Sparkles } from 'lucide-react';

export const WingBanner = ({
  title,
  subtitle,
  tag,
  icon: Icon,
  actions,
  className,
}) => {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border-2 border-amber-900/40 bg-gradient-to-r from-[#2f1b0c] via-[#432818] to-[#1c1007] text-[#f7eedd] p-6 sm:p-8 shadow-xl mb-6',
        className
      )}
    >
      {/* Decorative filigree glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          {tag && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles size={11} />
              <span>{tag}</span>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-wide text-amber-100 flex items-center gap-3">
            {Icon && <Icon className="text-amber-400 shrink-0" size={32} />}
            <span>{title}</span>
          </h1>
          {subtitle && (
            <p className="font-serif text-sm sm:text-base text-amber-200/80 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default WingBanner;
