import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Music } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import cardFrameImg from '../../../../assets/images/cardFreame.png';

export const SongCard = ({ song }) => {
  const navigate = useNavigate();

  const [isDownloaded, setIsDownloaded] = React.useState(false);

  // Determine badge styling based on audit status
  const isAudited = song.status === 'audited';

  const handleDownload = (e) => {
    e.stopPropagation();
    const downloadUrl = song.audioFile || '/Every Path (2).mp3';
    const filename = song.filename || 'Every Path (2).mp3';

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);
    setTimeout(() => {
      setIsDownloaded(false);
    }, 1500);
  };

  return (
    <div className="w-[300px] h-[460px] relative select-none mx-auto shrink-0 flex items-center justify-center">
      {/* 1. Inner Parchment Content Box - positioned perfectly inside the frame opening */}
      <div className="w-[240px] h-[400px] bg-[#FFF1E0] shadow-md flex flex-col justify-between items-start overflow-hidden rounded-xs z-0 p-1">
        {/* Top Image Preview + Status Badge + Music Play Button */}
        <div className="w-full h-44 relative overflow-hidden shrink-0 group rounded-xs">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={song.image}
            alt={song.title}
          />
          {/* Subtle bottom vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-950/0 via-yellow-950/20 to-yellow-950/80" />

          {/* Top Left Audit Status Badge */}
          <div className="absolute left-2 top-2 px-2.5 py-0.5 bg-white backdrop-blur-xs flex items-center justify-center shadow-xs">
            <span className="text-neutral-950 text-[11px] font-medium font-Merriweather leading-4 uppercase tracking-wider">
              {isAudited ? 'Audited' : 'IN REVIEW'}
            </span>
          </div>

          {/* Frosted Glass Music Play Badge */}
          <div className="absolute right-2.5 bottom-2.5 w-8 h-8 rounded-full bg-white/20 outline outline-[0.80px] outline-white/60 backdrop-blur-[5px] flex items-center justify-center text-orange-100 shadow-md">
            <Music size={15} />
          </div>
        </div>

        {/* Lower Content: Language, Title, Version, View Song, Download */}
        <div className="w-full px-2 pt-1 pb-1 flex flex-col justify-between flex-1">
          <div className="w-full flex flex-col justify-start items-start">
            {/* Language Tag */}
            <span className="text-yellow-950 text-xs font-normal font-Merriweather uppercase leading-4">
              {song.language}
            </span>

            {/* Song Title */}
            <h3 className="text-stone-700 text-base font-normal font-Merriweather leading-snug line-clamp-1 mt-0.5">
              {song.title}
            </h3>

            {/* Current version row */}
            <div className="w-full pt-1.5 mt-1 border-t border-stone-300 flex justify-between items-center text-xs font-Merriweather">
              <span className="text-stone-500/70">Current version</span>
              <span className="text-yellow-950 font-normal">{song.version}</span>
            </div>
          </div>

          {/* Action Buttons: View song + Download */}
          <div className="w-full flex flex-col justify-start items-center gap-1.5 pt-1.5">
            {/* View Song Button with #755F48 brown background & ornate border */}
            <button
              type="button"
              onClick={() => navigate(`/community/living-archives/songs/${song.id}`)}
              className="w-full h-9 relative bg-[#755F48] hover:bg-[#634f3c] text-white text-xs font-normal font-Merriweather tracking-wide flex items-center justify-center transition-colors cursor-pointer group shadow-xs"
            >
              <img
                src={buttonBorderSecondary}
                alt="button border"
                className="absolute inset-0 w-full h-full pointer-events-none object-fill"
              />
              <span className="relative z-10">View song</span>
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className={`w-full h-7 px-2 ${
                isDownloaded
                  ? 'bg-emerald-600/20 text-emerald-800'
                  : 'bg-stone-600/15 hover:bg-stone-600/25 text-stone-600 hover:text-stone-800'
              } text-xs font-normal font-Merriweather flex justify-center items-center gap-1.5 transition-colors cursor-pointer`}
            >
              <Download size={13} className={isDownloaded ? 'text-emerald-700' : 'text-stone-500'} />
              <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Ornate Golden Frame Overlay - placed on top (z-10) with pointer-events-none so it frames the content cleanly without overflowing */}
      <img
        src={cardFrameImg}
        alt="Ornate Card Frame"
        className="w-full h-full object-fill pointer-events-none absolute inset-0 z-10 drop-shadow-xl"
      />
    </div>
  );
};

export default SongCard;
