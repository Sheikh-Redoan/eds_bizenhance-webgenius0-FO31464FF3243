import React from 'react';
import { Calendar, Users, Video, ExternalLink } from 'lucide-react';
import DateBlock from '../../components/DateBlock';
import { ENROLLMENT_STATE } from '../../constants';

export const UpcomingSession = ({ session, enrollmentState }) => {
  if (!session) return null;

  const canAccessClassLink =
    enrollmentState === ENROLLMENT_STATE.APPROVED ||
    enrollmentState === ENROLLMENT_STATE.OWNER;

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#faf6ee] border border-amber-900/30 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <Calendar size={13} />
          <span>Upcoming Class Gathering</span>
        </span>
        <span className="text-xs font-serif text-stone-500">Live Cohort Session</span>
      </div>

      <div className="flex items-start gap-4">
        <DateBlock date={session.date} />

        <div className="space-y-1 flex-1">
          <h4 className="text-base font-serif font-bold text-stone-900">
            {session.title}
          </h4>
          <p className="text-xs font-serif text-stone-600">
            Time: {session.time}
          </p>

          <div className="pt-2">
            {canAccessClassLink ? (
              <a
                href={session.classLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold bg-teal-800 hover:bg-teal-700 text-teal-100 transition-colors shadow-2xs"
              >
                <Video size={13} />
                <span>Launch Live Class Room</span>
                <ExternalLink size={11} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif bg-stone-200 text-stone-600 border border-stone-300">
                <Video size={13} />
                <span>Class Link protected (Enrolled scholars only)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSession;
