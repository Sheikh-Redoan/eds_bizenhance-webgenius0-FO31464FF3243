import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Plus, Search } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import PostCard from './components/PostCard';
import Tabs from '../../../components/ui/Tabs';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetPostsQuery } from '../../../redux/api/communityApi';

export const GuildGate = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: posts = [], isLoading } = useGetPostsQuery({
    category: activeCategory,
  });

  const categories = [
    { id: 'All', label: 'All Scrolls' },
    { id: 'Announcements', label: 'Announcements' },
    { id: 'Analysis', label: 'Lyrical Analysis' },
    { id: 'Questions', label: 'Language Questions' },
  ];

  const filteredPosts = posts.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      <WingBanner
        icon={Compass}
        tag="GUILD GATE"
        title="The Guild Gate Plaza"
        subtitle="The communal square where travelers gather. Engage in lively cultural exchanges, song interpretations, and guild decrees."
        actions={
          <Button
            variant="ornate"
            onClick={() => navigate('/community/guild-gate/new')}
            className="px-5 py-2.5 text-sm flex items-center gap-2"
          >
            <Plus size={15} />
            <span>Compose Post</span>
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
        <div className="w-full sm:w-72">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scrolls & tags..."
            className="w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
          <Skeleton variant="card" className="h-36" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title="No dispatches found"
          description="There are no posts matching your chamber filters. Pen the first scroll."
          actionLabel="Compose Post"
          onAction={() => navigate('/community/guild-gate/new')}
        />
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GuildGate;
