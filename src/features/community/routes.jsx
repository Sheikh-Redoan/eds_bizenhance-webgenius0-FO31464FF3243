import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';
import Skeleton from '../../components/ui/Skeleton';
import CommunityLayout from './CommunityLayout';
import { THREAD_WINGS } from './config/wings';

// Entry & Guild Hall
const CommunityHome = lazy(() => import('./home/CommunityHome'));
const GuildHall = lazy(() => import('./guildHall/GuildHall'));

// Guild Gate
const GuildGate = lazy(() => import('./guildGate/GuildGate'));
const NewPost = lazy(() => import('./guildGate/NewPost'));
const PostDetail = lazy(() => import('./guildGate/PostDetail'));

// Study Chambers
const StudyChambers = lazy(() => import('./studyChambers/StudyChambers'));
const CreateCourse = lazy(() => import('./studyChambers/CreateCourse'));
const CourseDetail = lazy(() => import('./studyChambers/CourseDetail'));
const ManageRequests = lazy(() => import('./studyChambers/ManageRequests'));
const CourseChat = lazy(() => import('./studyChambers/CourseChat'));

// Creative Forge
const CreativeForge = lazy(() => import('./creativeForge/CreativeForge'));
const CommunityPolls = lazy(() => import('./creativeForge/polls/CommunityPolls'));
const ContestDetail = lazy(() => import('./creativeForge/contests/ContestDetail'));
const SubmitCreativeWork = lazy(() => import('./creativeForge/submission/SubmitCreativeWork'));
const BlindVoting = lazy(() => import('./creativeForge/voting/BlindVoting'));
const ContestResults = lazy(() => import('./creativeForge/results/ContestResults'));

// Living Archives
const LivingArchives = lazy(() => import('./livingArchives/LivingArchives'));
const SongDetail = lazy(() => import('./livingArchives/SongDetail'));
const SongVersionView = lazy(() => import('./livingArchives/SongVersionView'));
const AuditSong = lazy(() => import('./livingArchives/AuditSong'));

// Scholar's Hall & Support Wing
const ScholarsHall = lazy(() => import('./scholarsHall/ScholarsHall'));
const SupportWing = lazy(() => import('./supportWing/SupportWing'));

// Config-driven Thread Engine
const NewThread = lazy(() => import('./threads/NewThread'));
const ThreadDetail = lazy(() => import('./threads/ThreadDetail'));

const RouteAuth = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const LoadingFallback = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-4">
    <Skeleton variant="title" />
    <Skeleton variant="card" className="h-64" />
  </div>
);

export const CommunityRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<CommunityLayout />}>
          {/* Public Fellowship Landing */}
          <Route index element={<CommunityHome />} />

          {/* Authenticated Wings */}
          <Route path="guild-hall" element={<RouteAuth><GuildHall /></RouteAuth>} />

          {/* Guild Gate */}
          <Route path="guild-gate" element={<RouteAuth><GuildGate /></RouteAuth>} />
          <Route path="guild-gate/new" element={<RouteAuth><NewPost /></RouteAuth>} />
          <Route path="guild-gate/posts/:postId" element={<RouteAuth><PostDetail /></RouteAuth>} />

          {/* Study Chambers */}
          <Route path="study-chambers" element={<RouteAuth><StudyChambers /></RouteAuth>} />
          <Route path="study-chambers/courses/new" element={<RouteAuth><CreateCourse /></RouteAuth>} />
          <Route path="study-chambers/courses/:courseId" element={<RouteAuth><CourseDetail /></RouteAuth>} />
          <Route path="study-chambers/courses/:courseId/requests" element={<RouteAuth><ManageRequests /></RouteAuth>} />
          <Route path="study-chambers/courses/:courseId/chat" element={<RouteAuth><CourseChat /></RouteAuth>} />

          {/* Creative Forge */}
          <Route path="creative-forge" element={<RouteAuth><CreativeForge /></RouteAuth>} />
          <Route path="creative-forge/polls" element={<RouteAuth><CommunityPolls /></RouteAuth>} />
          <Route path="creative-forge/contests/:contestId" element={<RouteAuth><ContestDetail /></RouteAuth>} />
          <Route path="creative-forge/contests/:contestId/submit" element={<RouteAuth><SubmitCreativeWork /></RouteAuth>} />
          <Route path="creative-forge/contests/:contestId/vote" element={<RouteAuth><BlindVoting /></RouteAuth>} />
          <Route path="creative-forge/contests/:contestId/results" element={<RouteAuth><ContestResults /></RouteAuth>} />

          {/* Living Archives */}
          <Route path="living-archives" element={<RouteAuth><LivingArchives /></RouteAuth>} />
          <Route path="living-archives/songs/:songId" element={<RouteAuth><SongDetail /></RouteAuth>} />
          <Route path="living-archives/songs/:songId/versions/:version" element={<RouteAuth><SongVersionView /></RouteAuth>} />
          <Route path="living-archives/songs/:songId/audit" element={<RouteAuth><AuditSong /></RouteAuth>} />

          {/* Scholar's Hall */}
          <Route path="scholars-hall" element={<RouteAuth><ScholarsHall /></RouteAuth>} />

          {/* Support Wing */}
          <Route path="support-wing" element={<RouteAuth><SupportWing /></RouteAuth>} />

          {/* Config-driven Thread Engine: generated for all wings in THREAD_WINGS */}
          {Object.keys(THREAD_WINGS).map((wingSlug) => (
            <React.Fragment key={wingSlug}>
              <Route
                path={`${wingSlug}/threads/new`}
                element={<RouteAuth><NewThread wing={wingSlug} /></RouteAuth>}
              />
              <Route
                path={`${wingSlug}/threads/:threadId`}
                element={<RouteAuth><ThreadDetail wing={wingSlug} /></RouteAuth>}
              />
            </React.Fragment>
          ))}

          {/* Fallback to Community Home */}
          <Route path="*" element={<Navigate to="/community" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default CommunityRoutes;
