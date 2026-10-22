import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Eye, MessageSquare, Clock } from 'lucide-react';
import supportWingBannerImg from '../../../assets/images/support_wing.jpg';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import { useGetThreadsQuery } from '../../../redux/api/communityApi';

export const SupportWing = () => {
  const navigate = useNavigate();

  // 4 Chamber categories matching Figma demo
  const chambers = [
    {
      id: 'account',
      title: 'Account & Membership',
      description: 'Login, profiles, roles, and membership questions.',
      count: 342,
    },
    {
      id: 'bugs',
      title: 'Technical Issues | Bugs',
      description: 'Something broken? Report it with details.',
      count: 342,
    },
    {
      id: 'features',
      title: 'Feature Requests',
      description: 'Ideas to make the guild better — vote and discuss.',
      count: 342,
    },
    {
      id: 'safety',
      title: 'Safety / Moderation Help',
      description: 'Report concerns, ask about rules enforcement.',
      count: 342,
    },
  ];

  // Fetch support threads from communityApi
  const { data: apiThreads = [] } = useGetThreadsQuery({ wing: 'support-wing' });

  // Fallback demo threads matching Figma design
  const threads = apiThreads.length > 0 ? apiThreads : [
    {
      id: 'sup-demo-1',
      title: '[Bug] Audio uploads stall at 90% on Safari — workaround inside',
      description:
        'Safari 18 + files over 20MB hang at 90%. Workaround: use MP3 under 15MB or switch browser. Fix ETA Dec 18.',
      author: {
        name: 'Beat Babu',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80',
      },
      tag: 'Technical Issues',
      views: 120,
      replies: 11,
      time: '21h ago',
    },
    {
      id: 'sup-demo-2',
      title: '[Bug] Audio uploads stall at 90% on Safari — workaround inside',
      description:
        'Safari 18 + files over 20MB hang at 90%. Workaround: use MP3 under 15MB or switch browser. Fix ETA Dec 18.',
      author: {
        name: 'Beat Babu',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80',
      },
      tag: 'Technical Issues',
      views: 120,
      replies: 11,
      time: '21h ago',
    },
    {
      id: 'sup-demo-3',
      title: '[Bug] Audio uploads stall at 90% on Safari — workaround inside',
      description:
        'Safari 18 + files over 20MB hang at 90%. Workaround: use MP3 under 15MB or switch browser. Fix ETA Dec 18.',
      author: {
        name: 'Beat Babu',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80',
      },
      tag: 'Technical Issues',
      views: 120,
      replies: 11,
      time: '21h ago',
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
      {/* 1. Breadcrumbs Header */}
      <div className="w-full inline-flex justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          The Support Wing
        </span>
      </div>

      {/* 2. Panoramic Banner Card */}
      <div className="w-full h-56 relative rounded-sm overflow-hidden outline outline-[3px] outline-offset-[-3px] outline-stone-400 shadow-2xl">
        <img
          src={supportWingBannerImg}
          alt="The Support Wing Banner"
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute inset-0 bg-linear-270 from-black via-black/40 to-black/10 border-2 border-white pointer-events-none" />

        {/* Content overlaid on banner */}
        <div className="w-full px-6 sm:px-8 pb-6 absolute left-0 bottom-0 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex flex-col justify-start items-start gap-1">
            <h1 className="text-white text-3xl sm:text-5xl font-normal font-OldLondon leading-tight drop-shadow-md">
              The Support Wing
            </h1>
            <p className="text-white text-sm sm:text-xl font-normal font-Merriweather drop-shadow-sm">
              Get help, report bugs, account &amp; membership support
            </p>
          </div>

          {/* Report a Bug Ornate Button */}
          <button
            type="button"
            onClick={() => navigate('/community/support-wing/threads/new')}
            className="relative inline-flex items-center justify-center px-6 py-2.5 bg-white text-neutral-950 font-normal font-Merriweather text-sm tracking-wide hover:bg-stone-100 transition-all cursor-pointer group shadow-lg shrink-0"
          >
            <img
              src={buttonBorderSecondary}
              alt="button border"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <span className="relative z-10">Report a Bug</span>
          </button>
        </div>
      </div>

      {/* 3. Chambers Section */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <span className="text-white text-xl font-normal font-OldLondon leading-6 tracking-wide">
            CHAMBERS
          </span>
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
              Explore the area
            </h2>
            <p className="text-white text-sm sm:text-base font-normal font-Merriweather leading-6">
              Open a category to read or begin a new thread.
            </p>
          </div>
        </div>

        {/* 4 Chamber Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chambers.map((ch) => (
            <div
              key={ch.id}
              onClick={() => navigate('/community/support-wing/threads/new')}
              className="p-6 bg-white/20 outline outline-1 outline-offset-[-1px] outline-neutral-50 flex flex-col justify-between items-start gap-4 transition-all hover:bg-white/25 cursor-pointer shadow-sm min-h-[140px]"
            >
              <div className="w-full flex justify-between items-start gap-2">
                <div className="flex flex-col justify-start items-start gap-1 flex-1">
                  <h3 className="text-white text-base sm:text-lg font-bold font-Merriweather leading-snug">
                    {ch.title}
                  </h3>
                  <p className="text-white text-xs font-normal font-Merriweather leading-relaxed">
                    {ch.description}
                  </p>
                </div>
                <span className="text-right text-white text-xs font-normal font-mono leading-4 shrink-0">
                  {ch.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Threads Section */}
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <h2 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
          RECENT <span className="uppercase">Threads</span>
        </h2>

        {/* Threads List matching Figma demo */}
        <div className="w-full flex flex-col justify-start items-start gap-5">
          {threads.map((thread, idx) => (
            <div
              key={thread.id || idx}
              onClick={() => navigate(`/community/support-wing/threads/${thread.id || 'demo'}`)}
              className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex justify-between items-center gap-4 transition-all hover:bg-stone-400/35 cursor-pointer shadow-sm group"
            >
              <div className="flex-1 flex flex-col justify-start items-start gap-4">
                {/* Title + Excerpt */}
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <h3 className="text-white text-base font-normal font-Merriweather group-hover:underline">
                    {thread.title}
                  </h3>
                  <p className="text-white/70 text-xs font-normal font-Merriweather leading-relaxed">
                    {thread.description || thread.content}
                  </p>
                </div>

                {/* Author Info + Tags */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Author avatar and name */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-5 h-5 object-cover outline outline-1 outline-white rounded-xs"
                      src={
                        thread.author?.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80'
                      }
                      alt={thread.author?.name || 'Author'}
                    />
                    <span className="text-white text-sm font-medium font-sans">
                      {thread.author?.name || 'Beat Babu'}
                    </span>
                  </div>

                  {/* Pills: Role + Category Tag */}
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 outline outline-1 outline-offset-[-1px] outline-white/70 flex items-center justify-center">
                      <span className="text-white/70 text-[10px] font-normal font-Merriweather leading-tight">
                        {thread.author?.role || 'Admin'}
                      </span>
                    </div>

                    <div className="px-2 py-0.5 outline outline-1 outline-offset-[-1px] outline-white/70 flex items-center justify-center">
                      <span className="text-white/70 text-[10px] font-normal font-Merriweather leading-tight">
                        {thread.tag || thread.tags?.[0] || 'Technical Issues'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Row: Views | Replies | Time */}
                <div className="flex items-center gap-4 text-white/70 text-xs font-Merriweather">
                  {/* Views */}
                  <div className="flex items-center gap-1.5">
                    <Eye size={14} className="text-white/70" />
                    <span className="text-white text-sm font-normal">
                      {thread.views || 120}
                    </span>
                    <span>Views</span>
                  </div>

                  {/* Replies */}
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-white/70" />
                    <span className="text-white text-sm font-normal">
                      {Array.isArray(thread.replies)
                        ? thread.replies.length
                        : typeof thread.repliesCount === 'number'
                          ? thread.repliesCount
                          : typeof thread.replies === 'number'
                            ? thread.replies
                            : 0}
                    </span>
                    <span>Replies</span>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-white/70" />
                    <span>
                      {typeof thread.time === 'string'
                        ? thread.time
                        : thread.createdAt
                          ? 'Recently'
                          : '21h ago'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Chevron Indicator */}
              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-white group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportWing;
