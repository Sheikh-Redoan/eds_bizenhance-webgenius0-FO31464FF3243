import React from 'react';
import { clsx } from 'clsx';
import { User } from 'lucide-react';
import RoleBadge from './RoleBadge';
import { timeAgo } from '../utils/formatters';

export const AuthorMeta = ({
  author,
  createdAt,
  showRole = true,
  className,
}) => {
  const name = author?.name || 'Anonymous Bard';
  const avatar = author?.avatar;
  const role = author?.role;

  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      <div className="w-8 h-8 rounded-full bg-stone-300 border border-amber-900/40 flex items-center justify-center overflow-hidden shrink-0">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User size={16} className="text-stone-600" />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-serif leading-tight">
        <span className="font-bold text-stone-900 hover:text-amber-900 cursor-pointer">
          {name}
        </span>
        {showRole && role && <RoleBadge role={role} />}
        {createdAt && (
          <span className="text-stone-500 font-sans text-[11px]">
            • {timeAgo(createdAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthorMeta;
