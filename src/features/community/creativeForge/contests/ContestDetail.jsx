import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, Users, ShieldAlert } from 'lucide-react';
import { useGetContestQuery } from '../../../../redux/api/communityApi';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import ParchmentPanel from '../../components/ParchmentPanel';
import StatusPill from '../../components/StatusPill';
import ContestCTA from './ContestCTA';
import Skeleton from '../../../../components/ui/Skeleton';
import { getContestPhase } from '../../utils/contestPhase';
import { formatDate } from '../../utils/formatters';

export const ContestDetail = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest, isLoading } = useGetContestQuery(contestId);

  const phase = getContestPhase(contest);

  const breadcrumbs = [
    { label: 'Creative Forge', to: '/community/creative-forge' },
    { label: contest?.title || 'Contest' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate('/community/creative-forge')}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Return to Forge</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : !contest ? (
        <div className="text-center py-12 font-serif text-stone-700">
          Contest scroll not found in the forge archives.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ParchmentPanel className="space-y-6">
              <div className="space-y-3 pb-4 border-b border-amber-900/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StatusPill status={phase} />
                  <span className="text-xs font-serif font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                    Prize: {contest.prizePool}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  {contest.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs font-serif text-stone-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Users size={13} className="text-stone-400" />
                    <span>{contest.entriesCount || 0} Submissions</span>
                  </span>
                  <span>•</span>
                  <span>
                    Submissions Close: <strong>{formatDate(contest.submissionDeadline)}</strong>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  Contest Brief
                </h3>
                <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {contest.description}
                </p>
              </div>

              {contest.rules && (
                <div className="space-y-3 pt-3 border-t border-amber-900/10">
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Tournament Rules & Integrity
                  </h4>
                  <ul className="space-y-2">
                    {contest.rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-serif text-stone-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-800 mt-2 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ParchmentPanel>
          </div>

          <div className="space-y-6">
            <ContestCTA contest={contest} phase={phase} />

            <ParchmentPanel padded={false} className="p-4 space-y-3">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-900">
                Tournament Timeline
              </h4>
              <div className="space-y-2 text-xs font-serif text-stone-600">
                <div className="flex justify-between">
                  <span>Submissions Close:</span>
                  <span className="font-bold text-stone-900">{formatDate(contest.submissionDeadline)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blind Voting Closes:</span>
                  <span className="font-bold text-stone-900">{formatDate(contest.votingDeadline)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Winner Reveal:</span>
                  <span className="font-bold text-stone-900">{formatDate(contest.resultsDate)}</span>
                </div>
              </div>
            </ParchmentPanel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetail;
