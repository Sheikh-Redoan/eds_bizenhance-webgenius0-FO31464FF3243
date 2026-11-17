import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Clock, ArrowRight, Pencil, Trash2 } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import { useDeletePostMutation } from '../../../../redux/api/communityApi';

const Avatar = ({ src, name, size = 'sm' }) => {
  const [failed, setFailed] = useState(false);
  const dim = size === 'sm' ? 'w-9 h-9 text-xs' : 'w-10 h-10 text-sm';
  const initial = name ? name.charAt(0).toUpperCase() : 'G';

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name || ''}
        onError={() => setFailed(true)}
        className={`${dim} rounded-full object-cover shrink-0 border border-white/40 shadow-xs`}
      />
    );
  }
  return (
    <div className={`${dim} rounded-full bg-stone-700 border border-white/40 flex items-center justify-center text-white font-semibold shrink-0`}>
      {initial}
    </div>
  );
};

export const PostCard = ({ post, currentUserId }) => {
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const author = post.user || {};
  const categoryName = post.category?.name || '';
  const timeAgo = post.created_at ? new Date(post.created_at).toLocaleDateString() : '';
  const isOwner = currentUserId && (currentUserId === post.user_id || currentUserId === post.user?.id);

  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="w-full bg-[#B49267]/20 hover:bg-[#B49267]/30 transition-colors border border-[#B49267]/50 rounded-sm p-4 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4">
      {/* Top Author Row & Tag */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar src={author.avatar} name={author.name} size="sm" />

          <div className="flex flex-col items-start gap-0.5 text-left">
            <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
              {author.name || 'Anonymous Bard'}
            </span>

            <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
              <span className="capitalize">{author.role || 'Member'}</span>
              {timeAgo && (
                <>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
                  <div className="inline-flex items-center gap-1">
                    <Clock size={11} className="opacity-80" />
                    <span>{timeAgo}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {categoryName && (
          <div className="px-2.5 py-1 border border-white/70 rounded-xs flex items-center justify-center shrink-0">
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-none">
              {categoryName}
            </span>
          </div>
        )}
      </div>

      {/* Post Title, Excerpt & Image */}
      <div className="flex flex-col items-start gap-1.5 text-left w-full">
        <h3
          onClick={() => navigate(`/community/guild-gate/posts/${post.id}`)}
          className="text-white text-base sm:text-lg font-normal font-Merriweather hover:underline cursor-pointer leading-snug"
        >
          {post.title}
        </h3>

        <p className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather leading-relaxed line-clamp-2">
          {post.content}
        </p>

        {/* Post image thumbnail */}
        {post.image && (
          <div className="w-full mt-1 rounded-xs overflow-hidden border border-[#B49267]/40">
            <img
              src={post.image}
              alt={post.title}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="w-full max-h-48 object-cover"
            />
          </div>
        )}
      </div>

      {/* Bottom Row: Stats + actions + READ button */}
      <div className="w-full flex items-center justify-between pt-1 gap-3">
        <div className="flex items-center gap-4 sm:gap-5 text-white text-xs sm:text-sm font-Merriweather">
          <div className="flex items-center gap-1.5 text-white/80">
            <Heart size={14} className="opacity-80" />
            <span className="font-medium text-white">{post.total_likes ?? 0}</span>
            <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
          </div>

          <div className="flex items-center gap-1.5 text-white/80">
            <MessageSquare size={14} className="opacity-80" />
            <span className="font-medium text-white">{post.replies_count ?? 0}</span>
            <span className="text-white/70 text-xs hidden xs:inline">Replies</span>
          </div>

          {/* Owner: Edit & Delete */}
          {isOwner && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(`/community/guild-gate/posts/${post.id}/edit`)}
                className="p-1.5 rounded-xs bg-[#B49267]/20 hover:bg-[#B49267]/40 border border-[#B49267]/40 text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Edit"
              >
                <Pencil size={13} />
              </button>

              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="p-1.5 rounded-xs bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-400/60 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-white/60 text-xs font-Merriweather">Sure?</span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-2 py-0.5 text-xs font-Merriweather bg-red-700/80 hover:bg-red-700 text-white rounded-xs cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-2 py-0.5 text-xs font-Merriweather bg-white/10 hover:bg-white/20 text-white rounded-xs cursor-pointer"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(`/community/guild-gate/posts/${post.id}`)}
          className="relative group w-24 sm:w-28 h-7 sm:h-8 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs shrink-0"
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
