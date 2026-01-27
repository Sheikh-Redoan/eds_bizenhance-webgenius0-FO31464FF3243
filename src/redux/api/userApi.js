import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query({
      query: () => "/user-dashboard",
      providesTags: ["Dashboard"],
    }),

    submitQuiz: builder.mutation({
      query: (data) => ({
        url: "/user/submit-quiz",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    submitContact: builder.mutation({
      query: (data) => ({
        url: "/contact-submit",
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile-update",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch({ type: 'auth/updateUser', payload: data.data });
          }
        } catch {}
      },
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserDashboardQuery,
  useSubmitQuizMutation,
  useSubmitContactMutation,
  useUpdateProfileMutation,
} = userApi;
