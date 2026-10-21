import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight, Heart, MessageSquare, Clock } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useGetPostQuery } from '../../../redux/api/communityApi';
import Skeleton from '../../../components/ui/Skeleton';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const { data: post, isLoading } = useGetPostQuery(postId);

  const [likes, setLikes] = useState(120);
  const [hasLiked, setHasLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [replies, setReplies] = useState([
    {
      id: 'rep-1',
      author: {
        id: 'user-mim-2',
        name: 'Melody Mim',
        role: 'Student | Teacher',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      },
      timeAgoText: '21h ago',
      title: 'Hello from Chittagong! Singer + beginner lyricist here',
      content:
        'I’ve been thinking about the moment when a technically accurate translation stops feeling musical. Is it the loss of rhythm, the shape of the vowels, or something less measurable?\nWhen you translate lyrics, which part do you protect first—and what are you willing to let change?',
      likes: 120,
      repliesCount: 11,
      tag: 'Introduction',
    },
  ]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handlePostReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: {
        id: user?._id || user?.id || 'anon',
        name: user?.name || 'Melody Mim',
        role: user?.role ? `${user.role}` : 'Student | Teacher',
        avatar:
          user?.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      },
      timeAgoText: 'Just now',
      title: post?.title || 'Reply on Lyric Cadence',
      content: replyText.trim(),
      likes: 0,
      repliesCount: 0,
      tag: post?.tags?.[0] || 'Discussion',
    };

    setReplies((prev) => [...prev, newReply]);
    setReplyText('');
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 my-4">
        <Skeleton variant="card" className="h-64" />
        <Skeleton variant="card" className="h-48" />
      </div>
    );
  }

  const currentPost = post || {
    id: postId,
    title: 'Hello from Chittagong! Singer + beginner lyricist here',
    content:
      'I’ve been thinking about the moment when a technically accurate translation stops feeling musical. Is it the loss of rhythm, the shape of the vowels, or something less measurable?\nWhen you translate lyrics, which part do you protect first—and what are you willing to let change?',
    category: 'Introduction',
    tags: ['Introduction'],
    author: {
      name: 'Melody Mim',
      role: 'Student | Teacher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    },
    likes: 120,
    repliesCount: 11,
    timeAgoText: '21h ago',
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-start items-start gap-8 my-2">
      {/* 1. Breadcrumbs Header */}
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
          {currentPost.category || currentPost.tags?.[0] || 'Introduction'}
        </span>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-8">
        {/* 2. Main Post Card */}
        <div className="w-full px-5 py-5 sm:px-6 sm:py-6 bg-[#B49267]/30 border border-[#B49267]/50 rounded-xs flex flex-col justify-center items-start gap-5 sm:gap-6 shadow-sm">
          {/* Author Meta Row + Tag */}
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {currentPost.author?.avatar ? (
                <img
                  src={currentPost.author.avatar}
                  alt={currentPost.author.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/40 shadow-xs"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-stone-700 border border-white/40 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {currentPost.author?.name ? currentPost.author.name.charAt(0) : 'M'}
                </div>
              )}

              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
                  {currentPost.author?.name || 'Melody Mim'}
                </span>

                <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
                  <span className="capitalize">{currentPost.author?.role || 'Student | Teacher'}</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
                  <div className="inline-flex items-center gap-1">
                    <Clock size={11} className="opacity-80" />
                    <span>{currentPost.timeAgoText || '21h ago'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tag Pill */}
            {(currentPost.tags?.[0] || currentPost.category) && (
              <div className="px-2 sm:px-2.5 py-1 border border-white/80 rounded-xs flex items-center justify-center shrink-0">
                <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-none">
                  {currentPost.tags?.[0] || currentPost.category}
                </span>
              </div>
            )}
          </div>

          {/* Post Content Body */}
          <div className="w-full pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-3 text-left">
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="text-white text-lg sm:text-xl font-normal font-Merriweather leading-snug">
                  {currentPost.title}
                </h1>
                <p className="max-w-3xl text-white text-xs sm:text-sm font-normal font-Merriweather leading-relaxed whitespace-pre-line">
                  {currentPost.content}
                </p>
              </div>

              {/* Engagement counts */}
              <div className="flex items-center gap-5 sm:gap-6 pt-1 text-white text-xs sm:text-sm font-Merriweather">
                <button
                  type="button"
                  onClick={handleLike}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <Heart
                    size={15}
                    className={hasLiked ? 'text-red-400 fill-red-400' : 'opacity-80'}
                  />
                  <span className="font-medium text-white">{likes}</span>
                  <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
                </button>

                <div className="flex items-center gap-1.5 text-white/90">
                  <MessageSquare size={15} className="opacity-80" />
                  <span className="font-medium text-white">
                    {currentPost.repliesCount ?? replies.length}
                  </span>
                  <span className="text-white/70 text-xs hidden xs:inline">Replies</span>
                </div>
              </div>
            </div>

            {/* Bookmark / Save Action Button */}
            <button
              type="button"
              className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/60 rounded-xs flex items-center justify-center cursor-pointer transition-colors shrink-0 text-white"
              title="Bookmark scroll"
            >
              <Heart size={16} className="text-white/90 hover:text-white" />
            </button>
          </div>
        </div>

        {/* 3. Replies Section */}
        <div className="w-full flex flex-col justify-start items-start gap-4">
          {/* Section Header: 12 Replies in Metal Mania */}
          <div className="w-full pb-2 border-b border-stone-400 inline-flex justify-start items-center text-left">
            <h2 className="text-white text-2xl sm:text-3xl font-normal font-MetalMania leading-tight">
              {replies.length + 11} Replies
            </h2>
          </div>

          {/* Reply List */}
          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="w-full px-5 py-5 sm:px-6 sm:py-6 bg-[#B49267]/30 border border-[#B49267]/50 rounded-xs flex flex-col justify-center items-start gap-5 sm:gap-6 shadow-sm"
              >
                {/* Author Row */}
                <div className="w-full flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {reply.author?.avatar ? (
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/40 shadow-xs"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-stone-700 border border-white/40 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {reply.author?.name ? reply.author.name.charAt(0) : 'M'}
                      </div>
                    )}

                    <div className="flex flex-col items-start gap-0.5 text-left">
                      <span className="text-white text-sm sm:text-base font-medium font-sans leading-tight">
                        {reply.author?.name || 'Melody Mim'}
                      </span>

                      <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
                        <span className="capitalize">{reply.author?.role || 'Student | Teacher'}</span>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />
                        <div className="inline-flex items-center gap-1">
                          <Clock size={11} className="opacity-80" />
                          <span>{reply.timeAgoText || '21h ago'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {reply.tag && (
                    <div className="px-2 sm:px-2.5 py-1 border border-white/80 rounded-xs flex items-center justify-center shrink-0">
                      <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-none">
                        {reply.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Reply Content Body */}
                <div className="w-full pt-4 sm:pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 flex flex-col justify-start items-start gap-3 text-left">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h3 className="text-white text-lg sm:text-xl font-normal font-Merriweather leading-snug">
                        {reply.title}
                      </h3>
                      <p className="max-w-3xl text-white text-xs sm:text-sm font-normal font-Merriweather leading-relaxed whitespace-pre-line">
                        {reply.content}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-5 sm:gap-6 pt-1 text-white text-xs sm:text-sm font-Merriweather">
                      <div className="flex items-center gap-1.5 text-white/90">
                        <Heart size={15} className="opacity-80" />
                        <span className="font-medium text-white">{reply.likes ?? 120}</span>
                        <span className="text-white/70 text-xs hidden xs:inline">Appreciate</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <MessageSquare size={15} className="opacity-80" />
                        <span className="font-medium text-white">{reply.repliesCount ?? 11}</span>
                        <span className="text-white/70 text-xs hidden xs:inline">Replies</span>
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    className="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/60 rounded-xs flex items-center justify-center cursor-pointer transition-colors shrink-0 text-white"
                  >
                    <Heart size={16} className="text-white/90 hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. POST REPLY Box */}
        <div className="w-full border border-stone-400 rounded-xs overflow-hidden flex flex-col justify-start items-start shadow-sm">
          {/* Header Bar: POST REPLY in Merriweather */}
          <div className="w-full px-5 sm:px-6 py-4 bg-[#B49267]/30 border-b border-stone-400 flex justify-start items-center text-left">
            <h3 className="text-white text-lg sm:text-xl font-normal font-Merriweather tracking-wide">
              POST REPLY
            </h3>
          </div>

          {/* Form Content */}
          <div className="w-full px-5 sm:px-6 py-5 bg-[#B49267]/30 flex flex-col justify-center items-start gap-4">
            {/* Input Box */}
            <div className="w-full bg-[#B49267]/20 border border-stone-400/80 rounded-xs p-3 sm:p-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply…"
                rows={4}
                className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base font-normal font-Merriweather focus:outline-hidden resize-y leading-relaxed"
              />
            </div>

            {/* Bottom Bar: Character count + Ornate Post Reply Button */}
            <div className="w-full pt-1 flex justify-between items-center">
              <span className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather">
                {replyText.length} chars
              </span>

              <button
                type="button"
                onClick={handlePostReply}
                disabled={!replyText.trim()}
                className={`relative group w-32 sm:w-36 h-10 sm:h-11 flex items-center justify-center select-none transition-all duration-150 rounded-xs ${
                  replyText.trim()
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
                  Post Reply
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
