import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, History, Users, ShieldCheck, FileText } from 'lucide-react';
import { useGetArchivedSongQuery } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Button from '../../../components/ui/Button';
import ParchmentPanel from '../components/ParchmentPanel';
import Skeleton from '../../../components/ui/Skeleton';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const SongDetail = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const { data: song, isLoading } = useGetArchivedSongQuery(songId);

  const versions = [
    {
      version: 'v4.0 (Current Canon)',
      date: 'May 12, 2026',
      editor: 'Dame Genevieve',
      role: 'linguist',
      notes: 'Refined Verse 2 cadence and adjusted subjunctive emotional trigger.',
    },
    {
      version: 'v3.2',
      date: 'March 04, 2026',
      editor: 'High Council Audit',
      role: 'admin',
      notes: 'Standardized orthography and vowel liaisons.',
    },
    {
      version: 'v1.0 (Initial Draft)',
      date: 'January 10, 2026',
      editor: 'Master Rodrigo',
      role: 'teacher',
      notes: 'Initial translation and rhythm transcription.',
    },
  ];

  const lyricsSample = [
    {
      orig: 'Bésame, bésame mucho',
      trans: 'Kiss me, kiss me deeply',
      literal: 'Kiss me much / heavily',
    },
    {
      orig: 'Como si fuera esta noche la última vez',
      trans: 'As if this gentle night were the final hour',
      literal: 'As if tonight were the last time',
    },
    {
      orig: 'Bésame, bésame mucho',
      trans: 'Kiss me, hold me in your embrace',
      literal: 'Kiss me, kiss me much',
    },
    {
      orig: 'Que tengo miedo a perderte, perderte después',
      trans: 'For I tremble at the sorrow of losing your light',
      literal: 'For I have fear to lose you, to lose you afterwards',
    },
  ];

  const breadcrumbs = [
    { label: 'Living Archives', to: '/community/living-archives' },
    { label: song?.title || 'Song' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate('/community/living-archives')}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Return to Archives</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : !song ? (
        <div className="text-center py-12 font-serif text-stone-700">
          Song manuscript not found in archives.
        </div>
      ) : (
        <div className="space-y-6">
          <ParchmentPanel className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-900/20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-serif font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    {song.language}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-serif font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 size={12} />
                    <span>Audited by {song.auditedBy}</span>
                  </span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-stone-900">
                  {song.title}
                </h1>
                <p className="text-xs font-serif text-stone-600 italic">
                  Composer: {song.artist}
                </p>
              </div>

              <RoleGate allowedRoles={[ROLES.LINGUIST, ROLES.ADMIN]}>
                <Button
                  variant="ornate"
                  onClick={() => navigate(`/community/living-archives/songs/${song.id}/audit`)}
                  className="px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <ShieldCheck size={14} />
                  <span>Audit / Propose Revision</span>
                </Button>
              </RoleGate>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Official Multi-Layered Lyric Manuscript
              </h3>
              <div className="space-y-3">
                {lyricsSample.map((l, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-white/70 border border-stone-200 space-y-1 font-serif"
                  >
                    <p className="font-bold text-base text-stone-900">{l.orig}</p>
                    <p className="text-sm text-amber-950 font-semibold">{l.trans}</p>
                    <p className="text-xs text-stone-500 italic">Literal meaning: {l.literal}</p>
                  </div>
                ))}
              </div>
            </div>
          </ParchmentPanel>

          <ParchmentPanel className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <History size={16} className="text-amber-900" />
                <span>Scroll Revision History</span>
              </h3>
              <span className="text-xs font-serif text-stone-500">
                {versions.length} Archival Snapshots
              </span>
            </div>

            <div className="space-y-3">
              {versions.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white/60 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-serif"
                >
                  <div>
                    <span className="font-bold text-stone-900">{v.version}</span>
                    <span className="text-stone-500 ml-2">({v.date})</span>
                    <p className="text-stone-600 mt-0.5">{v.notes}</p>
                  </div>
                  <span className="text-stone-700 font-semibold shrink-0">
                    Editor: {v.editor}
                  </span>
                </div>
              ))}
            </div>
          </ParchmentPanel>
        </div>
      )}
    </div>
  );
};

export default SongDetail;
