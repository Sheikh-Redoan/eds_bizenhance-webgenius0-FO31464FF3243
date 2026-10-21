import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Shield, Clock } from 'lucide-react';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Button from '../../../components/ui/Button';
import ParchmentPanel from '../components/ParchmentPanel';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';
import { useGetCourseQuery } from '../../../redux/api/communityApi';

export const ManageRequests = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: course } = useGetCourseQuery(courseId);

  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      studentName: 'Julian Mercer',
      studentRole: 'student',
      submittedAt: '2 hours ago',
      experience: 'Intermediate Spanish learner. Loves romantic boleros and wants to refine accent.',
      status: 'pending',
    },
    {
      id: 'req-2',
      studentName: 'Lyra Silvertongue',
      studentRole: 'student',
      submittedAt: '1 day ago',
      experience: 'Studying Romance linguistics at academy. Eager for rhythmic poetry analysis.',
      status: 'pending',
    },
  ]);

  const handleDecide = (requestId, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const breadcrumbs = [
    { label: 'Study Chambers', to: '/community/study-chambers' },
    { label: course?.title || 'Course', to: `/community/study-chambers/courses/${courseId}` },
    { label: 'Manage Petitions' },
  ];

  return (
    <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.ADMIN]} showNotice>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button
            type="button"
            onClick={() => navigate(`/community/study-chambers/courses/${courseId}`)}
            className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Return to Course</span>
          </button>
        </div>

        <ParchmentPanel className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Apprentice Admission Petitions
            </h1>
            <p className="text-xs font-serif text-stone-600 mt-0.5">
              Review and decide scholar applications for <strong>{course?.title || 'this cohort'}</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-white/80 border border-stone-300 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {req.studentName}
                    </h3>
                    <span className="text-[11px] font-sans text-stone-500">
                      Petitioned {req.submittedAt}
                    </span>
                  </div>

                  <span className={`text-xs font-serif font-bold px-2.5 py-0.5 rounded capitalize ${
                    req.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'denied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-xs font-serif text-stone-700 bg-amber-50/60 p-3 rounded border border-amber-900/10">
                  {req.experience}
                </p>

                {req.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleDecide(req.id, 'denied')}
                      className="px-3 py-1.5 rounded text-xs font-serif text-red-700 hover:bg-red-50 border border-red-200 flex items-center gap-1"
                    >
                      <X size={13} />
                      <span>Decline</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecide(req.id, 'approved')}
                      className="px-4 py-1.5 rounded text-xs font-serif bg-emerald-800 hover:bg-emerald-700 text-emerald-100 flex items-center gap-1"
                    >
                      <Check size={13} />
                      <span>Approve Scholar</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ParchmentPanel>
      </div>
    </RoleGate>
  );
};

export default ManageRequests;
