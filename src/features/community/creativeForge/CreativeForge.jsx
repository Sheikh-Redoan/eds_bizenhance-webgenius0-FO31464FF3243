import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ContestCard from './contests/ContestCard';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetContestsQuery } from '../../../redux/api/communityApi';
import { getContestPhase } from '../utils/contestPhase';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import creativeForgeBannerImg from '../../../assets/images/creative_forge.jpg';

export const CreativeForge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL');

  const { data: contests = [], isLoading } = useGetContestsQuery();

  // Tab counts
  const openCount = contests.filter((c) => getContestPhase(c) === 'open').length;
  const upcomingCount = contests.filter((c) => getContestPhase(c) === 'blind_voting').length;
  const closedCount = contests.filter((c) => getContestPhase(c) === 'results').length;

  const tabs = [
    { id: 'ALL', label: `ALL (${contests.length || 4})` },
    { id: 'OPEN', label: `OPEN (${openCount || 2})` },
    { id: 'UPCOMING', label: `UPCOMING (${upcomingCount || 1})` },
    { id: 'CLOSED', label: `CLOSED (${closedCount || 1})` },
  ];

  const filtered = contests.filter((c) => {
    if (activeTab === 'ALL') return true;
    const phase = getContestPhase(c);
    if (activeTab === 'OPEN') return phase === 'open';
    if (activeTab === 'UPCOMING') return phase === 'blind_voting';
    if (activeTab === 'CLOSED') return phase === 'results';
    return true;
  });

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
          The Creative Forge
        </span>
      </div>

      {/* 2. Panoramic Banner Card */}
      <div className="w-full h-52 sm:h-56 relative rounded-sm overflow-hidden outline outline-[3px] outline-offset-[-3px] outline-stone-400 shadow-2xl">
        <img
          src={creativeForgeBannerImg}
          alt="The Creative Forge"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 via-60% to-black/20 border-2 border-white" />

        {/* Banner Content */}
        <div className="relative z-10 w-full h-full px-6 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left">
          {/* Banner Title & Subtitle */}
          <div className="flex flex-col justify-start items-start gap-1">
            <h1 className="text-white text-3xl sm:text-5xl font-normal font-OldLondon leading-[1.1] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              The Creative Forge
            </h1>
            <p className="text-white/90 text-sm sm:text-lg md:text-xl font-normal font-Merriweather leading-snug drop-shadow-sm">
              Share creations, get feedback, collaborate
            </p>
          </div>

          {/* Banner Action Buttons: BROWSE CONTESTS & COMMUNITY POLLS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 shrink-0">
            {/* BROWSE CONTESTS */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('contests-feed');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group w-44 sm:w-48 h-10 sm:h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-[#755F48]"
            >
              <img
                src={buttonBorderSecondary}
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110"
              />
              <span className="relative z-10 text-white text-xs sm:text-sm font-normal font-Merriweather uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                BROWSE CONTESTS
              </span>
            </button>

            {/* COMMUNITY POLLS */}
            <button
              type="button"
              onClick={() => navigate('/community/creative-forge/polls')}
              className="relative group w-44 sm:w-48 h-10 sm:h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-[#755F48]"
            >
              <img
                src={buttonBorderSecondary}
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110"
              />
              <span className="relative z-10 text-white text-xs sm:text-sm font-normal font-Merriweather uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                COMMUNITY POLLS
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Contests Section */}
      <div id="contests-feed" className="w-full flex flex-col justify-start items-start gap-5">
        {/* White Bar with Title: Choose Your Path */}
        <div className="w-full px-5 sm:px-6 py-3.5 bg-white rounded-xs flex flex-col justify-start items-start text-left shadow-sm">
          <h2 className="text-neutral-950 text-2xl sm:text-3xl font-normal font-MetalMania leading-tight">
            Choose Your Path
          </h2>
          <p className="text-neutral-950/80 text-xs sm:text-sm md:text-base font-normal font-Merriweather leading-snug">
            Discover what is happening across the Guild today.
          </p>
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

        {/* 5. Contests List */}
        {isLoading ? (
          <div className="w-full space-y-4 pt-2">
            <Skeleton variant="card" className="h-44" />
            <Skeleton variant="card" className="h-44" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="w-full py-8">
            <EmptyState
              title="No tournaments in this category"
              description="Check back soon for new translation brawls and creative lyric prompts."
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 sm:gap-5 pt-1">
            {filtered.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeForge;

