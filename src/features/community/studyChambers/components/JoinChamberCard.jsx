import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, Users, MessageSquare, Shield } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import { ENROLLMENT_STATE } from '../../constants';

export const JoinChamberCard = ({
  course,
  enrollmentState,
  onRequestJoin,
  onCancelRequest,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-xl bg-[#faf6ee] border-2 border-amber-900/40 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/20">
        <div>
          <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-amber-900">
            Chamber Enrollment
          </span>
          <h4 className="font-serif font-bold text-lg text-stone-900">
            Cohort Participation
          </h4>
        </div>

        <div className="text-right">
          <span className="text-xs font-serif text-stone-500 block">Class Capacity</span>
          <span className="text-sm font-serif font-bold text-stone-800">
            {course.enrolledCount || 0} / {course.maxStudents || 20} Scholars
          </span>
        </div>
      </div>

      {/* State-driven actions */}
      {enrollmentState === ENROLLMENT_STATE.OWNER && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs font-serif text-blue-900 flex items-center gap-2">
            <Shield size={16} />
            <span>You are the designated Instructor for this Study Chamber.</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="ornate"
              onClick={() => navigate(`/community/study-chambers/courses/${course.id}/requests`)}
              className="w-full py-2.5 text-xs"
            >
              Manage Apprentice Requests
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/community/study-chambers/courses/${course.id}/chat`)}
              className="w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>Enter Cohort Group Chat</span>
            </Button>
          </div>
        </div>
      )}

      {enrollmentState === ENROLLMENT_STATE.APPROVED && (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-serif text-emerald-900 flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>You are an approved scholar in this cohort.</span>
          </div>
          <Button
            variant="ornate"
            onClick={() => navigate(`/community/study-chambers/courses/${course.id}/chat`)}
            className="w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
          >
            <MessageSquare size={14} />
            <span>Open Cohort Group Chat</span>
          </Button>
        </div>
      )}

      {enrollmentState === ENROLLMENT_STATE.PENDING && (
        <div className="space-y-3">
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs font-serif text-amber-900 flex items-center gap-2">
            <Clock size={16} />
            <span>Enrollment petition submitted. Awaiting instructor review.</span>
          </div>
          <button
            type="button"
            onClick={onCancelRequest}
            disabled={isLoading}
            className="w-full text-center text-xs font-serif text-stone-600 hover:text-red-700 underline transition-colors cursor-pointer"
          >
            Cancel Join Petition
          </button>
        </div>
      )}

      {enrollmentState === ENROLLMENT_STATE.NONE && (
        <div className="space-y-3">
          <p className="text-xs font-serif text-stone-600 leading-relaxed">
            Submit a petition to join this cohort. The instructor reviews background and linguistic intent before granting entry.
          </p>
          <Button
            variant="ornate"
            onClick={onRequestJoin}
            disabled={isLoading}
            className="w-full py-2.5 text-sm"
          >
            {isLoading ? 'Submitting Petition...' : 'Request to Join Chamber'}
          </Button>
        </div>
      )}

      {enrollmentState === ENROLLMENT_STATE.FULL && (
        <div className="p-3 bg-stone-200/80 border border-stone-300 rounded-lg text-xs font-serif text-stone-700 text-center">
          This study chamber has reached maximum capacity. Check back for future cohorts.
        </div>
      )}

      {enrollmentState === ENROLLMENT_STATE.DENIED && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-serif text-red-800 text-center flex items-center justify-center gap-1.5">
          <XCircle size={14} />
          <span>Petition not approved for this semester cohort.</span>
        </div>
      )}
    </div>
  );
};

export default JoinChamberCard;
