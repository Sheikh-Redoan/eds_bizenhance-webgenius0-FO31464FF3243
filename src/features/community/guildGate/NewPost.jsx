import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Send, ArrowLeft } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { saveDraft, discardDraft } from '../state/communitySlice';
import { useCreatePostMutation } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import MarkdownEditor from '../components/MarkdownEditor';
import TagChip from '../components/TagChip';
import DraftActions from '../components/DraftActions';
import ParchmentPanel from '../components/ParchmentPanel';

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Analysis');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Lyrics']);
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed) && tags.length < 5) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSaveDraft = () => {
    setIsDraftSaving(true);
    dispatch(
      saveDraft({
        type: 'posts',
        id: 'new_post',
        data: { title, content, category, tags },
      })
    );
    setTimeout(() => setIsDraftSaving(false), 400);
  };

  const handleDiscardDraft = () => {
    dispatch(discardDraft({ type: 'posts', id: 'new_post' }));
    setTitle('');
    setContent('');
    setTags(['Lyrics']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createPost({
        title,
        content,
        category,
        tags,
        author: {
          id: user?._id || user?.id || 'anon',
          name: user?.name || 'Guild Traveler',
          role: user?.role || 'student',
          avatar: user?.avatar || '',
        },
      }).unwrap();

      dispatch(discardDraft({ type: 'posts', id: 'new_post' }));
      navigate('/community/guild-gate');
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const breadcrumbs = [
    { label: 'Guild Gate', to: '/community/guild-gate' },
    { label: 'New Scroll' },
  ];

  return (
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
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Inscribe a Public Post
            </h1>
            <p className="text-xs font-serif text-stone-600 mt-0.5">
              Share song analyses, dialect questions, or community announcements.
            </p>
          </div>

          <DraftActions
            onSaveDraft={handleSaveDraft}
            onDiscardDraft={handleDiscardDraft}
            hasDraft={Boolean(title || content)}
            isSaving={isDraftSaving}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Scroll Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Subject of your proclamation..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border border-stone-300 rounded-lg text-sm font-serif"
              >
                <option value="Analysis">Lyrical Analysis</option>
                <option value="Questions">Language Questions</option>
                <option value="Announcements">Announcements</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Tags (Press Enter to add, max 5)
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tags.map((t) => (
                <TagChip
                  key={t}
                  label={t}
                  removable
                  onRemove={handleRemoveTag}
                />
              ))}
            </div>
            {tags.length < 5 && (
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag (e.g., Bolero, French, VerbDrills)..."
                className="max-w-xs"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Manuscript Content *
            </label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Inscribe your thoughts, references, or verse quotations..."
              rows={9}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/community/guild-gate')}
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
              <span>{isSubmitting ? 'Inscribing...' : 'Dispatch Scroll'}</span>
            </Button>
          </div>
        </form>
      </ParchmentPanel>
    </div>
  );
};

export default NewPost;
