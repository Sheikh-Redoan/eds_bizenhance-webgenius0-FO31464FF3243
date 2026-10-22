import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ChevronRight,
  Bell,
  Share2,
  Flag,
  Heart,
  Clock,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { THREAD_WINGS } from '../config/wings';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useGetThreadQuery } from '../../../redux/api/communityApi';
import Skeleton from '../../../components/ui/Skeleton';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import RoleGate from '../components/RoleGate';
import { ROLES, THREAD_STATUS } from '../constants';

export const ThreadDetail = ({ wing: propWing }) => {
  const { wing: paramWing, threadId } = useParams();
  const wing = propWing || paramWing || 'support-wing';
  const config = THREAD_WINGS[wing] || THREAD_WINGS['support-wing'];
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const { data: apiThread, isLoading } = useGetThreadQuery({ wing, id: threadId });

  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(21);
  const [hasLiked, setHasLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([
    {
      id: 'rep-init-1',
      author: {
        name: 'High Overseer Alistair',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80',
      },
      content: 'We are investigating the cache invalidation on audio seek. A patch is currently deploying.',
      time: '18h ago',
    },
  ]);

  // Fallback demo thread data matching the Figma prompt
  const thread = apiThread || {
    title: 'Hello from Chittagong! Singer + beginner lyricist here',
    tag: '#Technical Issues',
    author: {
      name: 'Beat Babu',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
    },
    time: '21h ago',
    views: 120,
    repliesCount: 11,
    contentLines: [
      'BUG REPORT (confirmed)',
      'Device: MacBook Air / iPhone, Safari 18',
      'Steps: Upload audio > 20MB in Forge → progress stalls at 90%.',
      'Expected: upload completes.',
      'Actual: hangs indefinitely.',
      'Workaround: compress to MP3 under 15MB, or use Chrome/Firefox.',
      'Status: In Progress — fix scheduled for Dec 18 release.',
      'Reply here if you can reproduce on other browsers.',
    ],
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Thread link copied to clipboard.');
    }
  };

  const handleReport = () => {
    alert('Thank you for notifying the Guild Overseers.');
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handlePostReply = (e) => {
    if (e) e.preventDefault();
    if (!replyText.trim()) return;

    const newRep = {
      id: `rep-${Date.now()}`,
      author: {
        name: user?.name || 'Beat Babu',
        role: user?.role || 'Admin',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      },
      content: replyText.trim(),
      time: 'Just now',
    };
    setReplies([...replies, newRep]);
    setReplyText('');
  };

  // Breadcrumbs title
  const wingLabel = config?.label || 'The Support Wing';

  return (
        <RoleGate allowedRoles={config.access} showNotice>

    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
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
          onClick={() => navigate(`/community/${wing}`)}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          {wingLabel}
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-semibold font-Merriweather capitalize">
          Recent Thread
        </span>
      </div>

      {isLoading ? (
        <div className="w-full space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-start gap-8">
          {/* 2. Main Thread Card (Matching Figma demo top container) */}
          <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-center items-start gap-6 shadow-sm">
            {/* Top row: Tag + Title on left, Action buttons (Follow, Share, Report) on right */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-col justify-start items-start gap-3">
                {/* Category Tag pill */}
                <div className="px-2 py-0.5 outline outline-1 outline-offset-[-1px] outline-white flex items-center justify-center">
                  <span className="text-center text-white text-[10px] font-normal font-Merriweather leading-3">
                    {thread.tag || (thread.tags && thread.tags[0] ? `#${thread.tags[0]}` : '#Technical Issues')}
                  </span>
                </div>

                {/* Main Thread Title */}
                <h1 className="text-white text-xl sm:text-2xl font-normal font-Merriweather leading-snug">
                  {thread.title}
                </h1>
              </div>

              {/* Action buttons: Follow, Share, Report */}
              <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto select-none">
                {/* Follow */}
                <button
                  type="button"
                  onClick={handleFollow}
                  className={`px-3 py-1 outline outline-1 outline-offset-[-1px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isFollowing
                      ? 'outline-white bg-white/20 text-white'
                      : 'outline-white text-white hover:bg-white/10'
                  }`}
                >
                  <Bell size={14} className="text-white" />
                  <span className="text-sm font-normal font-Merriweather leading-3">
                    {isFollowing ? 'Following' : 'Follow'}
                  </span>
                </button>

                {/* Share */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3 py-1 outline outline-1 outline-offset-[-1px] outline-white text-white hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 size={14} className="text-white" />
                  <span className="text-sm font-normal font-Merriweather leading-3">
                    Share
                  </span>
                </button>

                {/* Report */}
                <button
                  type="button"
                  onClick={handleReport}
                  className="px-3 py-1 outline outline-1 outline-offset-[-1px] outline-white text-white hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Flag size={14} className="text-white" />
                  <span className="text-sm font-normal font-Merriweather leading-3">
                    Report
                  </span>
                </button>
              </div>
            </div>

            {/* Author info row: Avatar + Name + Role Pill + Stats (Time, Views, Replies) */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 object-cover outline outline-1 outline-white rounded-xs"
                src={
                  thread.author?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'
                }
                alt={thread.author?.name || 'Beat Babu'}
              />
              <div className="flex flex-col justify-start items-start gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-medium font-sans">
                    {thread.author?.name || 'Beat Babu'}
                  </span>
                  <div className="px-1.5 py-0.5 outline outline-1 outline-offset-[-1px] outline-white/70 flex items-center justify-center">
                    <span className="text-white/70 text-[10px] font-normal font-Merriweather leading-3">
                      {thread.author?.role || 'Admin'}
                    </span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-white/70 text-xs font-Merriweather">
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-white/70" />
                    <span>{thread.time || '21h ago'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={13} className="text-white/70" />
                    <span className="text-white text-sm font-normal">{thread.views || 120}</span>
                    <span>Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={13} className="text-white/70" />
                    <span className="text-white text-sm font-normal">
                      {thread.repliesCount || 11}
                    </span>
                    <span>Replies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Body Content + Like Counter */}
            <div className="w-full pt-5 border-t border-white/20 flex justify-between items-start gap-4">
              <div className="flex-1 flex flex-col justify-start items-start gap-2 text-white text-xs font-normal font-Merriweather leading-relaxed">
                {thread.contentLines ? (
                  thread.contentLines.map((line, idx) => (
                    <div key={idx} className="leading-5">
                      {line}
                    </div>
                  ))
                ) : (
                  <p className="whitespace-pre-wrap leading-5">{thread.content}</p>
                )}
              </div>

              {/* Like Pill Button */}
              <button
                type="button"
                onClick={handleLike}
                className={`px-3 py-1.5 bg-white/10 outline outline-1 outline-offset-[-1px] outline-white flex items-center gap-2 cursor-pointer transition-colors ${
                  hasLiked ? 'bg-white/20 text-rose-300' : 'text-white hover:bg-white/15'
                }`}
              >
                <Heart size={16} className={hasLiked ? 'fill-rose-400 text-rose-400' : 'text-white'} />
                <span className="text-sm font-normal font-Merriweather leading-3">
                  {likesCount}
                </span>
              </button>
            </div>
          </div>

          {/* 3. Existing Replies List */}
          {replies.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              <span className="text-white text-xl font-normal font-Merriweather">
                Replies ({replies.length})
              </span>
              {replies.map((rep) => (
                <div
                  key={rep.id}
                  className="w-full pl-6 pr-7 py-4 bg-stone-400/20 outline outline-1 outline-offset-[-1px] outline-stone-400/70 flex flex-col gap-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-7 h-7 object-cover outline outline-1 outline-white/80 rounded-xs"
                        src={rep.author.avatar}
                        alt={rep.author.name}
                      />
                      <span className="text-white text-sm font-medium font-sans">
                        {rep.author.name}
                      </span>
                      <div className="px-1.5 py-0.5 outline outline-1 outline-offset-[-1px] outline-white/60">
                        <span className="text-white/70 text-[9px] font-Merriweather">
                          {rep.author.role}
                        </span>
                      </div>
                    </div>
                    <span className="text-white/60 text-xs font-Merriweather">{rep.time}</span>
                  </div>
                  <p className="text-white/90 text-xs sm:text-sm font-Merriweather leading-relaxed pl-9">
                    {rep.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 4. POST REPLY Box (Matching Figma demo bottom container) */}
          <div className="w-full outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start shadow-sm">
            {/* Header: POST REPLY */}
            <div className="w-full pl-6 pr-7 pt-5 pb-4 bg-stone-400/30 border-b border-stone-400 flex justify-start items-start">
              <h2 className="text-white text-xl font-normal font-Merriweather">
                POST REPLY
              </h2>
            </div>

            {/* Body: Textarea + 0 chars + Ornate Post Reply Button */}
            <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 flex flex-col justify-center items-start gap-4">
              <div className="w-full h-32 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start overflow-hidden">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply… (Markdown supported)"
                  className="w-full h-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden resize-none"
                />
              </div>

              <div className="w-full flex justify-between items-center">
                <span className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                  {replyText.length} chars
                </span>

                <button
                  type="button"
                  onClick={handlePostReply}
                  disabled={!replyText.trim()}
                  className={`relative inline-flex items-center justify-center px-7 py-2.5 font-normal font-Merriweather text-base tracking-normal transition-all shadow-md group ${
                    !replyText.trim()
                      ? 'bg-stone-200 text-neutral-950/60 opacity-40 cursor-not-allowed'
                      : 'bg-white text-neutral-950 hover:bg-stone-100 cursor-pointer'
                  }`}
                >
                  <img
                    src={buttonBorderSecondary}
                    alt="button border"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                  />
                  <span className="relative z-10">Post Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </RoleGate>
  );
};

export default ThreadDetail;
