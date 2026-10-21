import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, CheckCircle2, History, Users, ArrowRight } from 'lucide-react';
import FramedCard from '../../components/FramedCard';

export const SongCard = ({ song }) => {
  const navigate = useNavigate();

  return (
    <FramedCard
      onClick={() => navigate(`/community/living-archives/songs/${song.id}`)}
      className="flex flex-col justify-between h-64 group"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            {song.language}
          </span>
          {song.verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-serif font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 size={12} />
              <span>Audited Canon</span>
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
            {song.title}
          </h3>
          <p className="text-xs font-serif text-stone-600 italic mt-0.5">
            Original Composer: {song.artist}
          </p>
        </div>

        <p className="font-serif text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {song.summary}
        </p>
      </div>

      <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs font-serif text-stone-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <History size={12} className="text-stone-400" />
            <span>{song.versionsCount} Versions</span>
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-stone-400" />
            <span>{song.contributorsCount} Bards</span>
          </span>
        </div>

        <span className="font-bold text-amber-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
          <span>Read Archives</span>
          <ArrowRight size={13} />
        </span>
      </div>
    </FramedCard>
  );
};

export default SongCard;
