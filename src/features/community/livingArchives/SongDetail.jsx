import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Music, Play, CheckCircle2 } from 'lucide-react';
import { useGetArchivedSongQuery } from '../../../redux/api/communityApi';
import Skeleton from '../../../components/ui/Skeleton';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

export const SongDetail = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const { data: song, isLoading } = useGetArchivedSongQuery(songId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Version history data matching Every Path Russian Song
  const isRussianSong = song?.language === 'Russian' || songId === 'song-1';

  const versionHistory = isRussianSong
    ? [
        {
          version: 'Version 2.1',
          label: 'Acoustic metric translation (Complete)',
          date: '24 Oct 2026',
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
            'Thank you for walking this path with me',
            '',
            'Давай пройдём этот путь вместе снова',
            "Let's make this journey together again",
          ],
        },
        {
          version: 'Version 2.0',
          label: 'Vehicle and journey stanza breakdown',
          date: '20 Oct 2026',
          lyrics: [
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
            'Спасибо, что прошёл этот путь со мной',
            'Thank you for walking this path with me',
          ],
        },
        {
          version: 'Version 1.0',
          label: 'Original journey manuscript',
          date: '15 Oct 2026',
          lyrics: [
            'Here we are standing on the hill',
            'Мы стоим здесь, на вершине холма',
            '',
            'There you go walking towards the end',
            'А ты идёшь вперёд, к самому концу',
            '',
            'Every Path Circles back to the start',
            'Каждый путь снова приводит к началу',
            '',
            'Давай пройдём этот путь вместе снова',
            "Let's make this journey together again",
          ],
        },
      ]
    : [
        {
          version: 'Version 1.3',
          label: 'Latest approved revision',
          date: '14 Jun 2025',
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
          version: 'Version 1.2',
          label: 'Linguistic correction',
          date: '14 Jun 2025',
          lyrics: [
            'Cuando el alba toca el río,',
            'y despierta el viejo sol,',
            'llevo historias en el viento,',
            'llevo el mundo en mi canción.',
            '',
            'Que la voz cruce los montes,',
            'que la lengua cuide el mar,',
            'cada verso es una puerta,',
            'cada nombre, un nuevo hogar.',
          ],
        },
        {
          version: 'Version 1.1',
          label: 'Translation correction',
          date: '14 Jun 2025',
          lyrics: [
            'Cuando el alba toca el río,',
            'y despierta el claro sol,',
            'llevo historias en el viento,',
            'llevo el alma en mi canción.',
            '',
            'Que la voz cruce las cumbres,',
            'que la lengua guarde el mar,',
            'cada verso abre una puerta,',
            'cada nombre, un nuevo hogar.',
          ],
        },
        {
          version: 'Version 1.0',
          label: 'Original archive version',
          date: '14 Jun 2025',
          lyrics: [
            'Cuando el alba toca el río,',
            'y despierta el gran sol,',
            'llevo historias en el viento,',
            'llevo el mundo en mi canción.',
            '',
            'Que la voz cruce los montes,',
            'que la voz guarde el mar,',
            'cada verso es una senda,',
            'cada nombre, un nuevo hogar.',
          ],
        },
      ];

  // Contributors matching Figma demo
  const contributors = [
    {
      name: 'Sofia Marin',
      role: 'Linguist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      edits: '1 edits',
    },
    {
      name: 'Mateo Ruiz',
      role: 'Linguist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      edits: '1 edits',
    },
    {
      name: 'Elara Voss',
      role: 'Linguist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
      edits: '1 edits',
    },
  ];

  const currentVersionData = versionHistory[selectedVersionIndex] || versionHistory[0];

  const handleDownload = () => {
    const downloadUrl = song?.audioFile || '/Every Path (2).mp3';
    const filename = song?.filename || 'Every Path (2).mp3';

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
    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
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
          onClick={() => navigate('/community/living-archives')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Living Archives
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather capitalize">
          {song?.title || 'Canto del Alba'}
        </span>
      </div>

      {isLoading ? (
        <div className="w-full space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-start gap-8">
          {/* 2. Top Hero Card: Cover Image + Metadata + Ornate Download Button */}
          <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col lg:flex-row justify-start items-center gap-10 shadow-sm">
            {/* Artwork Image with Center Play/Music Icon */}
            <div className="w-full sm:w-80 h-64 relative bg-gray-800 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-hidden shrink-0 group">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=780&q=80"
                alt={song?.title || 'Canto del Alba'}
              />
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl outline outline-[0.80px] outline-white/60 bg-black/40 backdrop-blur-[5px] flex items-center justify-center text-stone-50 hover:bg-black/60 transition-all cursor-pointer shadow-lg"
                title={isPlaying ? 'Pause excerpt' : 'Play song excerpt'}
              >
                {isPlaying ? <Play size={18} className="fill-current" /> : <Music size={18} />}
              </button>
            </div>

            {/* Song Meta Details */}
            <div className="flex-1 flex flex-col justify-start items-start gap-6 w-full">
              <div className="w-full flex flex-col justify-start items-start gap-5">
                {/* Title & Tagline */}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <h1 className="text-white text-3xl sm:text-4xl font-normal font-MetalMania leading-10 tracking-wide">
                    {song?.title || 'Canto del Alba'}
                  </h1>
                  <p className="text-white text-sm sm:text-base font-normal font-Merriweather leading-6">
                    A song of first light, carried through generations and renewed in every voice.
                  </p>
                </div>

                {/* 3-Column Metadata Strip: Language | Current version | Published */}
                <div className="w-full py-4 border-t-[0.80px] border-b-[0.80px] border-white/50 flex flex-wrap items-center gap-y-3">
                  {/* Language */}
                  <div className="pr-9 border-r-[0.80px] border-white/50 flex flex-col justify-start items-start gap-2">
                    <span className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                      Language
                    </span>
                    <span className="text-white text-base font-normal font-Merriweather leading-3">
                      {song?.language || 'Spanish'}
                    </span>
                  </div>

                  {/* Current version */}
                  <div className="px-9 border-r-[0.80px] border-white/50 flex flex-col justify-start items-start gap-2">
                    <span className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                      Current version
                    </span>
                    <span className="text-white text-base font-normal font-Merriweather leading-3">
                      1.3
                    </span>
                  </div>

                  {/* Published */}
                  <div className="pl-9 flex flex-col justify-start items-start gap-2">
                    <span className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                      Published
                    </span>
                    <span className="text-white text-base font-normal font-Merriweather leading-3">
                      14 June 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Ornate Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-normal font-Merriweather text-base tracking-normal hover:bg-stone-100 transition-all cursor-pointer group shadow-lg"
              >
                <img
                  src={buttonBorderSecondary}
                  alt="button border"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {isDownloaded ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-700" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <span>Download</span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* 3. Middle Section: Lyrics & Linguist Audit Banner (Left) + Version History & Contributors (Right) */}
          <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8">
            {/* Left Column: Official Lyrics & Audit Banner */}
            <div className="flex-1 w-full flex flex-col justify-between items-start gap-6 p-6 sm:p-7 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 shadow-sm min-h-[460px]">
              {/* Lyrics Card */}
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <span className="text-white/70 text-base font-normal font-Merriweather">
                  {currentVersionData.version}
                </span>

                <div className="w-full flex justify-between items-start gap-4">
                  <div className="pl-3 border-l border-stone-400 flex flex-col justify-start items-start gap-2">
                    <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
                      Current Official Lyrics
                    </h2>
                    <div className="text-white/80 text-xs font-normal font-Merriweather leading-relaxed">
                      {currentVersionData.lyrics.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Language Pill */}
                  <div className="p-2.5 bg-white/20 flex justify-center items-center shrink-0">
                    <span className="text-center text-white text-[10px] font-normal font-Merriweather leading-3">
                      ES · Spanish
                    </span>
                  </div>
                </div>
              </div>

              {/* Authorized Linguist? Audit Banner */}
              <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0.5">
                    <h3 className="text-white text-lg sm:text-xl font-normal font-Merriweather">
                      Authorized Linguist?
                    </h3>
                    <p className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                      Help preserve the meaning and accuracy of this translation.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/community/living-archives/songs/${songId || 'canto-del-alba'}/audit`)}
                  className="relative inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-950 font-medium font-Merriweather text-base tracking-normal hover:bg-stone-100 transition-all cursor-pointer group shadow-lg shrink-0"
                >
                  <img
                    src={buttonBorderSecondary}
                    alt="button border"
                    className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                  />
                  <span className="relative z-10">Audit this song</span>
                </button>
              </div>
            </div>

            {/* Right Column: Version History & Contributors */}
            <div className="w-full lg:w-80 flex flex-col justify-start items-start gap-8 shrink-0">
              {/* Version History Card */}
              <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start gap-5 shadow-sm">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-white/70 text-sm font-normal font-Merriweather">
                    Preserved record
                  </span>
                  <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
                    Version History
                  </h2>
                </div>

                {/* Vertical Stepper Timeline */}
                <div className="w-full flex flex-col justify-start items-start">
                  {versionHistory.map((item, idx) => {
                    const isSelected = selectedVersionIndex === idx;

                    return (
                      <div
                        key={idx}
                        className={`w-full pl-5 pb-5 relative border-l-[0.80px] border-stone-300 flex flex-col justify-start items-start gap-2 ${
                          idx === versionHistory.length - 1 ? 'pb-2' : ''
                        }`}
                      >
                        {/* Timeline Node Pip */}
                        <div
                          className={`w-2.5 h-2.5 -left-[5.2px] top-[7px] absolute rounded-full border-2 ${
                            isSelected
                              ? 'bg-white border-white ring-2 ring-stone-400'
                              : 'bg-white rounded-md border-stone-300'
                          }`}
                        />

                        {/* Version Info & View Version Button */}
                        <div className="w-full flex justify-between items-start gap-2">
                          <div className="flex flex-col justify-start items-start">
                            <span className="text-white text-xl font-normal font-Merriweather">
                              {item.version}
                            </span>
                            <span className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-white/80 text-[10px] font-normal font-Merriweather leading-4 shrink-0">
                            {item.date}
                          </span>
                        </div>

                        {/* View version action pill */}
                        <button
                          type="button"
                          onClick={() => setSelectedVersionIndex(idx)}
                          className={`px-2 py-0.5 outline outline-1 outline-offset-[-1px] flex items-center gap-1 text-[10px] font-normal font-Merriweather cursor-pointer transition-colors ${
                            isSelected
                              ? 'outline-white bg-white/20 text-white'
                              : 'outline-white/70 text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <span>View version</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contributors Card */}
              <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start gap-2 shadow-sm">
                <h2 className="text-white text-2xl font-normal font-MetalMania leading-10 tracking-wide">
                  Contributors
                </h2>

                <div className="w-full flex flex-col justify-start items-start">
                  {contributors.map((c, idx) => (
                    <div
                      key={idx}
                      className="w-full h-16 py-3 border-b border-white/20 flex justify-between items-center last:border-b-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-10 h-10 object-cover outline outline-1 outline-white rounded-xs"
                          src={c.avatar}
                          alt={c.name}
                        />
                        <div className="flex flex-col justify-center items-start">
                          <span className="text-white text-base font-medium font-sans">
                            {c.name}
                          </span>
                          <span className="text-white/70 text-xs font-normal font-Merriweather capitalize leading-3">
                            {c.role}
                          </span>
                        </div>
                      </div>

                      <span className="text-white text-sm font-normal font-Merriweather leading-5">
                        {c.edits}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetail;
