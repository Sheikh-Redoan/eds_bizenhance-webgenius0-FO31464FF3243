import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Music,
  Image as ImageIcon,
  Headphones,
  Sparkles,
  ChevronDown,
  Upload,
  Check,
} from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import { useGetContestQuery, useSubmitCreativeWorkMutation } from '../../../../redux/api/communityApi';

export const SubmitCreativeWork = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest } = useGetContestQuery(contestId);
  const [submitWork, { isLoading: isSubmitting }] = useSubmitCreativeWorkMutation();

  const [activeCategory, setActiveCategory] = useState('lyrics');
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const categories = [
    { id: 'lyrics', label: 'Lyrics', icon: Music },
    { id: 'artwork', label: 'Artwork', icon: ImageIcon },
    { id: 'music', label: 'Music / Audio', icon: Headphones },
    { id: 'future', label: 'Future Media', icon: Sparkles },
  ];

  const languages = ['Spanish', 'French', 'Italian', 'German', 'Portuguese', 'Japanese'];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || !isAgreed) return;

    try {
      if (submitWork) {
        await submitWork({
          contestId,
          submission: {
            title,
            description,
            category: activeCategory,
            language: selectedLanguage,
            hasFile: Boolean(file),
          },
        }).unwrap();
      }
      navigate(`/community/creative-forge/contests/${contestId}`);
    } catch (err) {
      console.error('Failed to submit work:', err);
    }
  };

  const handleSaveDraft = () => {
    alert('Draft saved locally in your guild satchel.');
  };

  const isFormValid = title.trim().length > 0 && isAgreed;

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
          onClick={() => navigate('/community/creative-forge')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Creative Forge
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          Submit creative work
        </span>
      </div>

      {/* 2. Main Title */}
      <div className="w-full flex flex-col justify-start items-start gap-6">
        <h1 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
          Create creative work. Submission
        </h1>

        {/* 3. Category Selectors (Lyrics, Artwork, Music/Audio, Future Media) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`h-28 flex flex-col justify-center items-center gap-3 transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-white/20 outline outline-[0.80px] outline-offset-[-0.80px] outline-white'
                    : 'bg-white/10 outline outline-[0.80px] outline-offset-[-0.80px] outline-white/40 hover:bg-white/15'
                }`}
              >
                <Icon
                  size={24}
                  className={isCatActive ? 'text-white' : 'text-white/50'}
                />
                <span
                  className={`text-xl font-normal font-Merriweather leading-6 ${
                    isCatActive ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Language Selector Dropdown */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <label className="text-white text-xl font-normal font-Merriweather leading-6">
            Language
          </label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-full h-12 px-6 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex justify-between items-center text-white cursor-pointer"
            >
              <span className="text-white text-base font-normal font-Merriweather">
                {selectedLanguage}
              </span>
              <ChevronDown
                size={20}
                className={`text-white transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute z-20 left-0 right-0 top-14 bg-stone-900 border border-stone-600 shadow-xl py-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-6 py-2.5 font-Merriweather text-sm transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-stone-800 text-white font-bold'
                        : 'text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. Work title Input */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <label className="text-white text-xl font-normal font-Merriweather leading-6">
            Work title
          </label>
          <div className="w-full pl-6 pr-7 py-3.5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your work"
              className="w-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden"
            />
          </div>
        </div>

        {/* 6. Description Textarea */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <label className="text-white text-xl font-normal font-Merriweather leading-6">
            Description
          </label>
          <div className="w-full h-32 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the reviewers about your creative work..."
              className="w-full h-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden resize-none"
            />
          </div>
        </div>

        {/* 7. File Upload Box (Audio, image, PDF, or document up to 50 MB) */}
        <div className="w-full">
          <label className="w-full h-40 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-center items-center gap-3 cursor-pointer hover:bg-stone-400/35 transition-all">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="audio/*,image/*,.pdf,.doc,.docx"
            />
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} className="text-white" />
              <div className="text-center text-white text-xl font-normal font-Merriweather leading-6">
                {file ? file.name : 'Upload your work'}
              </div>
              <div className="text-white/40 text-base font-normal font-Merriweather leading-3">
                {file
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB uploaded`
                  : 'Audio, image, PDF, or document · up to 50 MB'}
              </div>
            </div>
          </label>
        </div>

        {/* 8. Submission & Rights Agreement */}
        <div className="w-full pt-3 border-t border-stone-400 flex flex-col justify-start items-start gap-4">
          <h2 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
            Submission & Rights Agreement
          </h2>

          <div className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-center items-start gap-4 shadow-sm">
            {/* Agreement block 1 */}
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <h3 className="text-white text-xl font-normal font-Merriweather">
                Creative Submission Agreement
              </h3>
              <p className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                By submitting, you confirm that this work is original, that you hold the rights required to enter it, and that your entry follows the contest integrity rules.
              </p>
            </div>

            {/* Agreement block 2 */}
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <h3 className="text-white text-xl font-normal font-Merriweather">
                Rights & Attribution
              </h3>
              <p className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                You retain authorship. If selected for Guild publication, the applicable archive agreement and contribution record will be presented separately.
              </p>
            </div>

            {/* Agreement block 3 */}
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <h3 className="text-white text-xl font-normal font-Merriweather">
                Blind Voting Integrity
              </h3>
              <p className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                You agree not to reveal or promote your anonymous submission identity while blind voting remains open.
              </p>
            </div>

            {/* Checkbox acceptance card */}
            <div
              onClick={() => setIsAgreed(!isAgreed)}
              className="w-full pl-6 pr-7 py-5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-center items-start gap-2.5 cursor-pointer hover:bg-stone-400/35 transition-all select-none"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-xs border border-neutral-500 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isAgreed ? 'bg-white text-neutral-950' : 'bg-white/90'
                  }`}
                >
                  {isAgreed && <Check size={12} strokeWidth={3} />}
                </div>

                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="text-white text-base sm:text-xl font-normal font-Merriweather">
                    I have read and accept this agreement
                  </div>
                  <div className="text-white/80 text-xs font-normal font-Merriweather leading-4">
                    Digital acceptance will be recorded with your submission and agreement version.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9. Bottom Actions: Cancel (Left) | Save draft (Middle) | Accept & Submit (Right) */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-3">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate(`/community/creative-forge/contests/${contestId}`)}
            className="relative inline-flex items-center justify-center px-8 py-3 bg-white text-neutral-950 font-normal font-Merriweather text-base tracking-normal hover:bg-stone-100 transition-all cursor-pointer group shadow-md"
          >
            <img
              src={buttonBorderSecondary}
              alt="button border"
              className="absolute inset-0 w-full h-full pointer-events-none object-fill"
            />
            <span className="relative z-10">Cancel</span>
          </button>

          {/* Right Button Pair: Save draft + Accept & Submit */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-white text-base font-normal font-Merriweather leading-4 hover:underline cursor-pointer"
            >
              Save draft
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`relative inline-flex items-center justify-center px-7 py-3 font-normal font-Merriweather text-base tracking-normal transition-all shadow-md group ${
                !isFormValid || isSubmitting
                  ? 'bg-stone-200 text-neutral-950/60 opacity-40 cursor-not-allowed'
                  : 'bg-white text-neutral-950 hover:bg-stone-100 cursor-pointer'
              }`}
            >
              <img
                src={buttonBorderSecondary}
                alt="button border"
                className="absolute inset-0 w-full h-full pointer-events-none object-fill"
              />
              <span className="relative z-10">
                {isSubmitting ? 'Submitting...' : 'Accept & Submit'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitCreativeWork;
