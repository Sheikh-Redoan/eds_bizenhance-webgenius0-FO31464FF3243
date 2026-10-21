import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Eye, Trophy } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import { CONTEST_PHASE } from '../../constants';

export const ContestCTA = ({
  contest,
  phase,
  className,
}) => {
  const navigate = useNavigate();

  if (phase === CONTEST_PHASE.OPEN) {
    return (
      <div className="p-5 rounded-xl bg-[#faf6ee] border-2 border-amber-900/40 shadow-sm space-y-3">
        <h4 className="font-serif font-bold text-base text-stone-900">
          Submissions Are Open
        </h4>
        <p className="text-xs font-serif text-stone-600 leading-relaxed">
          Translate and adapt the designated poem or song verse. Submissions will be stripped of identifying marks for blind peer voting.
        </p>
        <Button
          variant="ornate"
          onClick={() => navigate(`/community/creative-forge/contests/${contest.id}/submit`)}
          className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
        >
          <Send size={15} />
          <span>Submit Creative Work</span>
        </Button>
      </div>
    );
  }

  if (phase === CONTEST_PHASE.BLIND_VOTING) {
    return (
      <div className="p-5 rounded-xl bg-[#faf6ee] border-2 border-amber-900/40 shadow-sm space-y-3">
        <h4 className="font-serif font-bold text-base text-stone-900">
          Blind Voting In Progress
        </h4>
        <p className="text-xs font-serif text-stone-600 leading-relaxed">
          Author identities are completely sealed. Cast your ballot based purely on rhythmic meter, poetic fidelity, and cadence.
        </p>
        <Button
          variant="ornate"
          onClick={() => navigate(`/community/creative-forge/contests/${contest.id}/vote`)}
          className="w-full py-2.5 text-sm flex items-center justify-center gap-2"
        >
          <Eye size={15} />
          <span>Enter Blind Voting</span>
        </Button>
        <button
          type="button"
          onClick={() => navigate('/community/creative-forge')}
          className="w-full text-center text-xs font-serif text-stone-500 hover:text-stone-800 transition-colors"
        >
          Skip for now
        </button>
      </div>
    );
  }

  if (phase === CONTEST_PHASE.RESULTS) {
    return (
      <div className="p-5 rounded-xl bg-[#faf6ee] border-2 border-purple-900/40 shadow-sm space-y-3">
        <h4 className="font-serif font-bold text-base text-purple-950 flex items-center gap-1.5">
          <Trophy size={16} className="text-purple-700" />
          <span>Tournament Concluded</span>
        </h4>
        <p className="text-xs font-serif text-stone-600 leading-relaxed">
          The ballots have been tallied and the bards unmasked. Review the winning verse and full community rankings.
        </p>
        <Button
          variant="ornate"
          onClick={() => navigate(`/community/creative-forge/contests/${contest.id}/results`)}
          className="w-full py-2.5 text-sm flex items-center justify-center gap-2 !bg-purple-950 hover:!bg-purple-900"
        >
          <Trophy size={15} />
          <span>View Final Results</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-stone-200/80 border border-stone-300 text-xs font-serif text-stone-600 text-center">
      Contest is currently in preparation.
    </div>
  );
};

export default ContestCTA;
