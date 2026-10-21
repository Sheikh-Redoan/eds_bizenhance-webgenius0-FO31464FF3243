import { CONTEST_PHASE } from '../constants';

export const getContestPhase = (contest, now = new Date()) => {
  if (!contest) return CONTEST_PHASE.UPCOMING;
  
  const currentDate = new Date(now);
  const start = contest.startDate ? new Date(contest.startDate) : null;
  const subDeadline = contest.submissionDeadline ? new Date(contest.submissionDeadline) : null;
  const voteDeadline = contest.votingDeadline ? new Date(contest.votingDeadline) : null;
  const resultsDate = contest.resultsDate ? new Date(contest.resultsDate) : null;

  if (start && currentDate < start) {
    return CONTEST_PHASE.UPCOMING;
  }
  if (subDeadline && currentDate <= subDeadline) {
    return CONTEST_PHASE.OPEN;
  }
  if (voteDeadline && currentDate <= voteDeadline) {
    return CONTEST_PHASE.BLIND_VOTING;
  }
  if (resultsDate && currentDate < resultsDate) {
    return CONTEST_PHASE.TALLYING;
  }
  return CONTEST_PHASE.RESULTS;
};

export const getPhaseLabel = (phase) => {
  switch (phase) {
    case CONTEST_PHASE.UPCOMING:
      return 'Upcoming';
    case CONTEST_PHASE.OPEN:
      return 'Submissions Open';
    case CONTEST_PHASE.SUBMISSIONS_CLOSED:
      return 'Submissions Closed';
    case CONTEST_PHASE.BLIND_VOTING:
      return 'Blind Voting Open';
    case CONTEST_PHASE.TALLYING:
      return 'Tallying Results';
    case CONTEST_PHASE.RESULTS:
      return 'Results Published';
    default:
      return 'Active';
  }
};
