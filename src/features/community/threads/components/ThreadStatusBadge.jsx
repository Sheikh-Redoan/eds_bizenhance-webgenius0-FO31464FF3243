import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { THREAD_STATUS } from '../../constants';

export const ThreadStatusBadge = ({ status, className }) => {
  const normalized = (status || THREAD_STATUS.OPEN).toLowerCase();

  const config = {
    [THREAD_STATUS.OPEN]: {
      label: 'Open Query',
      icon: HelpCircle,
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    [THREAD_STATUS.IN_PROGRESS]: {
      label: 'In Progress (Admin Investigating)',
      icon: Clock,
      classes: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
    },
    [THREAD_STATUS.RESOLVED]: {
      label: 'Resolved by Guild',
      icon: CheckCircle2,
      classes: 'bg-stone-200 text-stone-700 border-stone-300',
    },
  };

  const current = config[normalized] || config[THREAD_STATUS.OPEN];
  const Icon = current.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif border shadow-2xs',
        current.classes,
        className
      )}
    >
      <Icon size={13} />
      <span>{current.label}</span>
    </span>
  );
};

export default ThreadStatusBadge;
