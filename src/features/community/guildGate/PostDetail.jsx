import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Share2, Flag } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useGetPostQuery } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import AuthorMeta from '../components/AuthorMeta';
import TagChip from '../components/TagChip';
import LikeButton from '../components/LikeButton';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ReplyComposer from '../components/ReplyComposer';
import ReplyList from '../components/ReplyList';
import ReportModal from '../components/ReportModal';
import ParchmentPanel from '../components/ParchmentPanel';
import Skeleton from '../../../components/ui/Skeleton';

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [replies, setReplies] = useState([
    {
      id: 'rep-init-1',
      author: {
        id: 'u-99',
        name: 'Master Kenji',
        role: 'teacher',
        avatar: '',
      },
      content: 'Splendid analysis! The rhythmic cadence and syllabic metric in the second verse also mirror classical trochaic meter.',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      likes: 6,
    },
  ]);

  const { data: post, isLoading } = useGetPostQuery(postId);

  const handleReplySubmit = (content) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      author: {
        id: user?._id || user?.id || 'anon',
        name: user?.name || 'Guild Traveler',
        role: user?.role || 'student',
        avatar: user?.avatar || '',
      },
    };
    setReplies((prev) => [...prev, newReply]);
  };

  const breadcrumbs = [
    { label: 'Guild Gate', to: '/community/guild-gate' },
    { label: post?.title || 'Post' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate('/community/guild-gate')}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Return to Gate</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="card" className="h-64" />
        </div>
      ) : !post ? (
        <div className="text-center py-12 font-serif text-stone-700">
          Post not found in the gate records.
        </div>
      ) : (
        <>
          <ParchmentPanel className="space-y-6">
            <div className="space-y-3 pb-4 border-b border-amber-900/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-serif font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                {(post.tags || []).map((t) => (
                  <TagChip key={t} label={t} />
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <AuthorMeta author={post.author} createdAt={post.createdAt} />
                <span className="text-xs font-serif text-stone-500">
                  {post.views || 0} views • {replies.length} replies
                </span>
              </div>
            </div>

            <MarkdownRenderer content={post.content} className="text-base" />

            <div className="flex items-center justify-between pt-4 border-t border-amber-900/10">
              <LikeButton initialCount={post.likes || 0} />
              <div className="flex items-center gap-2 text-stone-600">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Post scroll link copied.');
                  }}
                  className="p-2 rounded-full hover:bg-stone-200"
                >
                  <Share2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="p-2 rounded-full hover:bg-red-100 text-stone-500 hover:text-red-700"
                >
                  <Flag size={15} />
                </button>
              </div>
            </div>
          </ParchmentPanel>

          <ReplyList replies={replies} />
          <ReplyComposer onSubmit={handleReplySubmit} />

          <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            targetType="post"
          />
        </>
      )}
    </div>
  );
};

export default PostDetail;
