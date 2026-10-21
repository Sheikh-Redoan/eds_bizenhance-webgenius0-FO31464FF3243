import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Send, ArrowLeft } from 'lucide-react';
import { THREAD_WINGS } from '../config/wings';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { saveDraft, discardDraft } from '../state/communitySlice';
import { useCreateThreadMutation } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import MarkdownEditor from '../components/MarkdownEditor';
import TagSelector from './components/TagSelector';
import DraftActions from '../components/DraftActions';
import ParchmentPanel from '../components/ParchmentPanel';
import RoleGate from '../components/RoleGate';

export const NewThread = ({ wing: propWing }) => {
  const { wing: paramWing } = useParams();
  const wing = propWing || paramWing;
  const config = THREAD_WINGS[wing];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const [createThread, { isLoading: isSubmitting }] = useCreateThreadMutation();

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center font-serif">
        <p className="text-red-700">Unknown wing chamber: {wing}</p>
        <Button onClick={() => navigate('/community')} className="mt-4">
          Return to Guild
        </Button>
      </div>
    );
  }

  const handleSaveDraft = () => {
    setIsDraftSaving(true);
    dispatch(
      saveDraft({
        type: 'threads',
        id: wing,
        data: { title, content, selectedTags },
      })
    );
    setTimeout(() => setIsDraftSaving(false), 400);
  };

  const handleDiscardDraft = () => {
    dispatch(discardDraft({ type: 'threads', id: wing }));
    setTitle('');
    setContent('');
    setSelectedTags([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createThread({
        wing,
        thread: {
          title,
          content,
          tags: selectedTags.length > 0 ? selectedTags : [config.tags[0]],
          author: {
            id: user?._id || user?.id || 'anon',
            name: user?.name || 'Guild Member',
            role: user?.role || 'student',
            avatar: user?.avatar || '',
          },
        },
      }).unwrap();

      dispatch(discardDraft({ type: 'threads', id: wing }));
      navigate(`/community/${wing}`);
    } catch (err) {
      console.error('Failed to dispatch thread:', err);
    }
  };

  const breadcrumbs = [
    { label: config.label, to: `/community/${wing}` },
    { label: 'New Dispatch' },
  ];

  return (
    <RoleGate allowedRoles={config.access} showNotice>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        </div>

        <ParchmentPanel>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-900/20 mb-6">
            <div>
              <span className="text-[11px] font-serif font-bold text-amber-800 uppercase tracking-wider">
                {config.bannerTag}
              </span>
              <h1 className="text-2xl font-serif font-bold text-stone-900">
                Compose New Dispatch
              </h1>
              <p className="text-xs font-serif text-stone-600 mt-0.5">
                Submit an inquiry or analysis to {config.label}.
              </p>
            </div>

            <DraftActions
              onSaveDraft={handleSaveDraft}
              onDiscardDraft={handleDiscardDraft}
              hasDraft={Boolean(title || content)}
              isSaving={isDraftSaving}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Dispatch Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your dispatch a clear, descriptive proclamation..."
                required
                className="w-full font-serif"
              />
            </div>

            <TagSelector
              availableTags={config.tags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              maxTags={3}
            />

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Manuscript Body *
              </label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Pen the body of your inquiry, supporting evidence, or translation comparisons..."
                rows={10}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/community/${wing}`)}
                className="px-4 py-2 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ornate"
                disabled={!title.trim() || !content.trim() || isSubmitting}
                className="px-6 py-2.5 text-sm flex items-center gap-2"
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Inscribing...' : 'Publish Dispatch'}</span>
              </Button>
            </div>
          </form>
        </ParchmentPanel>
      </div>
    </RoleGate>
  );
};

export default NewThread;
