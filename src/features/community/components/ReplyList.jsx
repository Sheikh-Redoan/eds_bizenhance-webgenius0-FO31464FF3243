import React from 'react';
import { clsx } from 'clsx';
import AuthorMeta from './AuthorMeta';
import LikeButton from './LikeButton';
import MarkdownRenderer from './MarkdownRenderer';
import EmptyState from '../../../components/ui/EmptyState';
import { MessageSquare } from 'lucide-react';

export const ReplyList = ({
  replies = [],
  onLikeReply,
  className,
}) => {
  if (!replies.length) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No replies yet"
        description="Be the first scholar or bard to contribute to this discussion."
        className="my-4"
      />
    );
  }

  return (
    <div className={clsx('space-y-4 my-6', className)}>
      <h3 className="font-serif font-bold text-lg text-stone-900 pb-2 border-b border-amber-900/20">
        Dispatches ({replies.length})
      </h3>

      {replies.map((reply) => (
        <div
          key={reply.id}
          className="p-4 rounded-xl bg-[#fdfbf6] border border-stone-300/80 shadow-2xs space-y-2.5 transition-all hover:border-amber-700/40"
        >
          <div className="flex items-center justify-between gap-3">
            <AuthorMeta author={reply.author} createdAt={reply.createdAt} />
            <LikeButton
              initialCount={reply.likes || 0}
              size="sm"
              onLikeChange={(liked, count) => onLikeReply?.(reply.id, liked, count)}
            />
          </div>

          <div className="pl-10">
            <MarkdownRenderer content={reply.content} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
