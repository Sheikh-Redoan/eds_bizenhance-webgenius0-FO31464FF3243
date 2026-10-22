import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CourseCard from './components/CourseCard';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetCoursesQuery } from '../../../redux/api/communityApi';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import studyChambersBannerImg from '../../../assets/images/study_chambers.jpg';

export const StudyChambers = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('ALL LANGUAGES');

  const { data: courses = [], isLoading } = useGetCoursesQuery();

  const tabs = [
    { id: 'ALL LANGUAGES', label: 'ALL LANGUAGES' },
    { id: 'SPANISH', label: 'SPANISH' },
    { id: 'FRENCH', label: 'FRENCH' },
    { id: 'JAPANESE', label: 'JAPANESE' },
    { id: 'KOREAN', label: 'KOREAN' },
  ];

  const filteredCourses = courses.filter((c) => {
    if (selectedLang === 'ALL LANGUAGES') return true;
    return (c.language || '').toUpperCase() === selectedLang;
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
          The Study Chambers
        </span>
      </div>

      {/* 2. Panoramic Banner Card */}
      <div className="w-full h-52 sm:h-56 relative rounded-sm overflow-hidden outline outline-[3px] outline-offset-[-3px] outline-stone-400 shadow-2xl">
        <img
          src={studyChambersBannerImg}
          alt="The Study Chambers"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-black/20 border-2 border-white" />

        {/* Banner Text Content */}
        <div className="relative z-10 w-full h-full px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-end items-start gap-1 text-left">
          <h1 className="text-white text-3xl sm:text-5xl font-normal font-OldLondon leading-[1.1] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Study Chambers
          </h1>
          <p className="text-white/90 text-sm sm:text-lg md:text-xl font-normal font-Merriweather leading-snug drop-shadow-sm">
            Language questions, practice, study methods
          </p>
        </div>
      </div>

      {/* 3. Open Chambers Section */}
      <div className="w-full flex flex-col justify-start items-start gap-5">
        {/* White Bar with Title + Create Course Button */}
        <div className="w-full px-5 sm:px-6 py-3.5 bg-white rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex flex-col justify-start items-start text-left">
            <h2 className="text-neutral-950 text-2xl sm:text-3xl font-normal font-MetalMania leading-tight">
              Open Chambers
            </h2>
            <p className="text-neutral-950/80 text-xs sm:text-sm md:text-base font-normal font-Merriweather leading-snug">
              Discover what is happening across the Guild today.
            </p>
          </div>

          {/* Ornate Button: CREATE COURSE */}
          <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.ADMIN]} fallback={null}>
            <button
              type="button"
              onClick={() => navigate('/community/study-chambers/courses/new')}
              className="relative group w-44 sm:w-48 h-10 sm:h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 shrink-0 bg-[#755F48]"
            >
              <img
                src={buttonBorderSecondary}
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110"
              />
              <span className="relative z-10 text-white text-xs sm:text-sm font-normal font-Merriweather uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Create course
              </span>
            </button>
          </RoleGate>
        </div>

        {/* 4. Tab Strip */}
        <div className="w-full border-b border-stone-400/40 flex items-end overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = selectedLang === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedLang(tab.id)}
                className={`px-4 sm:px-6 py-3 font-Merriweather text-sm sm:text-base cursor-pointer whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${isActive
                    ? 'text-white border-stone-300 font-semibold'
                    : 'text-white/70 hover:text-white border-transparent'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 5. Courses List */}
        {isLoading ? (
          <div className="w-full space-y-4 pt-2">
            <Skeleton variant="card" className="h-44" />
            <Skeleton variant="card" className="h-44" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="w-full py-8">
            <EmptyState
              title="No Study Chambers found"
              description="There are currently no active cohorts for this dialect. Check back or request a session from a master teacher."
              actionLabel="Create Course"
              onAction={() => navigate('/community/study-chambers/courses/new')}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 sm:gap-5 pt-1">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyChambers;

