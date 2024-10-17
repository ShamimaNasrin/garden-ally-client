import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all user
    fetchAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Mutation to modify the user role
    modifyUserRole: builder.mutation({
      query: ({ userId, updatedInfo }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useFetchAllUserQuery, useModifyUserRoleMutation } = userApi;
