import React, { useState } from 'react';
import { Flag, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Textarea from '../../../components/ui/Textarea';

export const ReportModal = ({
  isOpen,
  onClose,
  onSubmit,
  targetType = 'thread',
}) => {
  const [reason, setReason] = useState('Spam / Advertising');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const reasons = [
    'Spam / Advertising',
    'Offensive / Harassing language',
    'Incorrect / Plagiarized translation',
    'Off-topic / Violation of guild charter',
    'Other reason',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ reason, details });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#fcf8f0] border-2 border-amber-900/60 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-500 hover:text-stone-900 rounded-full"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-100 text-red-800">
            <Flag size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Report this {targetType}
            </h3>
            <p className="text-xs font-serif text-stone-600">
              Notify the Guild Overseers and moderation council.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-serif font-semibold text-stone-800">
              Select Infraction
            </label>
            <div className="space-y-1.5">
              {reasons.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 text-xs font-serif text-stone-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="accent-amber-800"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-serif font-semibold text-stone-800 mb-1 block">
              Additional Details (optional)
            </label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context for our moderators..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-serif text-stone-700 hover:text-stone-900"
            >
              Cancel
            </button>
            <Button type="submit" variant="ornate" className="px-5 py-2 text-xs">
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
