import React from 'react';
import { clsx } from 'clsx';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#fbf7ee] border-2 border-amber-900/60 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-amber-900/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className={clsx('p-2.5 rounded-full shrink-0', isDestructive ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800')}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">{title}</h3>
            <p className="font-serif text-sm text-stone-600 mt-1.5 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-serif text-stone-700 hover:text-stone-950 transition-colors"
          >
            {cancelText}
          </button>
          <Button
            type="button"
            variant={isDestructive ? 'primary' : 'ornate'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={clsx('px-5 py-2 text-sm', isDestructive && '!bg-red-900 hover:!bg-red-800 text-white')}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
