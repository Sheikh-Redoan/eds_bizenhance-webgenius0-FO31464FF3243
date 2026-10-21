import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { Pin, MessageSquare, Eye } from 'lucide-react';
import AuthorMeta from '../../components/AuthorMeta';
import TagChip from '../../components/TagChip';
import LikeButton from '../../components/LikeButton';
import FramedCard from '../../components/FramedCard';

export const PostCard = ({ post, onLike }) => {
  const navigate = useNavigate();

  return (
    <FramedCard
      onClick={() => navigate(`/community/guild-gate/posts/${post.id}`)}
      className={clsx(
        'space-y-3.5',
        post.pinned && 'border-amber-700/60 bg-[#faf6ed]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {post.pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-serif font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              <Pin size={11} className="rotate-45" />
              <span>Pinned Scroll</span>
            </span>
          )}
          <span className="text-xs font-serif font-bold text-stone-600 bg-stone-200/70 px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(post.tags || []).slice(0, 3).map((t) => (
            <TagChip key={t} label={t} className="!text-[10px] !py-0.2 !px-2" />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 hover:text-amber-900 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="font-serif text-xs sm:text-sm text-stone-600 line-clamp-2 mt-1 leading-relaxed">
          {post.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-200/80">
        <AuthorMeta author={post.author} createdAt={post.createdAt} />

        <div className="flex items-center gap-3 text-xs font-serif text-stone-600">
          <span className="flex items-center gap-1">
            <Eye size={13} className="text-stone-400" />
            <span>{post.views || 0}</span>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={13} className="text-stone-400" />
            <span>{post.repliesCount || 0}</span>
          </span>
          <LikeButton
            initialCount={post.likes || 0}
            size="sm"
            onLikeChange={(liked, count) => onLike?.(post.id, liked, count)}
          />
        </div>
      </div>
    </FramedCard>
  );
};

export default PostCard;
