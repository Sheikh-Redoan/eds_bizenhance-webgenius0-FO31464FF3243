import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { saveDraft, discardDraft } from '../state/communitySlice';
import { useCreatePostMutation, useGetCategoriesQuery } from '../../../redux/api/communityApi';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: categories = [] } = useGetCategoriesQuery();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();

  // Auto-select first category once loaded
  useEffect(() => {
    if (categories.length > 0 && categoryId === null) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSaveDraft = () => {
    setIsDraftSaving(true);
    dispatch(
      saveDraft({
        type: 'posts',
        id: 'new_post',
        data: { title, content, categoryId },
      })
    );
    setTimeout(() => setIsDraftSaving(false), 400);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId || isSubmitting) return;

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('category_id', categoryId);
    formData.append('content', content.trim());
    formData.append('status', 'published');
    if (image) formData.append('image', image);

    try {
      await createPost(formData).unwrap();
      dispatch(discardDraft({ type: 'posts', id: 'new_post' }));
      navigate('/community/guild-gate');
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const canPublish = Boolean(title.trim() && content.trim() && categoryId && !isSubmitting);

  return (
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
          onClick={() => navigate('/community/guild-gate')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Guild Gate
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          New Post
        </span>
      </div>

      {/* 2. Main Form Container */}
      <div className="w-full flex flex-col justify-start items-start gap-6">
        <div className="flex items-center gap-1.5 select-none">
          <span className="text-white text-3xl font-normal font-MetalMania uppercase tracking-wide leading-9">
            CREATE
          </span>
          <span className="text-white text-3xl font-normal font-MetalMania uppercase tracking-wide leading-9">
            New Post
          </span>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-6">
          {/* TITLE */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label
              htmlFor="post-title"
              className="text-white text-xl font-normal font-Merriweather leading-6 tracking-wide uppercase"
            >
              TITLE
            </label>
            <div className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Descriptive thread title…"
                className="w-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="w-full flex flex-col justify-start items-start gap-3 relative">
            <label className="text-white text-xl font-normal font-Merriweather leading-6 tracking-wide">
              Category
            </label>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 flex justify-between items-center text-left cursor-pointer transition-all hover:bg-[#B49167]/40 focus:outline-none"
            >
              <span className="text-white text-base font-normal font-Merriweather leading-relaxed">
                {selectedCategory ? selectedCategory.name : 'Select a category…'}
              </span>
              <ChevronDown
                size={22}
                className={`text-white transition-transform duration-200 shrink-0 ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full z-30 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#B49167]/60 shadow-2xl py-1 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategoryId(cat.id);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3 text-base font-Merriweather transition-colors flex items-center justify-between ${
                      categoryId === cat.id
                        ? 'bg-[#B49167]/30 text-white font-medium'
                        : 'text-white/80 hover:bg-[#B49167]/20 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {categoryId === cat.id && (
                      <span className="w-2 h-2 rounded-full bg-[#B49167]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label
              htmlFor="post-content"
              className="text-white text-xl font-normal font-Merriweather leading-6 tracking-wide uppercase"
            >
              CONTENT
            </label>
            <div className="w-full flex flex-col justify-start items-end gap-2">
              <div className="w-full min-h-[140px] sm:min-h-[160px] px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                <textarea
                  id="post-content"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post… Markdown is supported......"
                  className="w-full h-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none resize-y leading-relaxed"
                />
              </div>
              <div className="text-white/70 text-xs font-normal font-Merriweather select-none">
                {content.length} chars
              </div>
            </div>
          </div>

          {/* IMAGE (optional) */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label
              htmlFor="post-image"
              className="text-white text-xl font-normal font-Merriweather leading-6 tracking-wide uppercase"
            >
              Image <span className="text-white/50 text-sm normal-case">(optional)</span>
            </label>
            <input
              id="post-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="text-white/80 text-sm font-Merriweather file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#B49167]/40 file:text-white file:cursor-pointer file:font-Merriweather"
            />
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/community/guild-gate')}
              className="relative group w-32 sm:w-36 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-[#755F48]"
            >
              <img
                src={buttonBorderSecondary}
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110"
              />
              <span className="relative z-10 text-white text-base font-normal font-Merriweather drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Cancel
              </span>
            </button>

            <div className="flex items-center justify-end gap-4 sm:gap-6">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-white/90 hover:text-white transition-colors text-base font-normal font-Merriweather cursor-pointer underline-offset-4 hover:underline"
              >
                {isDraftSaving ? 'Saving...' : 'Save draft'}
              </button>

              <button
                type="button"
                disabled={!canPublish}
                onClick={handleSubmit}
                className={`relative group w-36 sm:w-40 h-11 flex items-center justify-center select-none transition-all duration-150 rounded-xs ${
                  canPublish
                    ? 'cursor-pointer active:scale-95 bg-white text-neutral-950'
                    : 'opacity-40 cursor-not-allowed bg-white text-neutral-950'
                }`}
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-base font-normal font-Merriweather leading-none">
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

