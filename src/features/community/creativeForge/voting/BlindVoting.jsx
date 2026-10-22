import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Music, Play, Check } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import { useGetContestQuery } from '../../../../redux/api/communityApi';

export const BlindVoting = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest } = useGetContestQuery(contestId);

  const [currentIndex, setCurrentIndex] = useState(3); // 4th submission (0-indexed 3)
  const [hasVotedCurrent, setHasVotedCurrent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Submissions pool (18 submissions as shown in demo: "Submission 4 of 18")
  const totalSubmissions = 18;

  const mockSubmissions = [
    {
      id: 'sub-1',
      title: 'Current Official Lyrics',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Voces_del_Rio_Boceto_01.mp3',
      lyrics: [
        'Cuando el alba toca el río,',
        'y despierta el viejo sol,',
        'llevo historias en el viento,',
        'llevo el mundo en mi canción.',
        '',
        'Que la voz cruce los montes,',
        'que la lengua guarde el mar,',
        'cada verso es una puerta,',
        'cada nombre, un nuevo hogar.',
      ],
    },
    {
      id: 'sub-2',
      title: 'Current Official Lyrics',
      artwork: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Ecos_Lejanos_Acoustic.mp3',
      lyrics: [
        'Entre las olas del tiempo perdido,',
        'canta el marinero su adiós al olvido,',
        'río silente que besa el cantar,',
        'luz que navega caminos del mar.',
      ],
    },
    {
      id: 'sub-3',
      title: 'Current Official Lyrics',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Sombras_del_Alba.mp3',
      lyrics: [
        'Bajo la luna que pinta el sendero,',
        'dejo mis pasos al son del viajero,',
        'vuela la copla que nunca morirá,',
        'en las orillas que el viento sabrá.',
      ],
    },
    {
      id: 'sub-4',
      title: 'Current Official Lyrics',
      artwork: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Cuando_el_Alba_Master.mp3',
      lyrics: [
        'Cuando el alba toca el río,',
        'y despierta el viejo sol,',
        'llevo historias en el viento,',
        'llevo el mundo en mi canción.',
        '',
        'Que la voz cruce los montes,',
        'que la lengua guarde el mar,',
        'cada verso es una puerta,',
        'cada nombre, un nuevo hogar.',
      ],
    },
  ];

  const currentSubmission = mockSubmissions[currentIndex % mockSubmissions.length];

  const handleVote = async () => {
    try {
      if (castVote) {
        await castVote({
          contestId,
          submissionId: currentSubmission.id,
        }).unwrap();
      }
    } catch {
      // fallback local state
    }
    setHasVotedCurrent(true);
  };

  const handleNext = () => {
    if (currentIndex < totalSubmissions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setHasVotedCurrent(false);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setHasVotedCurrent(false);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-[1064px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
      {/* 1. Breadcrumbs Header */}
      <div className="w-full inline-flex flex-wrap justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white/60 shrink-0" />

        <button
          type="button"
          onClick={() => navigate('/community/creative-forge')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Creative Forge
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather capitalize">
          {contest?.title || 'Voices Across Water'}
        </span>
      </div>

      <div className="w-full flex flex-col justify-start items-end gap-8">
        {/* 2. Top Anonymity Notice Card */}
        <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 shadow-sm">
          <div className="flex-1 flex flex-col justify-start items-start gap-2">
            <h2 className="text-white text-base font-bold font-Merriweather">
              Creator identities are hidden during voting
            </h2>
            <p className="text-white/70 text-xs font-normal font-Merriweather leading-relaxed">
              Names, profiles, and contribution history will be revealed only after results are published.
            </p>
          </div>

          <div className="px-2.5 py-1 outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center shrink-0">
            <span className="text-white text-sm font-bold font-Merriweather leading-3">
              Voting open
            </span>
          </div>
        </div>

        {/* 3. Main Composition Card (Artwork/Audio + Lyrics + Submit Vote Button) */}
        <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col lg:flex-row justify-start items-center gap-6 shadow-sm">
          {/* Left: Artwork / Song Media Box */}
          <div className="w-full sm:w-96 h-56 relative bg-gray-800 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-hidden shrink-0 group">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={currentSubmission.artwork}
              alt="Artwork preview"
            />
            {/* Center Music Note / Play Badge */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl outline outline-[0.80px] outline-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center text-stone-50 hover:bg-black/60 transition-all cursor-pointer shadow-lg"
              title={isPlaying ? 'Pause audio' : 'Play audio excerpt'}
            >
              {isPlaying ? <Play size={18} className="fill-current" /> : <Music size={18} />}
            </button>
          </div>

          {/* Right: Official Lyrics & Submit Vote Button */}
          <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Lyrics with left border accent */}
            <div className="pl-3 border-l border-stone-400 flex flex-col justify-start items-start gap-2">
              <h3 className="text-white text-xl font-normal font-Merriweather">
                {currentSubmission.title}
              </h3>
              <div className="text-white/80 text-xs font-normal font-Merriweather leading-relaxed">
                {currentSubmission.lyrics.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Submit Vote Ornate Button */}
            <div className="shrink-0 self-center md:self-auto">
              <button
                type="button"
                onClick={handleVote}
                disabled={hasVotedCurrent}
                className={`relative inline-flex items-center justify-center px-7 py-3 font-bold font-Merriweather text-base tracking-normal transition-all cursor-pointer group shadow-lg ${
                  hasVotedCurrent
                    ? 'bg-stone-300 text-stone-700 cursor-default opacity-80'
                    : 'bg-white text-neutral-950 hover:bg-stone-100'
                }`}
              >
                <img
                  src={buttonBorderSecondary}
                  alt="button border"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                />
                <span className="relative z-10 flex items-center gap-1.5">
                  {hasVotedCurrent && <Check size={16} strokeWidth={3} />}
                  <span>{hasVotedCurrent ? 'Vote Recorded' : 'Submit Vote'}</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Bottom Stepper Navigation: Previous | Submission 4 of 18 | Next */}
        <div className="w-full flex items-center justify-between pt-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-bold font-Merriweather text-base tracking-normal transition-all shadow-md group ${
              currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-100 cursor-pointer'
            }`}
          >
            <img
              src={buttonBorderSecondary}
              alt="button border"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <span className="relative z-10">Previous</span>
          </button>

          {/* Stepper Count Indicator */}
          <div className="text-center select-none">
            <span className="text-white/70 text-base font-normal font-Merriweather leading-4">
              Submission{' '}
            </span>
            <span className="text-white/90 text-base font-bold font-Merriweather leading-4">
              {currentIndex + 1}
            </span>
            <span className="text-white/70 text-base font-normal font-Merriweather leading-4">
              {' '}of {totalSubmissions}
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === totalSubmissions - 1}
            className={`relative inline-flex items-center justify-center px-9 py-3 bg-white text-neutral-950 font-bold font-Merriweather text-base tracking-normal transition-all shadow-md group ${
              currentIndex === totalSubmissions - 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-stone-100 cursor-pointer'
            }`}
          >
            <img
              src={buttonBorderSecondary}
              alt="button border"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <span className="relative z-10">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlindVoting;
