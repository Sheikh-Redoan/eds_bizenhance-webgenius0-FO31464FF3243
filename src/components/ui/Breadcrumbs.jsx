import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';

export const Breadcrumbs = ({ items = [], className }) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx('flex items-center space-x-1.5 text-xs font-serif text-stone-600 my-2', className)}>
      <Link to="/community" className="hover:text-amber-900 transition-colors flex items-center gap-1">
        <Home size={13} className="text-stone-500" />
        <span>Community</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="text-stone-400 shrink-0" />
            {isLast || !item.to ? (
              <span className="font-semibold text-amber-950 truncate max-w-[200px] sm:max-w-[320px]">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-amber-900 transition-colors truncate max-w-[150px]">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
