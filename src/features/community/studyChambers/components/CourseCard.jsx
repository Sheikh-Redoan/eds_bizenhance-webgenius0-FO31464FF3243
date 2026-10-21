import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import FramedCard from '../../components/FramedCard';
import { formatDate } from '../../utils/formatters';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <FramedCard
      onClick={() => navigate(`/community/study-chambers/courses/${course.id}`)}
      className="flex flex-col justify-between h-72 group"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            {course.language}
          </span>
          <span className="text-xs font-serif text-stone-500">
            {course.level}
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="font-serif text-xs text-stone-600 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs font-serif text-stone-600">
        <div className="flex items-center justify-between">
          <span>Instructor: <strong>{course.instructor?.name}</strong></span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-stone-400" />
            <span>{course.enrolledCount}/{course.maxStudents}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 text-amber-950 font-bold group-hover:translate-x-1 transition-transform">
          <span className="text-[11px] font-normal text-stone-500 flex items-center gap-1">
            <Calendar size={11} />
            <span>Starts {formatDate(course.startDate)}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>View Syllabus</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </FramedCard>
  );
};

export default CourseCard;
