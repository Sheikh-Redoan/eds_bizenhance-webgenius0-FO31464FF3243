import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, EyeOff, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import Button from '../../../../components/ui/Button';
import ParchmentPanel from '../../components/ParchmentPanel';
import FramedCard from '../../components/FramedCard';

export const BlindVoting = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const mockPair = [
    {
      id: 'entry-a',
      title: 'Anonymous Bard A',
      excerpt: `When holding you close in the hush of the dawn,\nI feel that the shadows of morning are gone.\nHold me once more, let the melody weep,\nBefore the world wakes from its innocent sleep.`,
      notes: 'Preserves the iambic tetrameter of the Spanish original with feminine line endings.',
    },
    {
      id: 'entry-b',
      title: 'Anonymous Bard B',
      excerpt: `Kiss me so deeply, as if this lone night\nWere the last breath of music, the dying of light.\nKiss me again with a sorrow so sweet,\nWhere memory and longing eternally meet.`,
      notes: 'Rhyme scheme AABB adapted to mirror Edith Piaf ballad phrasing.',
    },
  ];

  const handleCastVote = () => {
    if (!selectedEntry) return;
    setHasVoted(true);
  };

  const breadcrumbs = [
    { label: 'Creative Forge', to: '/community/creative-forge' },
    { label: 'Blind Voting' },
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
          <span>Exit Voting</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-amber-900/10 border border-amber-900/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center shrink-0">
          <EyeOff size={20} />
        </div>
        <div>
          <h3 className="font-serif font-bold text-sm text-stone-900">
            Blind Peer Evaluation Protocol
          </h3>
          <p className="font-serif text-xs text-stone-600">
            Author names, titles, and ranks are completely withheld to ensure unbiased artistic critique.
          </p>
        </div>
      </div>

      {hasVoted ? (
        <ParchmentPanel className="text-center py-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Check size={28} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Ballot Sealed & Recorded
          </h2>
          <p className="font-serif text-sm text-stone-600 max-w-md mx-auto">
            Your evaluation has been locked into the guild tally. Results will be proclaimed once blind voting concludes.
          </p>
          <Button
            variant="ornate"
            onClick={() => navigate(`/community/creative-forge/contests/${contestId}`)}
            className="px-6 py-2.5 text-sm"
          >
            Return to Tournament Overview
          </Button>
        </ParchmentPanel>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPair.map((entry) => {
              const isSelected = selectedEntry === entry.id;

              return (
                <FramedCard
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry.id)}
                  className={`space-y-4 transition-all cursor-pointer ${
                    isSelected ? '!border-amber-800 !bg-amber-100/50 shadow-md ring-2 ring-amber-600/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-serif font-bold text-sm text-stone-800">
                      {entry.title}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-800 bg-amber-800 text-amber-50' : 'border-stone-400'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="font-serif text-sm italic text-stone-800 whitespace-pre-wrap leading-relaxed bg-[#f9f5ec] p-4 rounded-lg border border-amber-900/10">
                    {entry.excerpt}
                  </div>

                  <p className="font-serif text-xs text-stone-600">
                    <strong>Rhythm note:</strong> {entry.notes}
                  </p>
                </FramedCard>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="ornate"
              disabled={!selectedEntry}
              onClick={handleCastVote}
              className="px-8 py-3 text-base flex items-center gap-2"
            >
              <Check size={16} />
              <span>Cast Ballot For Selected Composition</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlindVoting;
