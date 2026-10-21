import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, ArrowLeft, Check } from 'lucide-react';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import Button from '../../../../components/ui/Button';
import ParchmentPanel from '../../components/ParchmentPanel';
import FramedCard from '../../components/FramedCard';

export const CommunityPolls = () => {
  const navigate = useNavigate();

  const [polls, setPolls] = useState([
    {
      id: 'poll-1',
      question: 'Which dialect should anchor our next Live Chanson Masterclass?',
      options: [
        { id: 'opt-1', label: '1960s French Nouvelle Vague Ballads', votes: 42 },
        { id: 'opt-2', label: '80s Japanese City Pop & Syntax', votes: 68 },
        { id: 'opt-3', label: 'Traditional Mexican Rancheras & Boleros', votes: 55 },
      ],
      userVoted: null,
      totalVotes: 165,
    },
  ]);

  const handleVote = (pollId, optId) => {
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId || p.userVoted) return p;
        return {
          ...p,
          userVoted: optId,
          totalVotes: p.totalVotes + 1,
          options: p.options.map((opt) =>
            opt.id === optId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );
  };

  const breadcrumbs = [
    { label: 'Creative Forge', to: '/community/creative-forge' },
    { label: 'Guild Polls' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
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

      <div className="pb-3 border-b border-amber-900/20">
        <h1 className="text-2xl font-serif font-bold text-stone-900">
          Fellowship Ballot & Voting Polls
        </h1>
        <p className="text-xs font-serif text-stone-600">
          Help direct guild repertoire, song additions, and community syllabus themes.
        </p>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <ParchmentPanel key={poll.id} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="text-xs font-serif font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Active Ballot
              </span>
              <span className="text-xs font-serif text-stone-500">
                {poll.totalVotes} votes cast
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg text-stone-900">
              {poll.question}
            </h3>

            <div className="space-y-2.5">
              {poll.options.map((opt) => {
                const pct = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                const isSelected = poll.userVoted === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => !poll.userVoted && handleVote(poll.id, opt.id)}
                    className={`relative p-3.5 rounded-lg border transition-all ${
                      poll.userVoted
                        ? 'bg-white border-stone-200'
                        : 'bg-stone-50 hover:bg-amber-50/70 border-stone-300 hover:border-amber-700/60 cursor-pointer'
                    }`}
                  >
                    {/* Visual progress bar if voted */}
                    {poll.userVoted && (
                      <div
                        className="absolute inset-y-0 left-0 bg-amber-200/50 rounded-lg pointer-events-none"
                        style={{ width: `${pct}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between text-xs font-serif">
                      <span className={`font-semibold ${isSelected ? 'text-amber-950 font-bold' : 'text-stone-800'}`}>
                        {opt.label}
                      </span>
                      {poll.userVoted && (
                        <span className="font-bold text-stone-700">{pct}% ({opt.votes})</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ParchmentPanel>
        ))}
      </div>
    </div>
  );
};

export default CommunityPolls;
