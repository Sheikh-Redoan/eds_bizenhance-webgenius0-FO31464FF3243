import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import { getContestPhase } from '../../utils/contestPhase';
import { formatDate } from '../../utils/formatters';

export const ContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const phase = getContestPhase(contest);

  // Status badge label and display
  const phaseLabels = {
    open: 'Open',
    blind_voting: 'Voting Open',
    results: 'Closed',
  };
  const statusLabel = phaseLabels[phase] || 'Open';

  const submissionDeadlineText = contest.submissionDeadline
    ? formatDate(contest.submissionDeadline)
    : '24 June 2026';

  const votingPeriodText =
    contest.startDate && contest.votingDeadline
      ? `${formatDate(contest.startDate)} – ${formatDate(contest.votingDeadline)}`
      : '13 Aug 2026 – 23 Aug 2026';

  return (
    <div className="w-full bg-[#B49267]/30 border border-[#B49267]/50 p-5 sm:p-6 flex flex-col justify-start items-start gap-4 transition-all hover:bg-[#B49267]/35 shadow-sm">
      {/* Top Section: Title + Tag + Status Pill + Description */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-start justify-between gap-4">
          {/* Title & Tag Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <h3
              onClick={() => navigate(`/community/creative-forge/contests/${contest.id}`)}
              className="text-white text-base sm:text-lg font-normal font-Merriweather hover:underline cursor-pointer leading-snug"
            >
              {contest.title}
            </h3>

            <div className="px-2 py-0.5 border border-white flex items-center justify-center shrink-0">
              <span className="text-white text-xs sm:text-sm font-normal font-Merriweather">
                Lyrics & visual art
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-2.5 py-1 border border-white flex items-center justify-center shrink-0">
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather capitalize">
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Description Excerpt */}
        <p className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather leading-relaxed max-w-4xl">
          {contest.description}
        </p>
      </div>

      {/* Bottom Section: Submission Deadline + Voting Period + View Contest Button */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
        {/* Deadlines Meta */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-12 text-left">
          {/* Submission Deadline */}
          <div className="flex flex-col items-start gap-0.5">
            <div className="pb-0.5 border-b border-white/50">
              <span className="text-white/70 text-[10px] sm:text-xs font-normal font-Merriweather">
                Submission deadline
              </span>
            </div>
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather">
              {submissionDeadlineText}
            </span>
          </div>

          {/* Voting Period */}
          <div className="flex flex-col items-start gap-0.5">
            <div className="pb-0.5 border-b border-white/50">
              <span className="text-white/70 text-[10px] sm:text-xs font-normal font-Merriweather">
                Voting period
              </span>
            </div>
            <span className="text-white text-xs sm:text-sm font-normal font-Merriweather">
              {votingPeriodText}
            </span>
          </div>
        </div>

        {/* Ornate View Contest Button */}
        <button
          type="button"
          onClick={() => navigate(`/community/creative-forge/contests/${contest.id}`)}
          className="relative group w-32 sm:w-36 h-8 sm:h-9 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white shrink-0 rounded-xs"
        >
          <img
            src={buttonBorderSecondary}
            alt=""
            className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
          />
          <span className="relative z-10 inline-flex items-center gap-1.5 text-neutral-950 text-xs sm:text-sm font-normal font-Merriweather leading-none">
            <span>View Contest</span>
            <ChevronRight size={14} className="text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ContestCard;

