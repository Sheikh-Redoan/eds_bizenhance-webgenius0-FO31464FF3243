import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/plans",
      providesTags: ["Plans"],
    }),

    paypalDonate: builder.mutation({
      query: (data) => ({
        url: "/paypal-donate",
        method: "POST",
        body: data,
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/paypal/subscription/create",
        method: "POST",
        body: data,
      }),
    }),

    getSubscriptionSuccess: builder.query({
      query: ({ token, subscription_id }) => 
        `/paypal/subscription/success?token=${token}&subscription_id=${subscription_id}`,
      invalidatesTags: ["Dashboard", "User", "Plans"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  usePaypalDonateMutation,
  useCreateSubscriptionMutation,
  useGetSubscriptionSuccessQuery,
} = paymentApi;
