import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, UserCheck, Wrench, Sparkles, ShieldAlert } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import ChamberCard from '../components/ChamberCard';
import RecentThreads from '../threads/RecentThreads';

export const SupportWing = () => {
  const navigate = useNavigate();

  const chambers = [
    {
      title: 'Account & Membership',
      description: 'Inquiries regarding rune subscriptions, tier upgrades, and credentials.',
      icon: UserCheck,
      count: 12,
    },
    {
      title: 'Technical Issues & Audio Bugs',
      description: 'Report audio playback stuttering, lyric sync latency, and player issues.',
      icon: Wrench,
      count: 19,
    },
    {
      title: 'Feature Scrolls & Guild Petitions',
      description: 'Submit recommendations for future wings, song modes, or learning tools.',
      icon: Sparkles,
      count: 31,
    },
    {
      title: 'Safety, Conduct & Moderation Help',
      description: 'Private escalation to Guild Overseers for charter violations and harassment.',
      icon: ShieldAlert,
      count: 4,
    },
  ];

  return (
    <div className="space-y-8">
      <WingBanner
        icon={HelpCircle}
        tag="GUILD ADVOCACY"
        title="The Support Wing"
        subtitle="Direct channel to Guild Overseers and technical architects. Receive timely guidance on membership tiers, audio tools, and community safety."
      />

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-serif font-bold text-amber-950">
            Assistance Helpdesks
          </h2>
          <p className="text-xs font-serif text-stone-600">
            Categorized ledgers monitored by Guild Overseers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chambers.map((ch, idx) => (
            <ChamberCard
              key={idx}
              icon={ch.icon}
              title={ch.title}
              description={ch.description}
              count={ch.count}
              onClick={() => navigate('/community/support-wing/threads/new')}
            />
          ))}
        </div>
      </div>

      <RecentThreads
        wing="support-wing"
        title="Active Support Inquiries & Ledgers"
      />
    </div>
  );
};

export default SupportWing;
