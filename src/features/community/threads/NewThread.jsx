import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { THREAD_WINGS } from '../config/wings';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { saveDraft, discardDraft } from '../state/communitySlice';
import { useCreateThreadMutation } from '../../../redux/api/communityApi';
import RoleGate from '../components/RoleGate';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

export const NewThread = ({ wing: propWing }) => {
  const { wing: paramWing } = useParams();
  const wing = propWing || paramWing || 'living-archives';
  const config = THREAD_WINGS[wing] || THREAD_WINGS['living-archives'];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const [createThread, { isLoading: isSubmitting }] = useCreateThreadMutation();

  // Tags matching Figma demo for The Living Archives:
  // "Guild World Lore", "Community Canon / Stories", "Reference Library"
  const availableTags = config?.tags?.length
    ? config.tags
    : ['Guild World Lore', 'Community Canon / Stories', 'Reference Library'];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSaveDraft = () => {
    setIsDraftSaving(true);
    dispatch(
      saveDraft({
        type: 'threads',
        id: wing,
        data: { title, content, selectedTags },
      })
    );
    setTimeout(() => {
      setIsDraftSaving(false);
      alert('Draft saved to your satchel.');
    }, 400);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || !content.trim() || isSubmitting) return;

    try {
      await createThread({
        wing,
        thread: {
          title: title.trim(),
          content: content.trim(),
          tags: selectedTags.length > 0 ? selectedTags : [availableTags[0]],
          author: {
            id: user?._id || user?.id || 'anon',
            name: user?.name || 'Guild Member',
            role: user?.role || 'student',
            avatar: user?.avatar || '',
          },
        },
      }).unwrap();

      dispatch(discardDraft({ type: 'threads', id: wing }));
      navigate(`/community/${wing}`);
    } catch (err) {
      console.error('Failed to dispatch thread:', err);
    }
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  // Breadcrumb wing label
  const wingLabel = config?.label || 'The Living Archives';

  return (
    // <RoleGate allowedRoles={config?.access} showNotice>
      <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
        {/* 1. Breadcrumbs */}
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
            onClick={() => navigate(`/community/${wing}`)}
            className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
          >
            {wingLabel}
          </button>

          <ChevronRight size={18} className="text-white shrink-0" />

          <span className="text-white text-base sm:text-xl font-normal font-Merriweather capitalize">
            New Thread
          </span>
        </div>

        {/* 2. Main Title */}
        <div className="w-full flex flex-col justify-start items-start gap-6">
          <h1 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
            CREATE <span className="uppercase">New Thread</span>
          </h1>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            {/* 3. Write / Preview Tabs with bottom white line indicator */}
            <div className="w-full border-b border-white/40 flex justify-start items-end gap-6 select-none">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`h-10 px-4 py-2.5 flex flex-col justify-center items-center text-xl font-normal font-Merriweather transition-colors cursor-pointer ${
                  activeTab === 'write'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`h-10 px-4 py-2.5 flex flex-col justify-center items-center text-xl font-normal font-Merriweather transition-colors cursor-pointer ${
                  activeTab === 'preview'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
              >
                Preview
              </button>
            </div>

            {/* 4. TITLE Input */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <label className="text-white text-xl font-normal font-Merriweather leading-6">
                TITLE
              </label>
              <div className="w-full pl-6 pr-7 py-3.5 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex items-center">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Descriptive thread title…"
                  className="w-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden"
                />
              </div>
            </div>

            {/* 5. TAGS (up to 3) */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <div className="text-white text-xl font-normal font-Merriweather leading-6">
                TAGS <span className="text-white/80 text-base font-normal font-Merriweather">(up to 3)</span>
              </div>
              <div className="w-full pl-6 pr-7 py-4 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-wrap items-center gap-4">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 outline outline-1 outline-offset-[-1px] flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'outline-white bg-white/20 text-white font-medium'
                          : 'outline-white/70 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-center text-[11px] sm:text-xs font-normal font-Merriweather">
                        {tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. CONTENT Textarea or Markdown Preview */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <label className="text-white text-xl font-normal font-Merriweather leading-6">
                CONTENT
              </label>
              <div className="w-full flex flex-col justify-start items-end gap-2">
                {activeTab === 'write' ? (
                  <div className="w-full h-44 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start overflow-hidden">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post… Markdown is supported......"
                      className="w-full h-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden resize-none"
                    />
                  </div>
                ) : (
                  <div className="w-full h-44 px-6 py-4 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-y-auto text-white/90 text-sm font-Merriweather leading-relaxed">
                    {content ? (
                      <p className="whitespace-pre-wrap">{content}</p>
                    ) : (
                      <p className="text-white/40 italic">Nothing to preview yet.</p>
                    )}
                  </div>
                )}
                {/* Character Counter */}
                <div className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                  {content.length} chars
                </div>
              </div>
            </div>

            {/* 7. Bottom Actions: Cancel (Left) | Save draft + Post Thread (Right) */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-3">
              {/* Cancel Button with #755F48 brown background & border */}
              <button
                type="button"
                onClick={() => navigate(`/community/${wing}`)}
                className="relative inline-flex items-center justify-center px-8 py-3 bg-[#755F48] hover:bg-[#634f3c] text-white font-normal font-Merriweather text-base tracking-normal transition-all cursor-pointer group shadow-md"
              >
                <img
                  src={buttonBorderSecondary}
                  alt="button border"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                />
                <span className="relative z-10">Cancel</span>
              </button>

              {/* Right Pair: Save draft + Post Thread */}
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
                    {isSubmitting ? 'Posting...' : 'Post Thread'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </RoleGate>
  );
};

export default NewThread;
