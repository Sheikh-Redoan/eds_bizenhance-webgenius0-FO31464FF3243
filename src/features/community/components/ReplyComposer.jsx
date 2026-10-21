import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Send } from 'lucide-react';
import Button from '../../../components/ui/Button';
import MarkdownEditor from './MarkdownEditor';

export const ReplyComposer = ({
  onSubmit,
  isSubmitting = false,
  placeholder = 'Pen your response or scholastic feedback...',
  className,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit?.(content);
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('bg-[#faf6ee] border border-amber-900/30 rounded-xl p-4 shadow-xs', className)}
    >
      <h4 className="font-serif font-bold text-sm text-stone-900 mb-2">Leave a Dispatch</h4>
      <MarkdownEditor
        value={content}
        onChange={setContent}
        placeholder={placeholder}
        rows={4}
      />
      <div className="flex justify-end mt-3">
        <Button
          type="submit"
          variant="ornate"
          disabled={!content.trim() || isSubmitting}
          className="px-5 py-2 text-sm flex items-center gap-1.5"
        >
          <Send size={14} />
          <span>{isSubmitting ? 'Posting...' : 'Dispatch Reply'}</span>
        </Button>
      </div>
    </form>
  );
};

export default ReplyComposer;
