import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a new post
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/post/create-post",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["post"],
    }),

    // Query to fetch all posts

    // getAllPosts: builder.query({
    //   query: (queryParams) => {
    //     const searchParams = new URLSearchParams(queryParams).toString();
    //     return {
    //       url: `/post?${searchParams}`,
    //       method: "GET",
    //       // params: searchParams,
    //     };
    //   },
    //   providesTags: ["post"],
    // }),

    getAllPosts: builder.query({
      query: (queryParams) => {
        const searchParams = new URLSearchParams(queryParams).toString();
        const url = searchParams ? `/post?${searchParams}` : `/post`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),

    // fetchFilteredItems: builder.query({
    //   query: (filterParams) => {
    //     const searchParams = new URLSearchParams();
    //     if (filterParams?.search)
    //       searchParams.append("search", filterParams.search);
    //     if (filterParams?.minPrice)
    //       searchParams.append("minPrice", filterParams.minPrice);
    //     if (filterParams?.maxPrice)
    //       searchParams.append("maxPrice", filterParams.maxPrice);
    //     if (filterParams?.minCapacity)
    //       searchParams.append("minCapacity", filterParams.minCapacity);
    //     if (filterParams?.maxCapacity)
    //       searchParams.append("maxCapacity", filterParams.maxCapacity);
    //     if (filterParams?.sortBy)
    //       searchParams.append("sortBy", filterParams.sortBy);

    //     return {
    //       url: "/rooms",
    //       method: "GET",
    //       params: searchParams,
    //     };
    //   },
    //   providesTags: ["room"],
    // }),

    // Query to fetch a single post
    getSinglePost: builder.query({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    // Query to fetch my posts
    getMyPosts: builder.query({
      query: () => ({
        url: `/post/my-posts`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    // Mutation for deleting a post by ID
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),

    // Mutation to update post
    updateAPost: builder.mutation({
      query: ({ postId, updatedInfo }) => ({
        url: `post/${postId}`,
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["post"],
    }),

    // Mutation for handling upvote and downvote
    votePost: builder.mutation({
      query: ({ postId, userId, voteType }) => ({
        url: `/post/vote/${postId}`,
        method: "POST",
        body: { userId, voteType },
      }),
      invalidatesTags: ["post"],
    }),

    // Mutation to add a comment
    addComment: builder.mutation({
      query: ({ postId, commentData }) => ({
        url: `/post/add-comment/${postId}`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["post"],
    }),

    // Mutation to update a comment
    updateComment: builder.mutation({
      query: ({ postId, commentId, updatedComment }) => ({
        url: `/post/${postId}/comment/${commentId}`,
        method: "PATCH",
        body: updatedComment,
      }),
      invalidatesTags: ["post"],
    }),

    // Mutation to delete a comment
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/post/${postId}/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useUpdateAPostMutation,
  useVotePostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = postApi;
