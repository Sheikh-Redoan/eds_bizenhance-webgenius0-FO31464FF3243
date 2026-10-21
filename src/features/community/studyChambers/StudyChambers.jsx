import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, GraduationCap } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import CourseCard from './components/CourseCard';
import Tabs from '../../../components/ui/Tabs';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetCoursesQuery } from '../../../redux/api/communityApi';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const StudyChambers = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('All');

  const { data: courses = [], isLoading } = useGetCoursesQuery();

  const languages = [
    { id: 'All', label: 'All Languages' },
    { id: 'Spanish', label: 'Spanish' },
    { id: 'French', label: 'French' },
    { id: 'Korean', label: 'Korean' },
    { id: 'Japanese', label: 'Japanese' },
  ];

  const filteredCourses = courses.filter((c) => {
    if (selectedLang === 'All') return true;
    return c.language.toLowerCase() === selectedLang.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <WingBanner
        icon={BookOpen}
        tag="STUDY CHAMBERS"
        title="The Study Chambers"
        subtitle="Cohorts and language seminars led by certified guild teachers. Enhance lyrical comprehension, grammar, and pronunciation in live group sessions."
        actions={
          <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.ADMIN]}>
            <Button
              variant="ornate"
              onClick={() => navigate('/community/study-chambers/courses/new')}
              className="px-5 py-2.5 text-sm flex items-center gap-2"
            >
              <Plus size={15} />
              <span>Create Course Chamber</span>
            </Button>
          </RoleGate>
        }
      />

      <div className="flex items-center justify-between">
        <Tabs
          tabs={languages}
          activeTab={selectedLang}
          onChange={setSelectedLang}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" className="h-72" />
          <Skeleton variant="card" className="h-72" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          title="No Study Chambers found"
          description="There are currently no active cohorts for this dialect. Check back or request a session from a master teacher."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyChambers;
