import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Music, Play } from 'lucide-react';
import { useGetContestQuery } from '../../../../redux/api/communityApi';

export const ContestResults = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest } = useGetContestQuery(contestId);
  const [isPlaying, setIsPlaying] = useState(false);

  const winningLyrics = [
    'Cuando el alba toca el río,',
    'y despierta el viejo sol,',
    'llevo historias en el viento,',
    'llevo el mundo en mi canción.',
    '',
    'Que la voz cruce los montes,',
    'que la lengua guarde el mar,',
    'cada verso es una puerta,',
    'cada nombre, un nuevo hogar.',
  ];

  return (
    <div className="w-full max-w-[1064px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
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
          onClick={() => navigate('/community/creative-forge')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Creative Forge
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather capitalize">
          {contest?.title || 'Voices Across Water'}
        </span>
      </div>

      {/* 2. Main Results Card */}
      <div className="w-full flex flex-col justify-start items-end gap-8">
        <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col lg:flex-row justify-start items-center gap-6 shadow-sm">
          {/* Left: Winning Artwork & Audio Excerpt */}
          <div className="w-full sm:w-96 h-56 relative bg-gray-800 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-hidden shrink-0 group">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=780&q=80"
              alt="Winning work preview"
            />
            {/* Center Music Note / Play Badge */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl outline outline-[0.80px] outline-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center text-stone-50 hover:bg-black/60 transition-all cursor-pointer shadow-lg"
              title={isPlaying ? 'Pause audio' : 'Play winning song excerpt'}
            >
              {isPlaying ? <Play size={18} className="fill-current" /> : <Music size={18} />}
            </button>
          </div>

          {/* Right: Current Official Lyrics & Winning Statistics Box */}
          <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Lyrics with left border accent */}
            <div className="pl-3 border-l border-stone-400 flex flex-col justify-start items-start gap-2">
              <h3 className="text-white text-xl font-normal font-Merriweather">
                Current Official Lyrics
              </h3>
              <div className="text-white/80 text-xs font-normal font-Merriweather leading-relaxed">
                {winningLyrics.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Statistics Card: Valid votes + Winning share */}
            <div className="p-4 bg-white/20 outline outline-1 outline-offset-[-1px] outline-white/40 flex justify-start items-center gap-8 shrink-0">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="pb-1 border-b-[0.50px] border-white/50 flex items-center">
                  <span className="text-white/70 text-[10px] font-normal font-Merriweather leading-3">
                    Valid votes
                  </span>
                </div>
                <div className="text-white text-sm font-normal font-Merriweather leading-3">
                  287
                </div>
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="pb-1 border-b-[0.50px] border-white/50 flex items-center">
                  <span className="text-white/70 text-[10px] font-normal font-Merriweather leading-3">
                    Winning share
                  </span>
                </div>
                <div className="text-white text-sm font-normal font-Merriweather leading-3">
                  38%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestResults;
