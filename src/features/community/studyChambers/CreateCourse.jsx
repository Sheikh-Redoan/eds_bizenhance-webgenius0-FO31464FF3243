import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useCreateCourseMutation } from '../../../redux/api/communityApi';
import { saveDraft } from '../state/communitySlice';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

const LANGUAGES = ['Spanish', 'French', 'Japanese', 'Korean'];

export const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [dateTime, setDateTime] = useState('26 June · 18:00 UTC');
  const [classLink, setClassLink] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const [createCourse, { isLoading: isSubmitting }] = useCreateCourseMutation();

  const handleSaveDraft = () => {
    setIsDraftSaving(true);
    dispatch(
      saveDraft({
        type: 'courses',
        id: 'new_course',
        data: { title, topic, description, language, dateTime, classLink },
      })
    );
    setTimeout(() => {
      setIsDraftSaving(false);
    }, 400);
  };

  const handleCancel = () => {
    navigate('/community/study-chambers');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim() || !description.trim() || isSubmitting) return;

    try {
      await createCourse({
        title: title.trim(),
        description: description.trim(),
        language,
        level: topic || 'Language through music',
        maxStudents: 20,
        startDate: '2026-06-26T18:00:00Z',
        schedule: dateTime || 'Every Thursday, 18:00 UTC',
        instructor: {
          id: user?._id || user?.id || 'inst-current',
          name: user?.name || 'Melody Mim',
          role: user?.role || 'teacher',
          avatar: user?.avatar || '',
        },
        instructorId: user?._id || user?.id,
        nextSession: {
          date: '2026-06-26T18:00:00Z',
          title: `Session 1: ${title.trim()}`,
          time: dateTime || 'Thursday · 18:00 UTC · 75 minutes',
          description: description.slice(0, 120),
          classLink: classLink || 'https://zoom.us/...',
        },
        tags: [language, topic || 'Music'].filter(Boolean),
      }).unwrap();

      navigate('/community/study-chambers');
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const canPublish = Boolean(title.trim() && description.trim() && !isSubmitting);

  return (
    <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.ADMIN]} showNotice>

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
            onClick={() => navigate('/community/study-chambers')}
            className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
          >
            The Study Chambers
          </button>

          <ChevronRight size={18} className="text-white shrink-0" />

          <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
            Create Course
          </span>
        </div>

        {/* 2. Main Form Container */}
        <div className="w-full flex flex-col justify-start items-start gap-6">
          {/* Title Heading: Create Study Session */}
          <h1 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide">
            Create Study Session
          </h1>

          {/* Inputs Stack */}
          <div className="w-full flex flex-col justify-start items-start gap-6">
            {/* Row 1: Course / Session title & Topic */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Title Field */}
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <label
                  htmlFor="course-title"
                  className="text-white text-xl font-normal font-Merriweather leading-6"
                >
                  Course / Session title
                </label>
                <div className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                  <input
                    id="course-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Spanish Through Song"
                    className="w-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Topic Field */}
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <label
                  htmlFor="course-topic"
                  className="text-white text-xl font-normal font-Merriweather leading-6"
                >
                  Topic
                </label>
                <div className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                  <input
                    id="course-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Language through music"
                    className="w-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Description Textarea */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <label
                htmlFor="course-description"
                className="text-white text-xl font-normal font-Merriweather leading-6"
              >
                Description
              </label>
              <div className="w-full min-h-[130px] sm:min-h-[140px] px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                <textarea
                  id="course-description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will students learn?"
                  className="w-full h-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none resize-y leading-relaxed"
                />
              </div>
            </div>

            {/* Row 3: Language & Date & time */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Language Dropdown */}
              <div className="w-full flex flex-col justify-start items-start gap-3 relative">
                <label className="text-white text-xl font-normal font-Merriweather leading-6">
                  Language
                </label>
                <button
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 flex justify-between items-center text-left cursor-pointer transition-all hover:bg-[#B49167]/40 focus:outline-none"
                >
                  <span className="text-white text-base font-normal font-Merriweather leading-relaxed">
                    {language}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`text-white transition-transform duration-200 shrink-0 ${isLangOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Language Dropdown Menu */}
                {isLangOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full z-30 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#B49167]/60 shadow-2xl py-1 max-h-56 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 text-base font-Merriweather transition-colors flex items-center justify-between ${language === lang
                            ? 'bg-[#B49167]/30 text-white font-medium'
                            : 'text-white/80 hover:bg-[#B49167]/20 hover:text-white'
                          }`}
                      >
                        <span>{lang}</span>
                        {language === lang && (
                          <span className="w-2 h-2 rounded-full bg-[#B49167]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date & Time Field */}
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <label
                  htmlFor="course-datetime"
                  className="text-white text-xl font-normal font-Merriweather leading-6"
                >
                  Date & time
                </label>
                <div className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                  <input
                    id="course-datetime"
                    type="text"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    placeholder="26 June · 18:00 UTC"
                    className="w-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: External class link */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <label
                htmlFor="course-link"
                className="text-white text-xl font-normal font-Merriweather leading-6"
              >
                External class link
              </label>
              <div className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-[#B49167]/30 border border-[#B49167]/50 focus-within:border-[#B49167] transition-all">
                <input
                  id="course-link"
                  type="text"
                  value={classLink}
                  onChange={(e) => setClassLink(e.target.value)}
                  placeholder="https://zoom.us/..."
                  className="w-full bg-transparent text-white text-base font-normal font-Merriweather placeholder:text-white/40 focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Row 5: Actions Bottom Bar */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
              {/* Left: Cancel Button (Ornate Brown Framed Button) */}
              <button
                type="button"
                onClick={handleCancel}
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

              {/* Right: Save Draft & Publish Course */}
              <div className="flex items-center justify-end gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="text-white/90 hover:text-white transition-colors text-base font-normal font-Merriweather cursor-pointer underline-offset-4 hover:underline"
                >
                  {isDraftSaving ? 'Saving...' : 'Save draft'}
                </button>

                {/* Publish Course Button */}
                <button
                  type="button"
                  disabled={!canPublish}
                  onClick={handleSubmit}
                  className={`relative group w-40 sm:w-44 h-11 flex items-center justify-center select-none transition-all duration-150 rounded-xs ${canPublish
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
                    {isSubmitting ? 'Publishing...' : 'Publish Course'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGate>

  );
};

export default CreateCourse;

