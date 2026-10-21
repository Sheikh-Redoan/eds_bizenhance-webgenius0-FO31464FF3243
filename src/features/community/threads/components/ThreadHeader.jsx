import React from 'react';
import { clsx } from 'clsx';
import AuthorMeta from '../../components/AuthorMeta';
import TagChip from '../../components/TagChip';
import StatRow from '../../components/StatRow';
import ThreadStatusBadge from './ThreadStatusBadge';

export const ThreadHeader = ({
  title,
  tags = [],
  author,
  createdAt,
  views,
  repliesCount,
  status,
  hasStatus = false,
  className,
}) => {
  return (
    <div className={clsx('space-y-4 pb-5 border-b border-amber-900/20', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>
        {hasStatus && status && <ThreadStatusBadge status={status} />}
      </div>

      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
        {title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <AuthorMeta author={author} createdAt={createdAt} />
        <StatRow views={views} replies={repliesCount} />
      </div>
    </div>
  );
};

export default ThreadHeader;
