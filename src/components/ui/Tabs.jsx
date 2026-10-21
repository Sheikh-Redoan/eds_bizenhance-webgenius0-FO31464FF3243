import React from 'react';
import { clsx } from 'clsx';

export const Tabs = ({ tabs = [], activeTab, onChange, className }) => {
  return (
    <div className={clsx('flex items-center gap-2 border-b border-amber-900/30 pb-2 overflow-x-auto scrollbar-none', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-1.5 rounded-md text-sm font-serif font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap',
              isActive
                ? 'bg-amber-900/80 text-amber-100 shadow-md border border-amber-700/50'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/40'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={clsx('text-xs px-1.5 py-0.2 rounded-full', isActive ? 'bg-amber-950 text-amber-200' : 'bg-stone-300 text-stone-700')}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
