import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import FramedCard from '../../components/FramedCard';
import StatusPill from '../../components/StatusPill';
import { getContestPhase } from '../../utils/contestPhase';
import { formatDate } from '../../utils/formatters';

export const ContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const phase = getContestPhase(contest);

  return (
    <FramedCard
      onClick={() => navigate(`/community/creative-forge/contests/${contest.id}`)}
      className="flex flex-col justify-between h-72 group"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <StatusPill status={phase} />
          <span className="text-xs font-serif text-amber-900 font-bold">
            {contest.prizePool}
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
          {contest.title}
        </h3>

        <p className="font-serif text-xs text-stone-600 line-clamp-3 leading-relaxed">
          {contest.description}
        </p>
      </div>

      <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs font-serif text-stone-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Users size={12} className="text-stone-400" />
            <span>{contest.entriesCount || 0} Submissions</span>
          </span>
          <span className="text-[11px] text-stone-500">
            Voting Deadline: {formatDate(contest.votingDeadline)}
          </span>
        </div>

        <div className="flex items-center justify-end pt-1 text-amber-950 font-bold group-hover:translate-x-1 transition-transform gap-1">
          <span>Enter Contest</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </FramedCard>
  );
};

export default ContestCard;
