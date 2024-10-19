import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create user
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signUp",
        method: "POST",
        body: userInfo,
      }),
    }),
    // Query to logic user
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    // Mutation to forget password
    forgotPassword: builder.mutation({
      query: (userEmail) => ({
        url: "/auth//forget-password",
        method: "POST",
        body: userEmail,
      }),
    }),

    // Mutation to change password
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth//change-password",
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = authApi;
