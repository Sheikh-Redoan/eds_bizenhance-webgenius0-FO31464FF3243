import { baseApi } from './baseApi';
import {
  MOCK_POSTS,
  MOCK_THREADS,
  MOCK_COURSES,
  MOCK_CONTESTS,
  MOCK_SONGS_ARCHIVE,
} from '../../features/community/mocks/communityData';

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Guild Gate Posts
    getPosts: builder.query({
      queryFn: async ({ category, tag } = {}) => {
        let results = [...MOCK_POSTS];
        if (category && category !== 'All') {
          results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        }
        if (tag) {
          results = results.filter((p) => p.tags.includes(tag));
        }
        return { data: results };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: builder.query({
      queryFn: async (postId) => {
        const post = MOCK_POSTS.find((p) => p.id === postId) || MOCK_POSTS[0];
        return { data: post };
      },
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation({
      queryFn: async (newPost) => {
        const created = {
          ...newPost,
          id: `post-${Date.now()}`,
          views: 1,
          repliesCount: 0,
          likes: 0,
          createdAt: new Date().toISOString(),
        };
        MOCK_POSTS.unshift(created);
        return { data: created };
      },
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    // Wing-Scoped Thread Engine
    getThreads: builder.query({
      queryFn: async ({ wing, tag }) => {
        const wingList = MOCK_THREADS[wing] || [];
        let filtered = [...wingList];
        if (tag && tag !== 'All') {
          filtered = filtered.filter((t) => t.tags.includes(tag));
        }
        return { data: filtered };
      },
      providesTags: (result, error, { wing }) => [{ type: 'Thread', id: wing }],
    }),

    getThread: builder.query({
      queryFn: async ({ wing, id }) => {
        const wingList = MOCK_THREADS[wing] || [];
        const thread = wingList.find((t) => t.id === id) || wingList[0];
        return { data: thread };
      },
      providesTags: (result, error, { id }) => [{ type: 'Thread', id }],
    }),

    createThread: builder.mutation({
      queryFn: async ({ wing, thread }) => {
        if (!MOCK_THREADS[wing]) MOCK_THREADS[wing] = [];
        const newThread = {
          ...thread,
          id: `th-${Date.now()}`,
          wing,
          views: 1,
          repliesCount: 0,
          likes: 0,
          replies: [],
          createdAt: new Date().toISOString(),
        };
        MOCK_THREADS[wing].unshift(newThread);
        return { data: newThread };
      },
      invalidatesTags: (result, error, { wing }) => [{ type: 'Thread', id: wing }],
    }),

    updateThreadStatus: builder.mutation({
      queryFn: async ({ wing, threadId, status }) => {
        const wingList = MOCK_THREADS[wing] || [];
        const item = wingList.find((t) => t.id === threadId);
        if (item) item.status = status;
        return { data: item };
      },
      invalidatesTags: (result, error, { threadId, wing }) => [
        { type: 'Thread', id: threadId },
        { type: 'Thread', id: wing },
      ],
    }),

    // Courses & Study Chambers
    getCourses: builder.query({
      queryFn: async () => {
        return { data: MOCK_COURSES };
      },
      providesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    getCourse: builder.query({
      queryFn: async (courseId) => {
        const course = MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];
        return { data: course };
      },
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),

    createCourse: builder.mutation({
      queryFn: async (newCourse) => {
        const created = {
          ...newCourse,
          id: `course-${Date.now()}`,
          enrolledCount: 1,
          createdAt: new Date().toISOString(),
        };
        MOCK_COURSES.unshift(created);
        return { data: created };
      },
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    requestToJoinCourse: builder.mutation({
      queryFn: async ({ courseId, note }) => {
        const course = MOCK_COURSES.find((c) => c.id === courseId);
        if (course) {
          course.userRequestStatus = 'pending';
        }
        return { data: { success: true, status: 'pending' } };
      },
      invalidatesTags: (result, error, { courseId }) => [{ type: 'Course', id: courseId }],
    }),

    cancelJoinRequest: builder.mutation({
      queryFn: async ({ courseId }) => {
        const course = MOCK_COURSES.find((c) => c.id === courseId);
        if (course) {
          course.userRequestStatus = null;
        }
        return { data: { success: true } };
      },
      invalidatesTags: (result, error, { courseId }) => [{ type: 'Course', id: courseId }],
    }),

    // Contests & Creative Forge
    getContests: builder.query({
      queryFn: async () => {
        return { data: MOCK_CONTESTS };
      },
      providesTags: [{ type: 'Contest', id: 'LIST' }],
    }),

    getContest: builder.query({
      queryFn: async (contestId) => {
        const contest = MOCK_CONTESTS.find((c) => c.id === contestId) || MOCK_CONTESTS[0];
        return { data: contest };
      },
      providesTags: (result, error, id) => [{ type: 'Contest', id }],
    }),

    submitCreativeWork: builder.mutation({
      queryFn: async ({ contestId, submission }) => {
        return { data: { success: true, id: `sub-${Date.now()}` } };
      },
      invalidatesTags: (result, error, { contestId }) => [{ type: 'Contest', id: contestId }],
    }),

    // Living Archives Songs
    getArchivedSongs: builder.query({
      queryFn: async () => {
        return { data: MOCK_SONGS_ARCHIVE };
      },
      providesTags: [{ type: 'Song', id: 'LIST' }],
    }),

    getArchivedSong: builder.query({
      queryFn: async (songId) => {
        const song = MOCK_SONGS_ARCHIVE.find((s) => s.id === songId) || MOCK_SONGS_ARCHIVE[0];
        return { data: song };
      },
      providesTags: (result, error, id) => [{ type: 'Song', id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useGetThreadsQuery,
  useGetThreadQuery,
  useCreateThreadMutation,
  useUpdateThreadStatusMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useRequestToJoinCourseMutation,
  useCancelJoinRequestMutation,
  useGetContestsQuery,
  useGetContestQuery,
  useSubmitCreativeWorkMutation,
  useGetArchivedSongsQuery,
  useGetArchivedSongQuery,
} = communityApi;
