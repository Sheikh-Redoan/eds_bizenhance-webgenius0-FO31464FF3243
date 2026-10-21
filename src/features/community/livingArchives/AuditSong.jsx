import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useGetArchivedSongQuery } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Button from '../../../components/ui/Button';
import MarkdownEditor from '../components/MarkdownEditor';
import ParchmentPanel from '../components/ParchmentPanel';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const AuditSong = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const { data: song } = useGetArchivedSongQuery(songId);
  const [auditNotes, setAuditNotes] = useState('');
  const [proposedLyrics, setProposedLyrics] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Audited revision submitted to the Living Archives Council.');
    navigate(`/community/living-archives/songs/${songId}`);
  };

  const breadcrumbs = [
    { label: 'Living Archives', to: '/community/living-archives' },
    { label: song?.title || 'Song', to: `/community/living-archives/songs/${songId}` },
    { label: 'Linguist Audit' },
  ];

  return (
    <RoleGate allowedRoles={[ROLES.LINGUIST, ROLES.ADMIN]} showNotice>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button
            type="button"
            onClick={() => navigate(`/community/living-archives/songs/${songId}`)}
            className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Cancel</span>
          </button>
        </div>

        <ParchmentPanel>
          <div className="pb-4 border-b border-amber-900/20 mb-6">
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-emerald-900">
              Linguist Peer Audit Chamber
            </span>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Audit Manuscript: {song?.title}
            </h1>
            <p className="text-xs font-serif text-stone-600 mt-0.5">
              Review and certify semantic fidelity, historical idioms, and phonetic transcription.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Proposed Revisions & Line-by-Line Adjustments
              </label>
              <MarkdownEditor
                value={proposedLyrics}
                onChange={setProposedLyrics}
                placeholder="Inscribe corrected stanzas or revised grammatical explanations..."
                rows={8}
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Scholarly Justification & Source References *
              </label>
              <MarkdownEditor
                value={auditNotes}
                onChange={setAuditNotes}
                placeholder="Cite dictionaries, etymological roots, or regional vocal traditions..."
                rows={5}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/community/living-archives/songs/${songId}`)}
                className="px-4 py-2 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ornate"
                disabled={!auditNotes.trim()}
                className="px-6 py-2.5 text-sm flex items-center gap-2"
              >
                <Check size={15} />
                <span>Publish Peer Audit</span>
              </Button>
            </div>
          </form>
        </ParchmentPanel>
      </div>
    </RoleGate>
  );
};

export default AuditSong;
