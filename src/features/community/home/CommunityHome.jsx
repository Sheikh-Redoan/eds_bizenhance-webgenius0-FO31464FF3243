import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Castle, BookOpen, Compass, Trophy, Library, HelpCircle, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';
import FramedCard from '../components/FramedCard';
import WingBanner from '../components/WingBanner';
import { ALL_WINGS } from '../config/wings';

export const CommunityHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-amber-900/50 bg-gradient-to-b from-[#3a2211] via-[#2c180a] to-[#1a0e05] text-[#f7eedd] p-8 sm:p-12 shadow-2xl text-center space-y-6 mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
        <Castle size={14} />
        <span>The Lingual Jams Fellowship</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-100 max-w-3xl mx-auto leading-tight">
        Enter the Grand Community Guild
      </h1>

      <p className="font-serif text-sm sm:text-lg text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
        Where language enthusiasts, polyglots, and lyric bards congregate. Explore cohort courses, collaborative lyric lore, blind translating contests, and pedagogical dissertations.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button
          variant="ornate"
          onClick={() => navigate('/community/guild-hall')}
          className="px-6 py-3 text-base flex items-center gap-2"
        >
          <span>Explore All Six Wings</span>
          <ArrowRight size={16} />
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/community/guild-gate')}
          className="px-6 py-3 text-base"
        >
          Gather at Guild Gate
        </Button>
      </div>
    </div>
  );
};

export const CommunityHome = () => {
  const navigate = useNavigate();

  const getWingIcon = (id) => {
    switch (id) {
      case 'guild-gate': return Compass;
      case 'study-chambers': return BookOpen;
      case 'creative-forge': return Trophy;
      case 'living-archives': return Library;
      case 'scholars-hall': return Castle;
      case 'support-wing': return HelpCircle;
      default: return Compass;
    }
  };

  return (
    <div className="space-y-10">
      <CommunityHero />

      <div>
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            The Chambers of the Fellowship
          </h2>
          <p className="font-serif text-xs sm:text-sm text-stone-600">
            Choose your destination among the specialized guild wings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_WINGS.map((wing) => {
            const Icon = getWingIcon(wing.id);

            return (
              <FramedCard
                key={wing.id}
                onClick={() => navigate(wing.path)}
                className="flex flex-col justify-between h-56 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {wing.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-900/10 text-amber-800 flex items-center justify-center group-hover:bg-amber-900 group-hover:text-amber-100 transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {wing.title}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {wing.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-serif font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
                  <span>Enter Chamber</span>
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </FramedCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;
