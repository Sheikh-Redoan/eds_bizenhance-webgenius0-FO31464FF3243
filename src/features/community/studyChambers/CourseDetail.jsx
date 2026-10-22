import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight, Clock, Video } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import {
  useGetCourseQuery,
  useRequestToJoinCourseMutation,
  useCancelJoinRequestMutation,
} from '../../../redux/api/communityApi';
import Skeleton from '../../../components/ui/Skeleton';
import { getEnrollmentState } from '../utils/enrollmentState';
import { ENROLLMENT_STATE } from '../constants';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import { formatDate } from '../utils/formatters';

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

  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto space-y-6 my-4 px-2 sm:px-0">
        <Skeleton variant="title" />
        <Skeleton variant="card" className="h-64" />
        <Skeleton variant="card" className="h-44" />
      </div>
    );
  }

  const currentCourse = course || {
    id: courseId,
    title: 'Hello from Chittagong! Singer + beginner lyricist here',
    description:
      'I’ve been thinking about the moment when a technically accurate translation stops feeling musical. Is it the loss of rhythm, the shape of the vowels, or something less measurable?\nWhen you translate lyrics, which part do you protect first—and what are you willing to let change?',
    language: 'Spanish',
    level: 'Pitch accent',
    enrolledCount: 1,
    maxStudents: 20,
    startDate: '2026-06-26T18:00:00Z',
    instructor: {
      name: 'Melody Mim',
      role: 'teacher',
      avatar: 'https://placehold.co/40x40',
    },
    nextSession: {
      date: '2026-06-26T18:00:00Z',
      title: 'Metaphor, Memory & Melody',
      time: 'Thursday · 18:00 UTC · 75 minutes',
      description: 'Explore how figurative language survives translation through rhythm.',
      classLink: 'https://zoom.us/j/mock-spanish-chamber-session',
    },
  };

  const authorName = currentCourse.instructor?.name || 'Melody Mim';
  const authorAvatar = currentCourse.instructor?.avatar;
  const authorRole = currentCourse.instructor?.role || 'teacher';
  const enrolledCount = currentCourse.enrolledCount ?? 1;
  const maxStudents = currentCourse.maxStudents ?? 20;
  const isEnrollmentOpen = enrolledCount < maxStudents;

  // Session details
  const session = currentCourse.nextSession || {
    date: currentCourse.startDate || '2026-06-26T18:00:00Z',
    title: 'Metaphor, Memory & Melody',
    time: 'Thursday · 18:00 UTC · 75 minutes',
    description: 'Explore how figurative language survives translation through rhythm.',
    classLink: 'https://zoom.us/j/mock-session',
  };

  // Extract day and month for calendar block
  let sessionDay = '26';
  let sessionMonth = 'Jun';
  if (session.date) {
    const d = new Date(session.date);
    if (!isNaN(d.getTime())) {
      sessionDay = d.getDate().toString();
      sessionMonth = d.toLocaleString('en-US', { month: 'short' });
    }
  }

  const canAccessClassLink =
    enrollmentState === ENROLLMENT_STATE.APPROVED ||
    enrollmentState === ENROLLMENT_STATE.OWNER;

  const isPending = enrollmentState === ENROLLMENT_STATE.PENDING;
  const isOwner = enrollmentState === ENROLLMENT_STATE.OWNER;
  const isApproved = enrollmentState === ENROLLMENT_STATE.APPROVED;

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
          onClick={() => navigate('/community/study-chambers')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Study Chambers
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather uppercase">
          {currentCourse.language || 'SPANISH'}
        </span>
      </div>

      {/* 2. Main Course Info Container */}
      <div className="w-full flex flex-col justify-start items-start gap-8">
        {/* Top Overview Card */}
        <div className="w-full p-5 sm:p-6 bg-[#B49167]/30 border border-[#B49167]/50 flex flex-col justify-center items-start gap-5 sm:gap-6 shadow-sm">
          {/* Top Row: Author details & Enrollment Status */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left: Avatar + Instructor Name + Subtitle Meta */}
            <div className="flex items-center gap-3">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-10 h-10 rounded-sm object-cover border border-white shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-sm bg-stone-700 border border-white flex items-center justify-center text-white text-sm font-semibold shrink-0">
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

            {/* Right: Enrollment open + Starts date */}
            <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
              <div className="pb-0.5 border-b border-white/50 inline-flex items-center gap-1">
                <span className="text-white/70 text-[10px] sm:text-xs font-normal font-Merriweather">
                  Enrollment{' '}
                </span>
                <span className="text-white text-[10px] sm:text-xs font-normal font-Merriweather font-semibold">
                  {isEnrollmentOpen ? 'open' : 'closed'}
                </span>
              </div>
              <span className="text-white text-xs sm:text-sm font-normal font-Merriweather">
                {currentCourse.startDate ? `Starts ${formatDate(currentCourse.startDate)}` : 'Starts 26 June'}
              </span>
            </div>
          </div>

          {/* Middle Row: Tag Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {currentCourse.language && (
              <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
                <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
                  {currentCourse.language}
                </span>
              </div>
            )}
            {currentCourse.level && (
              <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
                <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
                  {currentCourse.level}
                </span>
              </div>
            )}
            <div className="px-2 py-0.5 border border-white/70 flex items-center justify-center">
              <span className="text-white/80 text-[10px] sm:text-xs font-normal font-Merriweather">
                {enrolledCount} students
              </span>
            </div>
          </div>

          {/* Separator & Course Title / Content */}
          <div className="w-full pt-4 border-t border-white/20 flex flex-col items-start gap-2 text-left">
            <h2 className="text-white text-lg sm:text-xl font-normal font-Merriweather leading-snug">
              {currentCourse.title}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm font-normal font-Merriweather leading-relaxed whitespace-pre-wrap max-w-4xl">
              {currentCourse.description}
            </p>
          </div>
        </div>

        {/* 3. Bottom Row: Upcoming Session + Join This Chamber */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left: Upcoming Session Card */}
          <div className="flex-1 p-5 sm:p-6 bg-[#B49167]/30 border border-[#B49167]/50 flex flex-col justify-between items-start gap-4 shadow-sm">
            <h3 className="text-white text-2xl font-normal font-MetalMania leading-10">
              Upcoming Session
            </h3>

            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Date Box + Session Details */}
              <div className="flex items-start sm:items-center gap-4">
                {/* White Calendar Block */}
                <div className="w-14 h-16 bg-white shrink-0 flex flex-col justify-center items-center shadow-xs">
                  <span className="text-neutral-950 text-xl font-semibold font-serif leading-none">
                    {sessionDay}
                  </span>
                  <span className="text-neutral-950 text-xs font-normal font-sans leading-tight mt-1">
                    {sessionMonth}
                  </span>
                </div>

                {/* Session Meta */}
                <div className="flex flex-col justify-start items-start gap-1 text-left">
                  <h4 className="text-white text-lg sm:text-xl font-normal font-Merriweather leading-snug">
                    {session.title}
                  </h4>
                  <span className="text-white/70 text-xs font-normal font-Merriweather leading-tight">
                    {session.time}
                  </span>
                  <p className="text-white/90 text-xs font-normal font-Merriweather leading-relaxed mt-1">
                    {session.description}
                  </p>
                </div>
              </div>

              {/* Class Link Ornate Button */}
              {canAccessClassLink ? (
                <a
                  href={session.classLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group w-32 sm:w-36 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white shrink-0 rounded-xs self-start sm:self-center"
                >
                  <img
                    src={buttonBorderSecondary}
                    alt=""
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                  />
                  <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                    Class Link
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Enrolled scholars only"
                  className="relative group w-32 sm:w-36 h-11 flex items-center justify-center opacity-60 cursor-not-allowed select-none bg-white shrink-0 rounded-xs self-start sm:self-center"
                >
                  <img
                    src={buttonBorderSecondary}
                    alt=""
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                  />
                  <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                    Class Link
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Join this chamber Card */}
          <div className="w-full lg:w-80 p-5 sm:p-6 bg-[#B49167]/30 border border-[#B49167]/50 flex flex-col justify-center items-center gap-3.5 text-center shadow-sm shrink-0">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-white text-xl font-normal font-MetalMania leading-tight">
                Join this chamber
              </h3>
              <p className="text-white/90 text-xs font-normal font-Merriweather leading-relaxed max-w-[260px]">
                {isOwner
                  ? 'You are the instructor for this chamber. Manage apprentice requests or launch class sessions.'
                  : isApproved
                  ? 'You are an enrolled scholar in this cohort. Group chat and live class link access are active.'
                  : isPending
                  ? 'Your enrollment petition has been submitted. Awaiting instructor review.'
                  : `Your request will be reviewed by Teacher ${authorName.split(' ')[0] || 'Sofia'}. Approved students gain group chat access.`}
              </p>
            </div>

            {/* Action Button: Request to Join */}
            {isOwner ? (
              <button
                type="button"
                onClick={() => navigate(`/community/study-chambers/courses/${currentCourse.id}/requests`)}
                className="relative group w-48 sm:w-52 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs"
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                  Manage Requests
                </span>
              </button>
            ) : isApproved ? (
              <button
                type="button"
                onClick={() => navigate(`/community/study-chambers/courses/${currentCourse.id}/chat`)}
                className="relative group w-48 sm:w-52 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs"
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                  Enter Group Chat
                </span>
              </button>
            ) : isPending ? (
              <button
                type="button"
                onClick={handleCancelJoin}
                disabled={isCancelling}
                className="relative group w-48 sm:w-52 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs"
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                  {isCancelling ? 'Cancelling...' : 'Cancel Request'}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRequestJoin}
                disabled={isRequesting}
                className="relative group w-48 sm:w-52 h-11 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 active:scale-95 bg-white rounded-xs"
              >
                <img
                  src={buttonBorderSecondary}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                />
                <span className="relative z-10 text-neutral-950 text-sm sm:text-base font-normal font-Merriweather leading-none">
                  {isRequesting ? 'Submitting...' : 'Request to Join'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

