import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library, Plus, Search, BookOpen } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import SongCard from './components/SongCard';
import RecentThreads from '../threads/RecentThreads';
import Tabs from '../../../components/ui/Tabs';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useGetArchivedSongsQuery } from '../../../redux/api/communityApi';

export const LivingArchives = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('songs'); // 'songs' | 'lore'
  const [search, setSearch] = useState('');

  const { data: songs = [], isLoading } = useGetArchivedSongsQuery();

  const tabs = [
    { id: 'songs', label: 'Verified Song Manuscripts', icon: <Library size={14} /> },
    { id: 'lore', label: 'Canon & Lore Dispatches', icon: <BookOpen size={14} /> },
  ];

  const filteredSongs = songs.filter((s) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      s.title.toLowerCase().includes(term) ||
      s.artist.toLowerCase().includes(term) ||
      s.language.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <WingBanner
        icon={Library}
        tag="LIVING ARCHIVES"
        title="The Living Archives"
        subtitle="The definitive repository of multi-versioned lyrical translations, dialect commentaries, historical etymology, and guild storytelling canon."
        actions={
          <Button
            variant="ornate"
            onClick={() => navigate('/community/living-archives/threads/new')}
            className="px-5 py-2.5 text-sm flex items-center gap-2"
          >
            <Plus size={15} />
            <span>Pen Lore Scroll</span>
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 'songs' && (
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search song manuscripts..."
            />
          </div>
        )}
      </div>

      {activeTab === 'songs' ? (
        isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton variant="card" className="h-64" />
            <Skeleton variant="card" className="h-64" />
          </div>
        ) : filteredSongs.length === 0 ? (
          <EmptyState
            title="No manuscripts found"
            description="No archived songs match your query. Propose a new song translation."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        )
      ) : (
        <RecentThreads
          wing="living-archives"
          title="Guild Lore & Community Canon Scrolls"
        />
      )}
    </div>
  );
};

export default LivingArchives;
