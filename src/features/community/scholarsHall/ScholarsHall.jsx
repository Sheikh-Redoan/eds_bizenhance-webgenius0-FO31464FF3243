import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Castle, GraduationCap, BookOpen, Scroll, Award } from 'lucide-react';
import WingBanner from '../components/WingBanner';
import ChamberCard from '../components/ChamberCard';
import RecentThreads from '../threads/RecentThreads';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const ScholarsHall = () => {
  const navigate = useNavigate();

  const chambers = [
    {
      title: 'Pedagogical Methodology',
      description: 'Lyrical acquisition frameworks, memory retention studies, and classroom lesson plans.',
      icon: GraduationCap,
      count: 14,
    },
    {
      title: 'Linguist & Translator Sanctum',
      description: 'Phonology, rhyming constraints, syntax adaptations, and idiom translation challenges.',
      icon: BookOpen,
      count: 22,
    },
    {
      title: 'Curriculum & Lesson Blueprints',
      description: 'Pre-assembled song syllabi for classroom cohorts and independent study paths.',
      icon: Scroll,
      count: 9,
    },
    {
      title: 'Official Guides & Standards',
      description: 'Guild-wide criteria for phonetic transcriptions and multi-language lyrics.',
      icon: Award,
      count: 6,
    },
  ];

  return (
    <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.LINGUIST, ROLES.ADMIN]} showNotice>
      <div className="space-y-8">
        <WingBanner
          icon={Castle}
          tag="ACADEMIC CIRCLE"
          title="The Scholar's Hall"
          subtitle="Restricted sanctuary for verified Teachers, Linguists, and Guild Overseers to develop pedagogy, audit curricula, and debate grammar mechanics."
        />

        <div>
          <div className="mb-4">
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Academic Chambers
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Explore specialized dissertations by pedagogical focus area.
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
                onClick={() => navigate('/community/scholars-hall/threads/new')}
              />
            ))}
          </div>
        </div>

        <RecentThreads
          wing="scholars-hall"
          title="Scholarly Dissertations & Queries"
        />
      </div>
    </RoleGate>
  );
};

export default ScholarsHall;
