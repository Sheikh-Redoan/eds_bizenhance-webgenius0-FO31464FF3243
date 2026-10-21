import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useGetPostsQuery } from '../../../redux/api/communityApi';
import PostCard from './components/PostCard';
import Skeleton from '../../../components/ui/Skeleton';
import EmptyState from '../../../components/ui/EmptyState';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import guildGateBannerImg from '../../../assets/images/guild_gate.jpg';

export const GuildGate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('LATEST');

  const { data: posts = [], isLoading } = useGetPostsQuery({
    category: activeTab === 'LATEST' ? 'All' : activeTab,
  });

  const tabs = [
    { id: 'LATEST', label: 'LATEST' },
    { id: 'General Discussion', label: 'General Discussion' },
    { id: 'Introductions', label: 'Introductions' },
    { id: 'Language & Translation', label: 'Language & Translation' },
  ];

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'LATEST') return true;
    if (activeTab === 'General Discussion') {
      return (
        p.category === 'General Discussion' ||
        p.category === 'Analysis' ||
        p.category === 'Announcements'
      );
    }
    if (activeTab === 'Introductions') {
      return (
        p.category === 'Introductions' ||
        (p.tags || []).some((t) => t.toLowerCase().includes('intro'))
      );
    }
    if (activeTab === 'Language & Translation') {
      return (
        p.category === 'Questions' ||
        p.category === 'Analysis' ||
        (p.tags || []).some((t) =>
          ['korean', 'french', 'spanish', 'grammar', 'translation', 'language'].some((k) =>
            t.toLowerCase().includes(k)
          )
        )
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-start items-start gap-8 my-2">
      {/* 1. Breadcrumb navigation */}
      <div className="w-full inline-flex justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white/70 shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          The Guild Gate
        </span>
      </div>

      {/* 2. Panoramic Banner Card */}
      <div className="w-full h-48 sm:h-56 relative rounded-sm overflow-hidden outline outline-[3px] outline-offset-[-3px] outline-stone-400/80 shadow-2xl">
        {/* Background Image with Dark Gradient Overlay */}
        <img
          src={guildGateBannerImg}
          alt="The Guild Gate"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30 border-2 border-white/20" />

        {/* Banner Text Content */}
        <div className="relative z-10 w-full h-full px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-end items-start gap-1 text-left">
          <h1 className="text-white text-3xl sm:text-5xl font-normal font-OldLondon leading-[1.1] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Guild Gate
          </h1>
          <p className="text-white/90 text-sm sm:text-lg md:text-xl font-normal font-Merriweather leading-snug drop-shadow-sm">
            General community, introductions, and lasting conversations.
          </p>
        </div>
      </div>

      {/* 3. Community Posts Header Section */}
      <div className="w-full flex flex-col gap-5">
        {/* White Bar with Title + Create NEW POST Button */}
        <div className="w-full px-5 sm:px-6 py-3.5 bg-white rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex flex-col justify-start items-start text-left">
            <h2 className="text-neutral-950 text-2xl sm:text-3xl font-normal font-MetalMania leading-tight">
              Community Posts
            </h2>
            <p className="text-neutral-950/80 text-xs sm:text-sm md:text-base font-normal font-Merriweather leading-snug">
              Thoughtful conversations, preserved for the whole Guild.
            </p>
          </div>

          {/* Ornate Button: CREATE NEW POST */}
          <button
            type="button"
            onClick={() => navigate('/community/guild-gate/new')}
            className="relative group w-44 sm:w-48 h-10 sm:h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 shrink-0 bg-[#755F48]"
          >
            <img
              src={buttonBorderSecondary}
              alt=""
              className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110"
            />
            <span className="relative z-10 inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-normal font-Merriweather tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span className="uppercase font-semibold">Create</span>
              <span>NEW POST</span>
            </span>
          </button>
        </div>

        {/* 4. Tab Strip */}
        <div className="w-full border-b border-stone-400/40 flex items-end overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 font-Merriweather text-sm sm:text-base cursor-pointer whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                  isActive
                    ? 'text-white border-stone-300 font-semibold'
                    : 'text-white/70 hover:text-white border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 5. Posts Feed */}
        {isLoading ? (
          <div className="w-full space-y-4 pt-2">
            <Skeleton variant="card" className="h-36" />
            <Skeleton variant="card" className="h-36" />
            <Skeleton variant="card" className="h-36" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="w-full py-8">
            <EmptyState
              title="No conversations yet"
              description="No dispatches found in this category. Be the first to initiate dialogue."
              actionLabel="Create NEW POST"
              onAction={() => navigate('/community/guild-gate/new')}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 sm:gap-5 pt-1">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuildGate;
