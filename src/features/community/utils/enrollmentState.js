import { ENROLLMENT_STATE } from '../constants';

export const getEnrollmentState = (course, user, joinRequest = null) => {
  if (!user) return ENROLLMENT_STATE.NONE;
  if (!course) return ENROLLMENT_STATE.NONE;

  const userId = user._id || user.id;

  // Is user the instructor / course owner?
  if (course.instructorId === userId || course.author?.id === userId) {
    return ENROLLMENT_STATE.OWNER;
  }

  // Is user already enrolled?
  if (course.enrolledStudents?.includes(userId) || course.isEnrolled) {
    return ENROLLMENT_STATE.APPROVED;
  }

  // Check specific request object if passed
  if (joinRequest) {
    if (joinRequest.status === 'pending') return ENROLLMENT_STATE.PENDING;
    if (joinRequest.status === 'approved') return ENROLLMENT_STATE.APPROVED;
    if (joinRequest.status === 'denied') return ENROLLMENT_STATE.DENIED;
  }

  // Check course level flags
  if (course.userRequestStatus === 'pending') return ENROLLMENT_STATE.PENDING;
  if (course.userRequestStatus === 'denied') return ENROLLMENT_STATE.DENIED;

  if (course.status === 'closed') return ENROLLMENT_STATE.CLOSED;
  if (course.maxStudents && (course.enrolledCount || 0) >= course.maxStudents) {
    return ENROLLMENT_STATE.FULL;
  }

  return ENROLLMENT_STATE.NONE;
};
