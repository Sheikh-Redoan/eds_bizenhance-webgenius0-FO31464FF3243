import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { THREAD_WINGS } from '../config/wings';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { toggleSaveThread, selectSavedThreads } from '../state/communitySlice';
import {
  useGetThreadQuery,
  useUpdateThreadStatusMutation,
} from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import ThreadHeader from './components/ThreadHeader';
import ThreadBody from './components/ThreadBody';
import ReplyComposer from '../components/ReplyComposer';
import ReplyList from '../components/ReplyList';
import ReportModal from '../components/ReportModal';
import ParchmentPanel from '../components/ParchmentPanel';
import Skeleton from '../../../components/ui/Skeleton';
import RoleGate from '../components/RoleGate';
import { hasRole } from '../permissions';
import { ROLES, THREAD_STATUS } from '../constants';

export const ThreadDetail = ({ wing: propWing }) => {
  const { wing: paramWing, threadId } = useParams();
  const wing = propWing || paramWing;
  const config = THREAD_WINGS[wing];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const savedThreads = useSelector(selectSavedThreads);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [localReplies, setLocalReplies] = useState([]);

  const { data: thread, isLoading } = useGetThreadQuery({ wing, id: threadId });
  const [updateStatus] = useUpdateThreadStatusMutation();

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center font-serif">
        <p className="text-red-700">Unknown wing chamber: {wing}</p>
      </div>
    );
  }

  const isSaved = savedThreads.includes(threadId);
  const isAdmin = hasRole(user, ROLES.ADMIN);

  const handleToggleSave = () => {
    dispatch(toggleSaveThread(threadId));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Scroll link copied to clipboard.');
    }
  };

  const handleStatusChange = (newStatus) => {
    updateStatus({ wing, threadId, status: newStatus });
  };

  const handleReplySubmit = (content) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      author: {
        id: user?._id || user?.id || 'anon',
        name: user?.name || 'Guild Member',
        role: user?.role || 'student',
        avatar: user?.avatar || '',
      },
    };
    setLocalReplies((prev) => [...prev, newReply]);
  };

  const breadcrumbs = [
    { label: config.label, to: `/community/${wing}` },
    { label: thread?.title || 'Dispatch' },
  ];

  const allReplies = [...(thread?.replies || []), ...localReplies];

  return (
    <RoleGate allowedRoles={config.access} showNotice>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button
            type="button"
            onClick={() => navigate(`/community/${wing}`)}
            className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Return to {config.label}</span>
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="title" />
            <Skeleton variant="card" className="h-64" />
          </div>
        ) : !thread ? (
          <div className="text-center py-12 font-serif text-stone-700">
            Dispatch scroll not found in the archives.
          </div>
        ) : (
          <>
            <ParchmentPanel>
              {/* Admin status controller for Support Wing */}
              {config.hasStatus && isAdmin && (
                <div className="mb-4 p-3 bg-amber-100/70 border border-amber-300 rounded-lg flex items-center justify-between gap-3 text-xs font-serif">
                  <span className="font-bold text-amber-950">
                    Overseer Status Control:
                  </span>
                  <div className="flex items-center gap-2">
                    {Object.values(THREAD_STATUS).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(st)}
                        className={`px-2.5 py-1 rounded capitalize font-semibold transition-all ${
                          thread.status === st
                            ? 'bg-amber-900 text-amber-100'
                            : 'bg-white/80 hover:bg-white text-stone-700'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <ThreadHeader
                title={thread.title}
                tags={thread.tags}
                author={thread.author}
                createdAt={thread.createdAt}
                views={thread.views}
                repliesCount={allReplies.length}
                status={thread.status}
                hasStatus={config.hasStatus}
              />

              <ThreadBody
                content={thread.content}
                likes={thread.likes}
                isSaved={isSaved}
                onToggleSave={handleToggleSave}
                onShare={handleShare}
                onReport={() => setIsReportOpen(true)}
              />
            </ParchmentPanel>

            <ReplyList replies={allReplies} />

            <ReplyComposer onSubmit={handleReplySubmit} />

            <ReportModal
              isOpen={isReportOpen}
              onClose={() => setIsReportOpen(false)}
              targetType="dispatch"
            />
          </>
        )}
      </div>
    </RoleGate>
  );
};

export default ThreadDetail;
