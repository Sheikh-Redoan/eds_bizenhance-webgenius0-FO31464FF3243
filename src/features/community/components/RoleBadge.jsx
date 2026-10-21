import React from 'react';
import { clsx } from 'clsx';
import { Shield, Award, BookOpen, GraduationCap } from 'lucide-react';
import { ROLES } from '../constants';

export const RoleBadge = ({ role = ROLES.STUDENT, className }) => {
  const normalized = (role || '').toLowerCase();

  const config = {
    [ROLES.ADMIN]: {
      label: 'Overseer / Admin',
      icon: Shield,
      classes: 'bg-red-950/80 text-red-200 border-red-800/80',
    },
    [ROLES.TEACHER]: {
      label: 'Instructor',
      icon: GraduationCap,
      classes: 'bg-blue-950/80 text-blue-200 border-blue-800/80',
    },
    [ROLES.LINGUIST]: {
      label: 'Master Linguist',
      icon: BookOpen,
      classes: 'bg-emerald-950/80 text-emerald-200 border-emerald-800/80',
    },
    [ROLES.STUDENT]: {
      label: 'Guild Scholar',
      icon: Award,
      classes: 'bg-amber-950/70 text-amber-200 border-amber-800/60',
    },
  };

  const current = config[normalized] || config[ROLES.STUDENT];
  const Icon = current.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-serif font-bold uppercase tracking-wider border shadow-xs select-none',
        current.classes,
        className
      )}
    >
      <Icon size={11} strokeWidth={2.5} />
      <span>{current.label}</span>
    </span>
  );
};

export default RoleBadge;
