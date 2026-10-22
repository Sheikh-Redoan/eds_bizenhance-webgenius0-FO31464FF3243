import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';

export const CommunityPolls = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('A');
  const [hasVoted, setHasVoted] = useState(false);

  // Poll options matching 4th demo image:
  // A: Living Archives
  // B: Study Chambers
  // C: Creative Forge
  // D: Guild Gate
  const options = [
    { id: 'A', label: 'Living Archives' },
    { id: 'B', label: 'Study Chambers' },
    { id: 'C', label: 'Creative Forge' },
    { id: 'D', label: 'Guild Gate' },
  ];

  const handleVoteSubmit = async () => {
    if (!selectedOption) return;
    try {
      if (submitPollVote) {
        await submitPollVote({
          pollId: 'feature-poll-1',
          optionId: selectedOption,
        }).unwrap();
      }
    } catch {
      // Local fallback
    }
    setHasVoted(true);
  };

  return (
    <div className="w-full max-w-[989px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
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
          onClick={() => navigate('/community/creative-forge')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Creative Forge
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          Community Polls
        </span>
      </div>

      {/* 2. Page Title Header */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <h1 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
          Community Polls
        </h1>
        <p className="text-white/80 text-base font-normal font-Merriweather leading-6">
          Help the Guild choose what comes next.
        </p>
      </div>

      {/* 3. Main Poll Card */}
      <div className="w-full pl-6 pr-7 py-6 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-center items-start gap-6 shadow-sm">
        {/* Top Status Row: Voting open | Closes 24 June */}
        <div className="w-full flex justify-between items-center text-white font-Merriweather">
          <span className="text-base font-normal">Voting open</span>
          <span className="text-white/70 text-sm font-normal">Closes 24 June</span>
        </div>

        {/* Question Header & Subtitle */}
        <div className="flex flex-col justify-start items-start gap-1">
          <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
            Which feature should we work on next?
          </h2>
          <p className="text-white/70 text-xs font-normal font-Merriweather leading-relaxed">
            Choose one option. Your vote is private and can only be submitted once.
          </p>
        </div>

        {/* Options List */}
        <div className="w-full flex flex-col justify-start items-start gap-4">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => !hasVoted && setSelectedOption(opt.id)}
                className={`w-full pl-6 pr-7 py-5 bg-white/20 outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-between items-center gap-3 transition-all cursor-pointer ${
                  isSelected ? 'bg-white/30 ring-1 ring-white' : 'hover:bg-white/25'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Option Letter Circle */}
                  <div className="w-8 h-8 rounded-2xl outline outline-[0.80px] outline-offset-[-0.80px] outline-white/60 flex items-center justify-center shrink-0">
                    <span className="text-white text-base font-normal font-Merriweather">
                      {opt.id}
                    </span>
                  </div>

                  {/* Option Label */}
                  <span className="text-white text-base font-normal font-Merriweather">
                    {opt.label}
                  </span>
                </div>

                {/* Radio Circle Indicator */}
                <div
                  className={`w-4 h-4 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-[4.80px] border-white'
                      : 'border-[0.80px] border-stone-300'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Submit Vote Ornate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleVoteSubmit}
            disabled={hasVoted}
            className={`relative inline-flex items-center justify-center px-8 py-3 font-bold font-Merriweather text-base tracking-normal transition-all shadow-md group ${
              hasVoted
                ? 'bg-stone-300 text-stone-700 cursor-default opacity-80'
                : 'bg-white text-neutral-950 hover:bg-stone-100 cursor-pointer'
            }`}
          >
            <img
              src={buttonBorderSecondary}
              alt="button border"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <span className="relative z-10 flex items-center gap-1.5">
              {hasVoted && <Check size={16} strokeWidth={3} />}
              <span>{hasVoted ? 'Vote Submitted' : 'Submit vote'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPolls;
