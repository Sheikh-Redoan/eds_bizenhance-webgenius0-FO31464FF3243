import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useGetContestQuery } from '../../../../redux/api/communityApi';
import Skeleton from '../../../../components/ui/Skeleton';
import { getContestPhase } from '../../utils/contestPhase';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';

export const ContestDetail = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest, isLoading } = useGetContestQuery(contestId);

  // Determine current active phase
  const phase = getContestPhase(contest);

  // Rules list (either from contest or default standard contest rules)
  const rules = contest?.rules && contest.rules.length > 0 ? contest.rules : [
    'Original work only',
    'One entry per active member',
    'Creator identity remains hidden during voting',
    'Rights agreement required before submission',
  ];

  // Schedule timeline steps & state
  // image 1: Submissions open is active (yellow-600)
  // image 2 & 6: Blind voting is active (or reached, yellow-600 on 1st, 2nd, 3rd)
  // image 6: Results reached (yellow on all 4 or active on results)
  const isBlindVotingPhase = phase === 'blind_voting';
  const isResultsPhase = phase === 'results';

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
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

      {isLoading ? (
        <div className="w-full space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : !contest ? (
        <div className="w-full text-center py-12 font-Merriweather text-white/70">
          Contest scroll not found in the forge archives.
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-end gap-8">
          {/* 2. Top Header Card: Title + Lyrics & Visual Art Tag + Status Badge */}
          <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start gap-3.5 shadow-sm">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5">
              <div className="flex-1 flex flex-col justify-start items-start gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-white text-base font-normal font-Merriweather">
                    {contest.title || 'Voices Across Water'}
                  </span>
                  <div className="px-2 py-0.5 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center">
                    <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-tight">
                      Lyrics & visual art
                    </span>
                  </div>
                </div>

                <p className="text-white/70 text-xs font-normal font-Merriweather leading-relaxed">
                  {contest.description ||
                    'Build conversational confidence by studying the stories, grammar, and rhythm inside beloved Spanish songs.'}
                </p>
              </div>

              {/* Status Badge Pill */}
              <div className="px-2.5 py-1 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center shrink-0">
                <span className="text-white text-xs sm:text-sm font-normal font-Merriweather leading-tight">
                  {isResultsPhase
                    ? 'Closed'
                    : isBlindVotingPhase
                    ? 'Blind Voting Open'
                    : 'Open'}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Middle Section: Contest Information & Rules (Left) + Contest Schedule (Right) */}
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-6">
            {/* Left Card: Contest Information & Rules */}
            <div className="flex-1 pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-between items-start gap-6 shadow-sm">
              <div className="flex flex-col justify-start items-start gap-1">
                <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
                  Contest Information
                </h2>
                <p className="text-white/70 text-xs font-normal font-Merriweather leading-relaxed">
                  Submit an original lyric, artwork, or mixed-media piece inspired by the ways language travels with us.
                </p>
              </div>

              <div className="flex flex-col justify-start items-start gap-2">
                <h3 className="text-white text-xl font-normal font-Merriweather">
                  Rules & Eligibility
                </h3>
                <div className="flex flex-col justify-start items-start gap-1.5">
                  {rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="text-white/80 text-xs font-normal font-Merriweather leading-4"
                    >
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Contest Schedule Timeline */}
            <div className="w-full lg:w-80 pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start gap-3 shadow-sm shrink-0">
              <div className="w-full flex flex-col justify-start items-start">
                {/* Title */}
                <div className="w-full pl-5 pb-5 border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start">
                  <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
                    Contest Schedule
                  </h2>
                </div>

                {/* Step 1: Submissions open */}
                <div className="w-full pl-5 pb-5 relative border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-xs font-normal font-Merriweather leading-4">
                      Submissions open
                    </span>
                    <span className="text-white/80 text-[10px] font-normal font-Merriweather leading-4">
                      18 Jun
                    </span>
                  </div>
                  {/* Indicator Dot */}
                  <div className="w-2 h-2 -left-[4.4px] top-[4px] absolute bg-yellow-600 rounded-xs border-[1.6px] border-yellow-600" />
                </div>

                {/* Step 2: Submission deadline */}
                <div className="w-full pl-5 pb-5 relative border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-xs font-normal font-Merriweather leading-4">
                      Submission deadline
                    </span>
                    <span className="text-white/80 text-[10px] font-normal font-Merriweather leading-4">
                      24 Jun
                    </span>
                  </div>
                  {/* Indicator Dot: active in blind_voting or results */}
                  <div
                    className={`w-2 h-2 -left-[4.4px] top-[4px] absolute rounded-xs ${
                      isBlindVotingPhase || isResultsPhase
                        ? 'bg-yellow-600 border-[1.6px] border-yellow-600'
                        : 'bg-orange-50 border-[1.6px] border-stone-300'
                    }`}
                  />
                </div>

                {/* Step 3: Blind voting */}
                <div className="w-full pl-5 pb-5 relative border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-xs font-normal font-Merriweather leading-4">
                      Blind voting
                    </span>
                    <span className="text-white/80 text-[10px] font-normal font-Merriweather leading-4">
                      26–30 Jun
                    </span>
                  </div>
                  {/* Indicator Dot: active in blind_voting or results */}
                  <div
                    className={`w-2 h-2 -left-[4.4px] top-[4px] absolute rounded-xs ${
                      isBlindVotingPhase || isResultsPhase
                        ? 'bg-yellow-600 border-[1.6px] border-yellow-600'
                        : 'bg-orange-50 border-[1.6px] border-stone-300'
                    }`}
                  />
                </div>

                {/* Step 4: Results reveal */}
                <div className="w-full pl-5 pb-2 relative border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-xs font-normal font-Merriweather leading-4">
                      Results reveal
                    </span>
                    <span className="text-white/80 text-[10px] font-normal font-Merriweather leading-4">
                      02 Jul
                    </span>
                  </div>
                  {/* Indicator Dot: active in results */}
                  <div
                    className={`w-2 h-2 -left-[4.4px] top-[4px] absolute rounded-xs ${
                      isResultsPhase
                        ? 'bg-yellow-600 border-[1.6px] border-yellow-600'
                        : 'bg-orange-50 border-[1.6px] border-stone-300'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bottom Action Row matching Figma demo 1, 2, and 6 */}
          <div className="w-full flex justify-end items-center gap-6 pt-2">
            {isResultsPhase ? (
              /* Demo 6: Results Button */
              <button
                type="button"
                onClick={() => navigate(`/community/creative-forge/contests/${contestId}/results`)}
                className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-normal font-Merriweather text-base tracking-wider hover:bg-stone-100 transition-all cursor-pointer group shadow-lg"
              >
                <img
                  src={buttonBorderSecondary}
                  alt="button border"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                />
                <span className="relative z-10">Results</span>
              </button>
            ) : isBlindVotingPhase ? (
              /* Demo 2: Skip for now + Enter Blind Voting */
              <div className="inline-flex justify-start items-center gap-5">
                <button
                  type="button"
                  onClick={() => navigate('/community/creative-forge')}
                  className="text-white text-base font-normal font-Merriweather leading-4 hover:underline cursor-pointer"
                >
                  Skip for now
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/community/creative-forge/contests/${contestId}/vote`)}
                  className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-normal font-Merriweather text-base tracking-wider hover:bg-stone-100 transition-all cursor-pointer group shadow-lg"
                >
                  <img
                    src={buttonBorderSecondary}
                    alt="button border"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                  />
                  <span className="relative z-10">Enter Blind Voting</span>
                </button>
              </div>
            ) : (
              /* Demo 1: Enter Blind Voting (text link) + SUBMIT CREATIVE WORK (ornate white button) */
              <div className="inline-flex justify-start items-center gap-5">
                <button
                  type="button"
                  onClick={() => navigate(`/community/creative-forge/contests/${contestId}/vote`)}
                  className="text-white text-base font-normal font-Merriweather leading-4 hover:underline cursor-pointer"
                >
                  Enter Blind Voting
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/community/creative-forge/contests/${contestId}/submit`)}
                  className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-normal font-Merriweather text-base uppercase tracking-wider hover:bg-stone-100 transition-all cursor-pointer group shadow-lg"
                >
                  <img
                    src={buttonBorderSecondary}
                    alt="button border"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                  />
                  <span className="relative z-10">SUBMIT CREATIVE WORK</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetail;
