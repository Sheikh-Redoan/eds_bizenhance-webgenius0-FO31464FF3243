import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/plans",
      providesTags: ["Plans"],
    }),

    paypalDonate: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("amount", data.amount);
        return {
          url: "/paypal-donate",
          method: "POST",
          body: formData,
        };
      },
    }),
 
    createSubscription: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("plan_id", data.plan_id);
        formData.append("gateway", data.gateway);
        return {
          url: "/paypal/subscription/create",
          method: "POST",
          body: formData,
        };
      },
    }),

    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/paypal/subscription/cancel",
        method: "POST",
      }),
      invalidatesTags: ["Dashboard", "User", "Plans"],
    }),

    getSubscriptionSuccess: builder.query({
      query: ({ token, subscription_id }) => 
        `/paypal/subscription/success?token=${token}&subscription_id=${subscription_id}`,
      invalidatesTags: ["Dashboard", "User", "Plans"],
    }),

    getOneTimeSuccess: builder.query({
      query: (token) => `/paypal/one-time/success?token=${token}`,
      invalidatesTags: ["Dashboard", "User", "Plans"],
    }),

    paypalDonateSuccess: builder.mutation({
      query: ({ token }) => {
        const formData = new FormData();
        formData.append("token", token);
        return {
          url: "/paypal-donate/success",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Dashboard", "User"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  usePaypalDonateMutation,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useGetSubscriptionSuccessQuery,
  useGetOneTimeSuccessQuery,
  usePaypalDonateSuccessMutation,
} = paymentApi;
