import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Vote, Plus } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import ContestCard from './contests/ContestCard';
import Tabs from '../../../components/ui/Tabs';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetContestsQuery } from '../../../redux/api/communityApi';
import { getContestPhase } from '../utils/contestPhase';

export const CreativeForge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const { data: contests = [], isLoading } = useGetContestsQuery();

  const tabs = [
    { id: 'all', label: 'All Tournaments' },
    { id: 'open', label: 'Submissions Open' },
    { id: 'blind_voting', label: 'Blind Voting' },
    { id: 'results', label: 'Completed & Results' },
  ];

  const filtered = contests.filter((c) => {
    if (activeTab === 'all') return true;
    const phase = getContestPhase(c);
    return phase === activeTab;
  });

  return (
    <div className="space-y-6">
      <WingBanner
        icon={Trophy}
        tag="CREATIVE FORGE"
        title="The Creative Forge"
        subtitle="Where lyrical wordsmiths clash. Enter translation tournaments, blind vote on anonymous entries, and contribute to guild songwriting polls."
        actions={
          <Button
            variant="secondary"
            onClick={() => navigate('/community/creative-forge/polls')}
            className="px-4 py-2 text-xs flex items-center gap-1.5"
          >
            <Vote size={14} />
            <span>Guild Polls</span>
          </Button>
        }
      />

      <div className="flex items-center justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" className="h-72" />
          <Skeleton variant="card" className="h-72" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No tournaments in this category"
          description="Check back soon for new translation brawls and creative lyric prompts."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreativeForge;
