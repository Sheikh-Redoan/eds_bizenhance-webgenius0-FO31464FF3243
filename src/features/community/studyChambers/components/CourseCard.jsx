import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import buttonBorderSecondary from '../../../../assets/images/Buttonbordersecoundary.png';
import { formatDate } from '../../utils/formatters';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Author details with fallback
  const authorName = course.instructor?.name || 'Melody Mim';
  const authorAvatar = course.instructor?.avatar;
  const authorRole = course.instructor?.role || 'teacher';
  const enrolledCount = course.enrolledCount ?? 1;
  const maxStudents = course.maxStudents ?? 20;
  const isEnrollmentOpen = enrolledCount < maxStudents;

  // Format date display
  const startDateText = course.startDate
    ? `Starts ${formatDate(course.startDate)}`
    : 'Starts 26 June';

  return (
    <div className="w-full bg-[#B49267]/30 border border-[#B49267]/50 p-5 sm:p-6 flex flex-col justify-start items-start gap-3.5 transition-all hover:bg-[#B49267]/35 shadow-sm">
      {/* Top Row: Author details & Enrollment Status */}
      <div className="w-full flex items-start justify-between gap-4">
        {/* Left: Author Avatar + Name + Subtitle meta */}
        <div className="flex items-center gap-3">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-9 h-9 rounded-sm object-cover border border-white shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-sm bg-stone-700 border border-white flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {authorName.charAt(0)}
            </div>
          )}

          <div className="flex flex-col justify-center items-start gap-1">
            <span className="text-white text-base font-medium font-sans leading-tight">
              {authorName}
            </span>

            <div className="flex flex-wrap items-center gap-2 text-white/70 text-xs font-normal font-Merriweather">
              <div className="flex items-center gap-1.5 capitalize">
                <span>Student</span>
                <span className="w-px h-3 bg-white/60 inline-block" />
                <span className="capitalize">{authorRole}</span>
              </div>

              <span className="w-1 h-1 bg-zinc-300 rounded-full inline-block" />

              <div className="inline-flex items-center gap-1">
                <Clock size={11} className="text-white/70 shrink-0" />
                <span>21h ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Enrollment open + Start date */}
        <div className="flex flex-col items-end gap-1 text-right shrink-0">
          <div className="pb-0.5 border-b border-white/50 inline-flex items-center gap-1">
            <span className="text-white/70 text-[10px] sm:text-xs font-normal font-Merriweather">
              Enrollment{' '}
            </span>
            <span className="text-white text-[10px] sm:text-xs font-normal font-Merriweather font-semibold">
              {isEnrollmentOpen ? 'open' : 'closed'}
            </span>
          </div>
          <span className="text-white text-xs sm:text-sm font-normal font-Merriweather">
            {startDateText}
          </span>
        </div>
      </div>

      {/* Middle Row: Tag Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {course.language && (
          <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
            <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
              {course.language}
            </span>
          </div>
        )}
        {course.level && (
          <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
            <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
              {course.level}
            </span>
          </div>
        )}
        <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
          <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
            {enrolledCount} students
          </span>
        </div>
      </div>

      {/* Bottom Row: Course Title & Description + View Course Button */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-1">
        <div className="flex-1 flex flex-col items-start gap-1.5 text-left">
          <h3
            onClick={() => navigate(`/community/study-chambers/courses/${course.id}`)}
            className="text-white text-base sm:text-lg font-normal font-Merriweather hover:underline cursor-pointer leading-snug"
          >
            {course.title}
          </h3>
          <p className="text-white/70 text-xs sm:text-sm font-normal font-Merriweather leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Ornate View course Button */}
        <button
          type="button"
          onClick={() => navigate(`/community/study-chambers/courses/${course.id}`)}
          className="relative group w-32 sm:w-36 h-8 sm:h-9 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white shrink-0 rounded-xs"
        >
          <img
            src={buttonBorderSecondary}
            alt=""
            className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
          />
          <span className="relative z-10 inline-flex items-center gap-1.5 text-neutral-950 text-xs sm:text-sm font-normal font-Merriweather leading-none">
            <span>View course</span>
            <ChevronRight size={14} className="text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

