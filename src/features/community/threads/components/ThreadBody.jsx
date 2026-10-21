import React from 'react';
import { clsx } from 'clsx';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import LikeButton from '../../components/LikeButton';
import ThreadActions from './ThreadActions';

export const ThreadBody = ({
  content,
  likes = 0,
  isSaved = false,
  onToggleSave,
  onShare,
  onReport,
  onLike,
  className,
}) => {
  return (
    <div className={clsx('space-y-6 py-4', className)}>
      <MarkdownRenderer content={content} className="text-base sm:text-lg" />

      <div className="flex items-center justify-between pt-4 border-t border-amber-900/10">
        <LikeButton initialCount={likes} onLikeChange={onLike} />
        <ThreadActions
          isSaved={isSaved}
          onToggleSave={onToggleSave}
          onShare={onShare}
          onReport={onReport}
        />
      </div>
    </div>
  );
};

export default ThreadBody;
