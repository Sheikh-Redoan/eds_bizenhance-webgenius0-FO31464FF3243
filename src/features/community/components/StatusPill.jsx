import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { THREAD_STATUS, CONTEST_PHASE } from '../constants';

export const StatusPill = ({
  status,
  label,
  className,
}) => {
  const normalized = (status || '').toLowerCase();

  const styles = {
    // Thread statuses
    [THREAD_STATUS.OPEN]: {
      text: label || 'Open',
      icon: Clock,
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    [THREAD_STATUS.IN_PROGRESS]: {
      text: label || 'In Progress',
      icon: Clock,
      classes: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    [THREAD_STATUS.RESOLVED]: {
      text: label || 'Resolved',
      icon: CheckCircle2,
      classes: 'bg-stone-200 text-stone-700 border-stone-300',
    },

    // Contest statuses
    [CONTEST_PHASE.OPEN]: {
      text: label || 'Submissions Open',
      icon: Clock,
      classes: 'bg-teal-100 text-teal-900 border-teal-300',
    },
    [CONTEST_PHASE.BLIND_VOTING]: {
      text: label || 'Blind Voting Open',
      icon: Clock,
      classes: 'bg-amber-100 text-amber-900 border-amber-400 font-bold',
    },
    [CONTEST_PHASE.RESULTS]: {
      text: label || 'Results Published',
      icon: CheckCircle2,
      classes: 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
    },
  };

  const current = styles[normalized] || {
    text: label || status || 'Active',
    icon: AlertCircle,
    classes: 'bg-stone-200 text-stone-800 border-stone-300',
  };

  const Icon = current.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-serif font-semibold border shadow-2xs',
        current.classes,
        className
      )}
    >
      <Icon size={12} />
      <span>{current.text}</span>
    </span>
  );
};

export default StatusPill;
