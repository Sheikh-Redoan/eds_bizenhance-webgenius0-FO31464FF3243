import React from 'react';
import { clsx } from 'clsx';
import { Bookmark, Share2, Flag } from 'lucide-react';

export const ThreadActions = ({
  isSaved = false,
  onToggleSave,
  onShare,
  onReport,
  className,
}) => {
  return (
    <div className={clsx('flex items-center gap-1.5 text-stone-600', className)}>
      <button
        type="button"
        onClick={onToggleSave}
        title={isSaved ? 'Unfollow dispatch' : 'Follow dispatch'}
        className={clsx(
          'p-2 rounded-full transition-colors',
          isSaved ? 'text-amber-800 bg-amber-100 hover:bg-amber-200' : 'hover:bg-stone-200/80 text-stone-600 hover:text-stone-900'
        )}
      >
        <Bookmark size={16} className={clsx(isSaved && 'fill-amber-800')} />
      </button>

      <button
        type="button"
        onClick={onShare}
        title="Share dispatch scroll"
        className="p-2 rounded-full hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 transition-colors"
      >
        <Share2 size={16} />
      </button>

      <button
        type="button"
        onClick={onReport}
        title="Report to Overseers"
        className="p-2 rounded-full hover:bg-red-100 text-stone-500 hover:text-red-700 transition-colors"
      >
        <Flag size={15} />
      </button>
    </div>
  );
};

export default ThreadActions;
