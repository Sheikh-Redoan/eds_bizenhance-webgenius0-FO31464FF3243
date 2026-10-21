import React from 'react';
import { clsx } from 'clsx';
import { Save, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

export const DraftActions = ({
  onSaveDraft,
  onDiscardDraft,
  hasDraft = false,
  isSaving = false,
  className,
}) => {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <Button
        type="button"
        variant="ghost"
        onClick={onSaveDraft}
        disabled={isSaving}
        className="text-xs flex items-center gap-1.5 !px-3 !py-1.5 font-serif"
      >
        <Save size={13} />
        <span>{isSaving ? 'Saving Draft...' : 'Save Draft'}</span>
      </Button>

      {hasDraft && (
        <button
          type="button"
          onClick={onDiscardDraft}
          className="text-xs text-stone-500 hover:text-red-700 font-serif flex items-center gap-1 transition-colors"
          title="Discard saved draft"
        >
          <Trash2 size={12} />
          <span>Discard</span>
        </button>
      )}
    </div>
  );
};

export default DraftActions;
