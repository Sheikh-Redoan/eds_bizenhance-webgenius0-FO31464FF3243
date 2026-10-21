import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, History } from 'lucide-react';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import ParchmentPanel from '../components/ParchmentPanel';

export const SongVersionView = () => {
  const { songId, version } = useParams();
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Living Archives', to: '/community/living-archives' },
    { label: 'Song Manuscript', to: `/community/living-archives/songs/${songId}` },
    { label: `Version ${version}` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate(`/community/living-archives/songs/${songId}`)}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Current Version</span>
        </button>
      </div>

      <ParchmentPanel className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
          <History size={18} className="text-amber-900" />
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Archived Snapshot: {version}
          </h1>
        </div>
        <p className="font-serif text-sm text-stone-600">
          Viewing historical revision archived in the guild records. Current canon edits do not reflect in this immutable scroll.
        </p>
      </ParchmentPanel>
    </div>
  );
};

export default SongVersionView;
