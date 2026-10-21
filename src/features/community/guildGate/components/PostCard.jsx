import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';

export const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#B49267]/20 hover:bg-[#B49267]/30 transition-colors border border-[#B49267]/50 rounded-sm p-4 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4">
      {/* Top Author Row & Tag */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author?.name || ''}
              className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/40 shadow-xs"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-stone-700 border border-white/40 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {post.author?.name ? post.author.name.charAt(0) : 'M'}
            </div>
          )}

          {/* Name & Roles / Time */}
          <div className="flex flex-col items-start gap-0.5 text-left">
            <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
              {post.author?.name || 'Anonymous Bard'}
            </span>

            <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
              <span className="capitalize">{post.author?.role || 'Member'}</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
              <div className="inline-flex items-center gap-1">
                <Clock size={11} className="opacity-80" />
                <span>{post.timeAgoText || '21h ago'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tag on Right */}
        {(post.tags?.[0] || post.category) && (
          <div className="px-2.5 py-1 border border-white/70 rounded-xs flex items-center justify-center shrink-0">
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-none">
              {post.tags?.[0] || post.category}
            </span>
          </div>
        )}
      </div>

      {/* Post Title & Excerpt */}
      <div className="flex flex-col items-start gap-1.5 text-left w-full">
        <h3
          onClick={() => navigate(`/community/guild-gate/posts/${post.id}`)}
          className="text-white text-base sm:text-lg font-normal font-Merriweather hover:underline cursor-pointer leading-snug"
        >
          {post.title}
        </h3>

        <p className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Bottom Row: Stats (Appreciate & Replies) + Ornate READ button */}
      <div className="w-full flex items-center justify-between pt-1">
        <div className="flex items-center gap-5 sm:gap-6 text-white text-xs sm:text-sm font-Merriweather">
          {/* Appreciate */}
          <div className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer">
            <Heart size={14} className="opacity-80" />
            <span className="font-medium text-white">{post.likes ?? 120}</span>
            <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
          </div>

          {/* Replies */}
          <div className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer">
            <MessageSquare size={14} className="opacity-80" />
            <span className="font-medium text-white">{post.repliesCount ?? 11}</span>
            <span className="text-white/70 text-xs hidden xs:inline">Replies</span>
          </div>
        </div>

        {/* Ornate READ Button */}
        <button
          type="button"
          onClick={() => navigate(`/community/guild-gate/posts/${post.id}`)}
          className="relative group w-24 sm:w-28 h-7 sm:h-8 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs"
        >
          <img
            src={buttonBorderSecondary}
            alt=""
            className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
          />
          <span className="relative z-10 inline-flex items-center gap-1 text-neutral-950 text-xs sm:text-sm font-normal font-Merriweather leading-none">
            <span>READ</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
