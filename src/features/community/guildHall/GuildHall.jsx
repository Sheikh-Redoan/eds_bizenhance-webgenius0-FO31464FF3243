import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Castle, ArrowRight, ShieldCheck, Users, BookOpen } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import FramedCard from '../components/FramedCard';
import { ALL_WINGS } from '../config/wings';

export const WingCard = ({ wing }) => {
  const navigate = useNavigate();

  return (
    <FramedCard
      onClick={() => navigate(wing.path)}
      className="flex flex-col justify-between group h-64 border-2 border-stone-300"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-900 text-amber-100">
            {wing.tag}
          </span>
          <span className="text-xs font-serif text-stone-500">Guild Wing</span>
        </div>

        <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
          {wing.title}
        </h3>

        <p className="font-serif text-xs sm:text-sm text-stone-600 leading-relaxed">
          {wing.desc}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs font-serif">
        <span className="text-stone-500">Open to Guild</span>
        <span className="font-bold text-amber-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
          <span>Pass Through</span>
          <ArrowRight size={13} />
        </span>
      </div>
    </FramedCard>
  );
};

export const GuildHall = () => {
  return (
    <div className="space-y-8">
      <WingBanner
        icon={Castle}
        tag="GUILD HALL"
        title="The Grand Guild Hall"
        subtitle="The central navigational rotunda of Lingual Jams. Six distinct sanctums dedicated to dialogue, education, creativity, and archival integrity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_WINGS.map((wing) => (
          <WingCard key={wing.id} wing={wing} />
        ))}
      </div>
    </div>
  );
};

export default GuildHall;
