import { baseApi } from "../api/baseApi";
import { setCredentials, logout as logoutAction } from "../slices/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              token: data.data.token,
              user: data.data.user,
            })
          );
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    resendOtp: builder.mutation({
      query: (emailData) => ({
        url: "/resend-otp",
        method: "POST",
        body: emailData,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/verify-forgot-otp",
        method: "POST",
        body: otpData,
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAction());
        } catch (err) {
          console.error("Logout failed", err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
} = authApi;
