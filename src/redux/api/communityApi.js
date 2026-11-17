import { baseApi } from './baseApi';
import {
  MOCK_THREADS,
  MOCK_COURSES,
  MOCK_CONTESTS,
  MOCK_SONGS_ARCHIVE,
} from '../../features/community/mocks/communityData';

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Guild Gate ──────────────────────────────────────────────────────────
    getCategories: builder.query({
      query: () => '/community-categories',
      transformResponse: (res) => res.data,
      providesTags: ['CommunityCategory'],
    }),

    getPosts: builder.query({
      query: ({ category_id, sort = 'latest', search, per_page = 10, page = 1 } = {}) => {
        const params = { sort, per_page, page };
        if (category_id) params.category_id = category_id;
        if (search) params.search = search;
        return { url: '/community-posts', params };
      },
      transformResponse: (res) => res.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: builder.query({
      query: (postId) => `/community-post/${postId}`,
      transformResponse: (res) => res.data,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation({
      query: (formData) => ({
        url: '/community-post/create',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/community-post/update/${id}`,
        method: 'POST',
        body: formData,
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/community-post/delete/${postId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    likePost: builder.mutation({
      query: (postId) => ({
        url: `/community-post/like/${postId}`,
        method: 'POST',
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (result, error, postId) => [{ type: 'Post', id: postId }],
    }),

    addComment: builder.mutation({
      query: ({ postId, content, parent_id = null }) => ({
        url: `/community-post/comment/${postId}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parent_id }),
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),

    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `/community-post/comment/update/${commentId}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: 'Reply' }],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/community-post/comment/delete/${commentId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Reply' }],
    }),

    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `/community-post/comment/like/${commentId}`,
        method: 'POST',
      }),
      transformResponse: (res) => res.data,
      invalidatesTags: [{ type: 'Reply' }],
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
  useGetCategoriesQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
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
