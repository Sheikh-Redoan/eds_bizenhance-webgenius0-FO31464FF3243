import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, BookOpen, Users, CheckCircle, Shield } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import {
  useGetCourseQuery,
  useRequestToJoinCourseMutation,
  useCancelJoinRequestMutation,
} from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import ParchmentPanel from '../components/ParchmentPanel';
import CourseHeader from './components/CourseHeader';
import UpcomingSession from './components/UpcomingSession';
import JoinChamberCard from './components/JoinChamberCard';
import Skeleton from '../../../components/ui/Skeleton';
import { getEnrollmentState } from '../utils/enrollmentState';
import { pluralize } from '../utils/formatters';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const { data: course, isLoading } = useGetCourseQuery(courseId);
  const [requestJoin, { isLoading: isRequesting }] = useRequestToJoinCourseMutation();
  const [cancelJoin, { isLoading: isCancelling }] = useCancelJoinRequestMutation();

  const enrollmentState = getEnrollmentState(course, user);

  const handleRequestJoin = async () => {
    try {
      await requestJoin({ courseId }).unwrap();
    } catch (err) {
      console.error('Failed to request join:', err);
    }
  };

  const handleCancelJoin = async () => {
    try {
      await cancelJoin({ courseId }).unwrap();
    } catch (err) {
      console.error('Failed to cancel join:', err);
    }
  };

  const breadcrumbs = [
    { label: 'Study Chambers', to: '/community/study-chambers' },
    { label: course?.language ? `${course.language.toUpperCase()} • ${course.title}` : 'Course' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate('/community/study-chambers')}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Return to Chambers</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : !course ? (
        <div className="text-center py-12 font-serif text-stone-700">
          Chamber syllabus not found in archives.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ParchmentPanel className="space-y-6">
              <CourseHeader course={course} />

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  Course Synopsis & Methodology
                </h3>
                <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {course.description}
                </p>
              </div>

              {course.syllabus && (
                <div className="space-y-3 pt-3 border-t border-amber-900/10">
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Syllabus Outline
                  </h4>
                  <ul className="space-y-2">
                    {course.syllabus.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-serif text-stone-700"
                      >
                        <CheckCircle size={15} className="text-amber-800 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ParchmentPanel>

            <UpcomingSession
              session={course.nextSession}
              enrollmentState={enrollmentState}
            />
          </div>

          <div className="space-y-6">
            <JoinChamberCard
              course={course}
              enrollmentState={enrollmentState}
              onRequestJoin={handleRequestJoin}
              onCancelRequest={handleCancelJoin}
              isLoading={isRequesting || isCancelling}
            />

            <ParchmentPanel padded={false} className="p-4 space-y-3">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-900">
                Chamber Demographics
              </h4>
              <div className="space-y-2 text-xs font-serif text-stone-600">
                <div className="flex justify-between">
                  <span>Enrolled:</span>
                  <span className="font-bold text-stone-900">
                    {pluralize(course.enrolledCount || 0, 'scholar')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Proficiency:</span>
                  <span className="font-bold text-stone-900">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-bold text-stone-900">Live Video + Group Chat</span>
                </div>
              </div>
            </ParchmentPanel>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
