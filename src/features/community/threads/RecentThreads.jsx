import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { Plus, Filter } from 'lucide-react';
import { THREAD_WINGS } from '../config/wings';
import ThreadRow from './components/ThreadRow';
import Button from '../../../components/ui/Button';
import Tabs from '../../../components/ui/Tabs';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetThreadsQuery } from '../../../redux/api/communityApi';

export const RecentThreads = ({
  wing,
  title = 'Recent Dispatches',
  showNewButton = true,
  className,
}) => {
  const navigate = useNavigate();
  const config = THREAD_WINGS[wing] || {};
  const [selectedTag, setSelectedTag] = useState('All');

  const { data: threads = [], isLoading } = useGetThreadsQuery({
    wing,
    tag: selectedTag === 'All' ? undefined : selectedTag,
  });

  const tabOptions = [
    { id: 'All', label: 'All Scrolls' },
    ...(config.tags || []).map((t) => ({ id: t, label: t })),
  ];

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-900/20">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-950">{title}</h2>
          <p className="text-xs font-serif text-stone-600">
            Chronological queries, debates, and archives from the {config.label || 'wing'}.
          </p>
        </div>

        {showNewButton && (
          <Button
            variant="ornate"
            onClick={() => navigate(`/community/${wing}/threads/new`)}
            className="px-4 py-2 text-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <Plus size={14} />
            <span>New Dispatch</span>
          </Button>
        )}
      </div>

      {tabOptions.length > 2 && (
        <Tabs
          tabs={tabOptions}
          activeTab={selectedTag}
          onChange={setSelectedTag}
          className="mb-2"
        />
      )}

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton variant="card" className="h-28" />
          <Skeleton variant="card" className="h-28" />
        </div>
      ) : threads.length === 0 ? (
        <EmptyState
          title={config.emptyMessage || 'No scrolls recorded'}
          actionLabel="Pen New Dispatch"
          onAction={() => navigate(`/community/${wing}/threads/new`)}
        />
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
            <ThreadRow key={thread.id} thread={thread} wing={wing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentThreads;
