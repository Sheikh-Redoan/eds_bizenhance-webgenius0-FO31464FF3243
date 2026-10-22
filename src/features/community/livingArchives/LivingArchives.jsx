import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, ChevronDown } from 'lucide-react';
import SongCard from './components/SongCard';
import livingArchivesBannerImg from '../../../assets/images/living_archives.jpg';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import { useGetArchivedSongsQuery } from '../../../redux/api/communityApi';

export const LivingArchives = () => {
  const navigate = useNavigate();

  // Filters state matching Figma design
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All languages');
  const [selectedVersion, setSelectedVersion] = useState('All versions');
  const [selectedAuditStatus, setSelectedAuditStatus] = useState('Any audit status');

  // Dropdown open states
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  const { data: apiSongs = [] } = useGetArchivedSongsQuery();

  // Curated manuscripts for Living Archives matching the Figma demo (Les Étoiles Perdues, Noite de Vidro, etc.)
  const mockArchiveSongs = [
    {
      id: 'song-1',
      title: 'Les Étoiles Perdues',
      language: 'French',
      version: 'v2.1',
      status: 'audited',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'song-2',
      title: 'Noite de Vidro',
      language: 'Portuguese',
      version: 'v2.1',
      status: 'in_review',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'song-3',
      title: 'Les Étoiles Perdues',
      language: 'French',
      version: 'v2.1',
      status: 'audited',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'song-4',
      title: 'Noite de Vidro',
      language: 'Portuguese',
      version: 'v2.1',
      status: 'in_review',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Filter options
  const languageOptions = ['All languages', 'French', 'Portuguese', 'Spanish', 'Italian'];
  const versionOptions = ['All versions', 'v2.1', 'v2.0', 'v1.5', 'v1.0'];
  const auditOptions = ['Any audit status', 'Audited', 'In Review'];

  // Filtering logic
  const filteredSongs = mockArchiveSongs.filter((song) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!song.title.toLowerCase().includes(q) && !song.language.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedLanguage !== 'All languages' && song.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
      return false;
    }
    if (selectedVersion !== 'All versions' && song.version !== selectedVersion) {
      return false;
    }
    if (selectedAuditStatus !== 'Any audit status') {
      const matchAudited = selectedAuditStatus === 'Audited' && song.status === 'audited';
      const matchInReview = selectedAuditStatus === 'In Review' && song.status === 'in_review';
      if (!matchAudited && !matchInReview) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
      {/* 1. Breadcrumbs Header */}
      <div className="w-full inline-flex justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          The Living Archives
        </span>
      </div>

      {/* 2. Panoramic Banner Card */}
      <div className="w-full h-56 relative rounded-sm overflow-hidden outline outline-[3px] outline-offset-[-3px] outline-stone-400 shadow-2xl">
        {/* Banner image with dark gradient vignette */}
        <img
          src={livingArchivesBannerImg}
          alt="The Living Archives Banner"
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute inset-0 bg-linear-270 from-black/80 via-black/40 to-black/20 border-2 border-white pointer-events-none" />

        {/* Content overlaid on banner */}
        <div className="w-full px-6 sm:px-8 pb-6 absolute left-0 bottom-0 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          {/* Title & Tagline */}
          <div className="flex flex-col justify-start items-start gap-1">
            <h1 className="text-white text-3xl sm:text-5xl font-normal font-OldLondon leading-tight drop-shadow-md">
              The Living Archives
            </h1>
            <p className="text-white text-sm sm:text-xl font-normal font-Merriweather drop-shadow-sm">
              Guild lore, stories, records, reference posts
            </p>
          </div>

          {/* Banner Action Buttons: SONG LIBRARY & LANGUAGE ARCHIVES (Soon) */}
          <div className="flex flex-wrap items-center gap-4 select-none">
            {/* Song Library Ornate Brown Button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center px-6 py-2.5 bg-[#755F48] hover:bg-[#634f3c] text-white font-normal font-Merriweather text-sm uppercase tracking-wider transition-colors cursor-pointer group shadow-lg"
            >
              <img
                src={buttonBorderSecondary}
                alt="button border"
                className="absolute inset-0 w-full h-full pointer-events-none object-fill"
              />
              <span className="relative z-10">Song Library</span>
            </button>

            {/* Language Archives Soon Button */}
            <div className="relative inline-flex items-center justify-center px-6 py-2.5 bg-[#755F48]/80 text-white font-normal font-Merriweather text-sm uppercase tracking-wider gap-2 shadow-lg">
              <img
                src={buttonBorderSecondary}
                alt="button border"
                className="absolute inset-0 w-full h-full pointer-events-none object-fill opacity-75"
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>Language Archives</span>
                <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-normal font-Merriweather rounded-xs lowercase">
                  soon
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Title & Description */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <h2 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
          Song Library
        </h2>
        <p className="text-white/80 text-base font-normal font-Merriweather leading-6">
          Discover official translations, trace every revision, and honor each contributor.
        </p>
      </div>

      {/* 4. Filter Bar (Search, Languages, Versions, Audit Status) */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Search Box */}
          <div className="h-14 px-4 sm:px-6 py-3 outline outline-2 outline-offset-[-2px] outline-stone-400 bg-black/20 flex items-center gap-3">
            <Search size={20} className="text-stone-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search songs..."
              className="w-full bg-transparent text-white placeholder-stone-400 text-base font-normal font-sans outline-hidden"
            />
          </div>

          {/* Language Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsVersionOpen(false);
                setIsAuditOpen(false);
              }}
              className="w-full h-14 px-4 sm:px-6 py-3 outline outline-2 outline-offset-[-2px] outline-stone-400 bg-black/20 flex justify-between items-center text-stone-400 cursor-pointer hover:bg-black/30 transition-colors"
            >
              <span className="text-stone-300 text-base font-normal font-sans truncate">
                {selectedLanguage}
              </span>
              <ChevronDown
                size={20}
                className={`text-stone-400 transition-transform shrink-0 ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute z-30 left-0 right-0 top-16 bg-stone-900 border border-stone-600 shadow-xl py-1">
                {languageOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(opt);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-sans transition-colors ${
                      selectedLanguage === opt
                        ? 'bg-stone-800 text-white font-bold'
                        : 'text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Versions Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsVersionOpen(!isVersionOpen);
                setIsLangOpen(false);
                setIsAuditOpen(false);
              }}
              className="w-full h-14 px-4 sm:px-6 py-3 outline outline-2 outline-offset-[-2px] outline-stone-400 bg-black/20 flex justify-between items-center text-stone-400 cursor-pointer hover:bg-black/30 transition-colors"
            >
              <span className="text-stone-300 text-base font-normal font-sans truncate">
                {selectedVersion}
              </span>
              <ChevronDown
                size={20}
                className={`text-stone-400 transition-transform shrink-0 ${
                  isVersionOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isVersionOpen && (
              <div className="absolute z-30 left-0 right-0 top-16 bg-stone-900 border border-stone-600 shadow-xl py-1">
                {versionOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedVersion(opt);
                      setIsVersionOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-sans transition-colors ${
                      selectedVersion === opt
                        ? 'bg-stone-800 text-white font-bold'
                        : 'text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audit Status Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsAuditOpen(!isAuditOpen);
                setIsLangOpen(false);
                setIsVersionOpen(false);
              }}
              className="w-full h-14 px-4 sm:px-6 py-3 outline outline-2 outline-offset-[-2px] outline-stone-400 bg-black/20 flex justify-between items-center text-stone-400 cursor-pointer hover:bg-black/30 transition-colors"
            >
              <span className="text-stone-300 text-base font-normal font-sans truncate">
                {selectedAuditStatus}
              </span>
              <ChevronDown
                size={20}
                className={`text-stone-400 transition-transform shrink-0 ${
                  isAuditOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isAuditOpen && (
              <div className="absolute z-30 left-0 right-0 top-16 bg-stone-900 border border-stone-600 shadow-xl py-1">
                {auditOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedAuditStatus(opt);
                      setIsAuditOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm font-sans transition-colors ${
                      selectedAuditStatus === opt
                        ? 'bg-stone-800 text-white font-bold'
                        : 'text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. Manuscripts Grid Matching Figma 4-card Layout */}
        {filteredSongs.length === 0 ? (
          <div className="w-full py-16 text-center text-white/60 font-Merriweather text-base">
            No song manuscripts found matching the selected filters.
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivingArchives;
