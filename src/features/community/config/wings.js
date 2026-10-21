export const THREAD_WINGS = {
  'scholars-hall': {
    slug: 'scholars-hall',
    label: "The Scholar's Hall",
    subtitle: 'Where master educators, translators, and linguists dissect syntax, song pedagogy, and curriculum.',
    bannerTag: 'SCHOLAR WING',
    access: ['teacher', 'linguist', 'admin'],
    tags: ['Teacher', 'Linguist/Translator', 'Curriculum & Lesson', 'Official Guides'],
    hasStatus: false,
    emptyMessage: 'No scholarly scrolls found. Initiate a dissertation for your peers.',
  },
  'living-archives': {
    slug: 'living-archives',
    label: 'The Living Archives',
    subtitle: 'Collaborative world lore, lyrical adaptations, linguistic etymology, and guild storytelling.',
    bannerTag: 'LORE & ARCHIVES',
    access: ['member'],
    tags: ['Guild World Lore', 'Community Canon / Stories', 'Reference Library'],
    hasStatus: false,
    emptyMessage: 'No lore scrolls penned yet. Begin a new chronicle in the guild canon.',
  },
  'support-wing': {
    slug: 'support-wing',
    label: 'The Support Wing',
    subtitle: 'Assistance from guild overseers for account aid, technical issues, feature scrolls, and moderation.',
    bannerTag: 'GUILD ADVOCACY',
    access: ['member'],
    tags: ['Account & Membership', 'Technical Issues', 'Feature Requests', 'Safety / Moderation Help'],
    hasStatus: true, // In Progress / Resolved, admin-controlled
    emptyMessage: 'No active inquiries in this ledger. Submit a dispatch to the guild curators.',
  },
};

export const ALL_WINGS = [
  {
    id: 'guild-gate',
    title: 'The Guild Gate',
    path: '/community/guild-gate',
    desc: 'General gathering tavern for everyday chats, announcements, and song reactions.',
    tag: 'OPEN PLAZA',
  },
  {
    id: 'study-chambers',
    title: 'Study Chambers',
    path: '/community/study-chambers',
    desc: 'Structured cohort courses, live listening rooms, and guided practice sessions.',
    tag: 'COURSES & COHORTS',
  },
  {
    id: 'creative-forge',
    title: 'The Creative Forge',
    path: '/community/creative-forge',
    desc: 'Contests, blind lyric translating, guild votes, and artistic song adaptations.',
    tag: 'CONTESTS & VOTING',
  },
  {
    id: 'living-archives',
    title: 'The Living Archives',
    path: '/community/living-archives',
    desc: 'Verified song library, multi-version lyric history, community audits & lore.',
    tag: 'LYRIC ARCHIVES',
  },
  {
    id: 'scholars-hall',
    title: "Scholar's Hall",
    path: '/community/scholars-hall',
    desc: 'Advanced chambers reserved for teachers, linguists, and pedagogical methodology.',
    tag: 'ACADEMIC CIRCLE',
  },
  {
    id: 'support-wing',
    title: 'The Support Wing',
    path: '/community/support-wing',
    desc: 'Assistance for technical challenges, membership queries, and platform guidance.',
    tag: 'HELP & GUIDANCE',
  },
];
