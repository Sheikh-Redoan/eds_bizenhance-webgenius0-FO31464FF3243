import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Award, Medal, Sparkles } from 'lucide-react';
import { useGetContestQuery } from '../../../../redux/api/communityApi';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import Button from '../../../../components/ui/Button';
import ParchmentPanel from '../../components/ParchmentPanel';
import FramedCard from '../../components/FramedCard';

export const ContestResults = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest } = useGetContestQuery(contestId);

  const winners = [
    {
      place: 1,
      title: 'Midnight Silhouette Adaptation',
      author: 'Aurelius of Granada',
      score: '96.4% Consensus',
      award: 'Master Bard Laurel',
      excerpt: 'Hold me in the velvet night as if the moon might never rise again...',
    },
    {
      place: 2,
      title: 'The Castilian Whisper',
      author: 'Dame Genevieve',
      score: '89.2% Consensus',
      award: 'Silver Quill Medal',
      excerpt: 'Kiss me before the dawn intrudes upon our solemn song...',
    },
    {
      place: 3,
      title: 'Cadence of the Wandering Soul',
      author: 'Julian Mercer',
      score: '84.8% Consensus',
      award: 'Bronze Rune Plaque',
      excerpt: 'A heartbeat echoed across forgotten cobblestones of Madrid...',
    },
  ];

  const breadcrumbs = [
    { label: 'Creative Forge', to: '/community/creative-forge' },
    { label: contest?.title || 'Contest', to: `/community/creative-forge/contests/${contestId}` },
    { label: 'Results' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate(`/community/creative-forge/contests/${contestId}`)}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Contest Overview</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-amber-950 text-white shadow-xl space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
          <Trophy size={14} />
          <span>Official Proclamation of Winners</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
          {contest?.title}
        </h1>
        <p className="text-xs sm:text-sm font-serif text-purple-200">
          Peer ballots verified by the High Council. The authors are hereby unmasked.
        </p>
      </div>

      <div className="space-y-4">
        {winners.map((w) => (
          <FramedCard
            key={w.place}
            className={`space-y-3 ${
              w.place === 1
                ? 'border-2 border-amber-600 bg-amber-50/70 shadow-md ring-2 ring-amber-400/30'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    w.place === 1
                      ? 'bg-amber-500 text-stone-900'
                      : w.place === 2
                      ? 'bg-stone-300 text-stone-800'
                      : 'bg-amber-800 text-amber-100'
                  }`}
                >
                  #{w.place}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {w.title}
                  </h3>
                  <span className="text-xs font-serif text-stone-600">
                    Composed by <strong>{w.author}</strong>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-serif font-bold text-amber-900 block">
                  {w.award}
                </span>
                <span className="text-[11px] text-stone-500">{w.score}</span>
              </div>
            </div>

            <p className="font-serif text-xs sm:text-sm italic text-stone-700 bg-white/70 p-3 rounded border border-stone-200 leading-relaxed">
              "{w.excerpt}"
            </p>
          </FramedCard>
        ))}
      </div>
    </div>
  );
};

export default ContestResults;
