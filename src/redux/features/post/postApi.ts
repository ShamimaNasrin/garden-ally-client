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
    getAllPosts: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: ["post"],
    }),

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
  }),
});

export const {} = postApi;
