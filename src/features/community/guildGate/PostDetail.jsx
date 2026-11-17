import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight, Heart, MessageSquare, Clock, Pencil, Trash2 } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import {
  useGetPostQuery,
  useLikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useDeletePostMutation,
} from '../../../redux/api/communityApi';
import Skeleton from '../../../components/ui/Skeleton';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

const Avatar = ({ src, name, size = 'md' }) => {
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

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const { data, isLoading, refetch } = useGetPostQuery(postId);
  const [likePost] = useLikePostMutation();
  const [addComment, { isLoading: isSubmittingReply }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();

  const [replyText, setReplyText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const post = data?.post;
  const replies = data?.replies || [];
  const isOwner = user && post && (user.id === post.user_id || user.id === post.user?.id);

  const handleLikePost = async () => {
    try {
      await likePost(postId).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handlePostReply = async () => {
    if (!replyText.trim() || isSubmittingReply) return;
    try {
      await addComment({ postId, content: replyText.trim(), parent_id: null }).unwrap();
      setReplyText('');
      refetch();
    } catch (err) {
      console.error('Failed to post reply:', err);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(commentId).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to like comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postId).unwrap();
      navigate('/community/guild-gate');
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : '';

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 my-4">
        <Skeleton variant="card" className="h-64" />
        <Skeleton variant="card" className="h-48" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-start items-start gap-8 my-2">
      {/* 1. Breadcrumbs */}
      <div className="w-full inline-flex flex-wrap justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white/60 shrink-0" />

        <button
          type="button"
          onClick={() => navigate('/community/guild-gate')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Guild Gate
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather capitalize">
          {post.category?.name || 'Post'}
        </span>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-8">
        {/* 2. Main Post Card */}
        <div className="w-full px-5 py-5 sm:px-6 sm:py-6 bg-[#B49267]/30 border border-[#B49267]/50 rounded-xs flex flex-col justify-center items-start gap-5 sm:gap-6 shadow-sm">
          {/* Author Meta Row + Category Tag */}
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar src={post.user?.avatar} name={post.user?.name} />

              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
                  {post.user?.name || 'Guild Member'}
                </span>

                <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
                  <span className="capitalize">{post.user?.role || 'Member'}</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
                  <div className="inline-flex items-center gap-1">
                    <Clock size={11} className="opacity-80" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            {post.category?.name && (
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-2 sm:px-2.5 py-1 border border-white/80 rounded-xs flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-none">
                    {post.category.name}
                  </span>
                </div>

                {/* Owner actions */}
                {isOwner && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate(`/community/guild-gate/posts/${postId}/edit`)}
                      className="p-1.5 rounded-xs bg-[#B49267]/20 hover:bg-[#B49267]/40 border border-[#B49267]/40 text-white/70 hover:text-white transition-colors cursor-pointer"
                      title="Edit post"
                    >
                      <Pencil size={14} />
                    </button>

                    {!confirmDelete ? (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="p-1.5 rounded-xs bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-red-400/70 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete post"
                      >
                        <Trash2 size={14} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/70 text-xs font-Merriweather">Sure?</span>
                        <button
                          type="button"
                          onClick={handleDeletePost}
                          disabled={isDeletingPost}
                          className="px-2 py-1 text-xs font-Merriweather bg-red-700/80 hover:bg-red-700 text-white rounded-xs cursor-pointer transition-colors"
                        >
                          {isDeletingPost ? '…' : 'Yes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(false)}
                          className="px-2 py-1 text-xs font-Merriweather bg-white/10 hover:bg-white/20 text-white rounded-xs cursor-pointer transition-colors"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="w-full pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-3 text-left">
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="text-white text-lg sm:text-xl font-normal font-Merriweather leading-snug">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-white text-xs sm:text-sm font-normal font-Merriweather leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Post image */}
              {post.image && (
                <div className="w-full rounded-xs overflow-hidden border border-[#B49267]/40">
                  <img
                    src={post.image}
                    alt={post.title}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full  object-cover"
                  />
                </div>
              )}

              {/* Engagement */}
              <div className="flex items-center gap-5 sm:gap-6 pt-1 text-white text-xs sm:text-sm font-Merriweather">
                <button
                  type="button"
                  onClick={handleLikePost}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <Heart
                    size={15}
                    className={post.is_liked ? 'text-red-400 fill-red-400' : 'opacity-80'}
                  />
                  <span className="font-medium text-white">{post.total_likes ?? 0}</span>
                  <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
                </button>

                <div className="flex items-center gap-1.5 text-white/90">
                  <MessageSquare size={15} className="opacity-80" />
                  <span className="font-medium text-white">{post.replies_count ?? replies.length}</span>
                  <span className="text-white/70 text-xs hidden xs:inline">Replies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Replies Section */}
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full pb-2 border-b border-stone-400 inline-flex justify-start items-center text-left">
            <h2 className="text-white text-2xl sm:text-3xl font-normal font-MetalMania leading-tight">
              {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
            </h2>
          </div>

          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="w-full px-5 py-5 sm:px-6 sm:py-6 bg-[#B49267]/30 border border-[#B49267]/50 rounded-xs flex flex-col justify-center items-start gap-5 sm:gap-6 shadow-sm"
              >
                {/* Reply Author Row */}
                <div className="w-full flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={reply.user?.avatar} name={reply.user?.name} />

                    <div className="flex flex-col items-start gap-0.5 text-left">
                      <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
                        {reply.user?.name || 'Guild Member'}
                      </span>

                      <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
                        <span className="capitalize">{reply.user?.role || 'Member'}</span>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
                        <div className="inline-flex items-center gap-1">
                          <Clock size={11} className="opacity-80" />
                          <span>{formatDate(reply.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Content */}
                <div className="w-full pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 flex flex-col justify-start items-start gap-3 text-left">
                    <p className="max-w-3xl text-white text-xs sm:text-sm font-normal font-Merriweather leading-relaxed whitespace-pre-line">
                      {reply.content}
                    </p>

                    <div className="flex items-center gap-5 sm:gap-6 pt-1 text-white text-xs sm:text-sm font-Merriweather">
                      <button
                        type="button"
                        onClick={() => handleLikeComment(reply.id)}
                        className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                      >
                        <Heart
                          size={15}
                          className={reply.is_liked ? 'text-red-400 fill-red-400' : 'opacity-80'}
                        />
                        <span className="font-medium text-white">{reply.total_likes ?? 0}</span>
                        <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
                      </button>

                      {user?.id === reply.user?.id && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(reply.id)}
                          className="text-red-400/70 hover:text-red-400 text-xs font-Merriweather transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. POST REPLY Box */}
        <div className="w-full border border-stone-400 rounded-xs overflow-hidden flex flex-col justify-start items-start shadow-sm">
          <div className="w-full px-5 sm:px-6 py-4 bg-[#B49267]/30 border-b border-stone-400 flex justify-start items-center text-left">
            <h3 className="text-white text-lg sm:text-xl font-normal font-Merriweather tracking-wide">
              POST REPLY
            </h3>
          </div>

          <div className="w-full px-5 sm:px-6 py-5 bg-[#B49267]/30 flex flex-col justify-center items-start gap-4">
            <div className="w-full bg-[#B49267]/20 border border-stone-400/80 rounded-xs p-3 sm:p-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply…"
                rows={4}
                className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base font-normal font-Merriweather focus:outline-hidden resize-y leading-relaxed"
              />
            </div>

            <div className="w-full pt-1 flex justify-between items-center">
              <span className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather">
                {replyText.length} chars
              </span>

              <button
                type="button"
                onClick={handlePostReply}
                disabled={!replyText.trim() || isSubmittingReply}
                className={`relative group w-32 sm:w-36 h-10 sm:h-11 flex items-center justify-center select-none transition-all duration-150 rounded-xs ${
                  replyText.trim() && !isSubmittingReply
                    ? 'cursor-pointer active:scale-95 bg-white'
                    : 'opacity-40 cursor-not-allowed bg-white'
                }`}
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                  {isSubmittingReply ? 'Posting...' : 'Post Reply'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
