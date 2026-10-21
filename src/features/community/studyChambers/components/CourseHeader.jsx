import React from 'react';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';
import AuthorMeta from '../../components/AuthorMeta';
import TagChip from '../../components/TagChip';
import { formatDate } from '../../utils/formatters';

export const CourseHeader = ({ course }) => {
  return (
    <div className="space-y-4 pb-6 border-b border-amber-900/20">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-serif font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {course.language}
          </span>
          <span className="text-xs font-serif font-semibold text-stone-600 bg-stone-200/80 px-2.5 py-1 rounded-full">
            {course.level}
          </span>
          {(course.tags || []).map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-serif text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
          <Calendar size={13} />
          <span>Starts {formatDate(course.startDate)}</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
        {course.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <AuthorMeta author={course.instructor} />
        <span className="text-xs font-serif text-stone-600">
          Regular Schedule: <strong className="text-stone-800">{course.schedule}</strong>
        </span>
      </div>
    </div>
  );
};

export default CourseHeader;
