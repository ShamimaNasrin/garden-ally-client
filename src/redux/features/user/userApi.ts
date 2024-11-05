import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all user
    fetchAllUser: builder.query({
      query: (adminId) => ({
        url: `/users/getAllUsers/${adminId}`,
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

    // Query to fetch A user by ID
    fetchUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Query to fetch A user by Email
    fetchUserByEmail: builder.query({
      query: ({ userEmail }) => ({
        url: `/users/getUserByEmail/${userEmail}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Mutation to modify the user profile
    updateUserProfile: builder.mutation({
      query: ({ userId, updatedInfo }) => ({
        url: `/users/updateProfile/${userId}`,
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["user"],
    }),

    // Query to fetch all user
    getFollowSuggestion: builder.query({
      query: (userId) => ({
        url: `/users/followSuggestion/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Mutation for following other users
    addFollow: builder.mutation({
      query: ({ userId, followId }) => ({
        url: `/users/add-follow/${userId}`,
        method: "POST",
        body: { followId },
      }),
      invalidatesTags: ["user"],
    }),

    // Mutation for unfollow other users
    unFollow: builder.mutation({
      query: ({ userId, followingId }) => ({
        url: `/users/unfollow/${userId}`,
        method: "DELETE",
        body: { followingId },
      }),
      invalidatesTags: ["user"],
    }),

    // Mutation for add a post to favorites
    addFavoritePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/users/add-favorite/${userId}`,
        method: "POST",
        body: { postId },
      }),
      invalidatesTags: ["user"],
    }),

    // Mutation for remove a post from favorites
    removeFavoritePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/users/remove-favorite/${userId}`,
        method: "DELETE",
        body: { postId },
      }),
      invalidatesTags: ["user"],
    }),

    // Query to fetch all the favorites post
    getAllFavoritePosts: builder.query({
      query: (userId) => ({
        url: `/users/favorites/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Mutation for verify profile
    verifyProfile: builder.mutation({
      query: (userId) => ({
        url: `/users/get-premium/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    // Query for the user activity chart
    getUserActivityChart: builder.query({
      query: () => ({
        url: `/users/activity-chart`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useFetchAllUserQuery,
  useModifyUserRoleMutation,
  useFetchUserByIdQuery,
  useFetchUserByEmailQuery,
  useUpdateUserProfileMutation,
  useGetFollowSuggestionQuery,
  useAddFollowMutation,
  useUnFollowMutation,
  useAddFavoritePostMutation,
  useRemoveFavoritePostMutation,
  useGetAllFavoritePostsQuery,
  useVerifyProfileMutation,
  useGetUserActivityChartQuery,
} = userApi;
