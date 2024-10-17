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
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
