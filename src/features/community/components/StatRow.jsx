import React from 'react';
import { clsx } from 'clsx';
import { Eye, MessageSquare, Clock } from 'lucide-react';
import { timeAgo } from '../utils/formatters';

export const StatRow = ({
  views = 0,
  replies = 0,
  createdAt,
  className,
}) => {
  return (
    <div className={clsx('flex items-center gap-4 text-xs font-serif text-stone-600', className)}>
      <span className="flex items-center gap-1">
        <Eye size={13} className="text-stone-500" />
        <span>{views} views</span>
      </span>

      <span className="flex items-center gap-1">
        <MessageSquare size={13} className="text-stone-500" />
        <span>{replies} replies</span>
      </span>

      {createdAt && (
        <span className="flex items-center gap-1">
          <Clock size={13} className="text-stone-500" />
          <span>{timeAgo(createdAt)}</span>
        </span>
      )}
    </div>
  );
};

export default StatRow;
