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
      title: 'Current Official Lyrics — Every Path (Каждый путь)',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Every Path (2).mp3',
      lyrics: [
        'Here we are standing on the hill',
        'Мы стоим здесь, на вершине холма',
        '',
        'There you go walking towards the end',
        'А ты идёшь вперёд, к самому концу',
        '',
        'When they see how long the road is',
        'Когда они видят, какая длинная дорога',
        '',
        'Now they run left and right',
        'Теперь они бегут то влево, то вправо',
        '',
        'Sprinting back to the beginning',
        'Снова бегут к началу',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Come with me to journey forward',
        'Пойдём со мной, продолжим путь вперёд',
        '',
        'Come with me to see it till the end',
        'Пойдём со мной, дойдём до самого конца',
        '',
        'Come with me to feel the road',
        'Пойдём со мной, почувствуем дорогу',
        '',
        'Come with me to explore the streets',
        'Пойдём со мной, исследуем улицы',
        '',
        'Come with me to journey on',
        'Пойдём со мной, продолжим путь',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Cars are rushing down the road',
        'Машины мчатся по дороге',
        '',
        'Buses are stopping and slowing down',
        'Автобусы останавливаются и замедляют ход',
        '',
        'Trains are moving straight on the tracks',
        'Поезда идут прямо по рельсам',
        '',
        'Planes are flying in the sky above',
        'Самолёты летят высоко в небе',
        '',
        'Boats are floating on in the waters',
        'Лодки плывут дальше по воде',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Мы стоим здесь, на вершине холма',
        'Here we are standing on the hill',
        '',
        'А ты идёшь вперёд, к самому концу',
        'There you go walking towards the end',
        '',
        'Когда они видят, какая длинная дорога',
        'When they see how long the road is',
        '',
        'Теперь они бегут то влево, то вправо',
        'Now they run left and right',
        '',
        'Снова бегут к началу',
        'Sprinting back to the beginning',
        '',
        'Каждый путь снова приводит к началу',
        'Every Path Circles back to the start',
        '',
        'Пойдём со мной, продолжим путь вперёд',
        'Come with me to journey forward',
        '',
        'Пойдём со мной, дойдём до самого конца',
        'Come with me to see it till the end',
        '',
        'Пойдём со мной, почувствуем дорогу',
        'Come with me to feel the road',
        '',
        'Пойдём со мной, исследуем улицы',
        'Come with me to explore the streets',
        '',
        'Пойдём со мной, продолжим путь',
        'Come with me to journey on',
        '',
        'Спасибо, что прошёл этот путь со мной',
      ],
    },
    {
      id: 'sub-2',
      title: 'Acoustic Translation Variant — Verse & Cadence',
      artwork: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Every Path (2).mp3',
      lyrics: [
        'Here we are standing on the hill',
        'Мы стоим здесь, на вершине холма',
        '',
        'There you go walking towards the end',
        'А ты идёшь вперёд, к самому концу',
        '',
        'Cars are rushing down the road',
        'Машины мчатся по дороге',
        '',
        'Trains are moving straight on the tracks',
        'Поезда идут прямо по рельсам',
        '',
        'Planes are flying in the sky above',
        'Самолёты летят высоко в небе',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Спасибо, что прошёл этот путь со мной',
      ],
    },
    {
      id: 'sub-3',
      title: 'Lyrical Adaptation — Choral Journey Harmony',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Every Path (2).mp3',
      lyrics: [
        'Come with me to journey forward',
        'Пойдём со мной, продолжим путь вперёд',
        '',
        'Come with me to see it till the end',
        'Пойдём со мной, дойдём до самого конца',
        '',
        'Come with me to feel the road',
        'Пойдём со мной, почувствуем дорогу',
        '',
        'Come with me to explore the streets',
        'Пойдём со мной, исследуем улицы',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Спасибо, что прошёл этот путь со мной',
      ],
    },
    {
      id: 'sub-4',
      title: 'Current Official Lyrics — Every Path (Full Manuscript)',
      artwork: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=780&q=80',
      audioTitle: 'Every Path (2).mp3',
      lyrics: [
        'Here we are standing on the hill',
        'Мы стоим здесь, на вершине холма',
        '',
        'There you go walking towards the end',
        'А ты идёшь вперёд, к самому концу',
        '',
        'When they see how long the road is',
        'Когда они видят, какая длинная дорога',
        '',
        'Now they run left and right',
        'Теперь они бегут то влево, то вправо',
        '',
        'Sprinting back to the beginning',
        'Снова бегут к началу',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Come with me to journey forward',
        'Пойдём со мной, продолжим путь вперёд',
        '',
        'Come with me to see it till the end',
        'Пойдём со мной, дойдём до самого конца',
        '',
        'Come with me to feel the road',
        'Пойдём со мной, почувствуем дорогу',
        '',
        'Come with me to explore the streets',
        'Пойдём со мной, исследуем улицы',
        '',
        'Come with me to journey on',
        'Пойдём со мной, продолжим путь',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Cars are rushing down the road',
        'Машины мчатся по дороге',
        '',
        'Buses are stopping and slowing down',
        'Автобусы останавливаются и замедляют ход',
        '',
        'Trains are moving straight on the tracks',
        'Поезда идут прямо по рельсам',
        '',
        'Planes are flying in the sky above',
        'Самолёты летят высоко в небе',
        '',
        'Boats are floating on in the waters',
        'Лодки плывут дальше по воде',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Up and down, up and down, up and down you go',
        'Вверх и вниз, вверх и вниз, вверх и вниз идёшь',
        '',
        'Every Path Circles back to the start',
        'Каждый путь снова приводит к началу',
        '',
        'Мы стоим здесь, на вершине холма',
        'Here we are standing on the hill',
        '',
        'А ты идёшь вперёд, к самому концу',
        'There you go walking towards the end',
        '',
        'Когда они видят, какая длинная дорога',
        'When they see how long the road is',
        '',
        'Теперь они бегут то влево, то вправо',
        'Now they run left and right',
        '',
        'Снова бегут к началу',
        'Sprinting back to the beginning',
        '',
        'Каждый путь снова приводит к началу',
        'Every Path Circles back to the start',
        '',
        'Пойдём со мной, продолжим путь вперёд',
        'Come with me to journey forward',
        '',
        'Пойдём со мной, дойдём до самого конца',
        'Come with me to see it till the end',
        '',
        'Пойдём со мной, почувствуем дорогу',
        'Come with me to feel the road',
        '',
        'Пойдём со мной, исследуем улицы',
        'Come with me to explore the streets',
        '',
        'Пойдём со мной, продолжим путь',
        'Come with me to journey on',
        '',
        'Спасибо, что прошёл этот путь со мной',
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
