/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import NoDataFound from "@/components/UI/NoDataFound";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "@/components/UI/ConfirmationModal";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "@/redux/features/post/postApi";
import { TNewsPost } from "@/types";

const headings = ["Image", "Post ID", "Author", "Title", "Category", "Actions"];

type TableRowProps = {
  post: TNewsPost;
  setShowDeleteModal: (value: boolean) => void;
  setPostId: (value: string) => void;
};

const ContentManagement = () => {
  const { data: posts, isLoading: postLoading } = useGetAllPostsQuery({});
  const [deletePost] = useDeletePostMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postId, setPostId] = useState("");

  console.log("posts:", posts?.data?.length);

  // delete post
  const handleDeletePost = async (postId: string) => {
    console.log("post deleted:", postId);

    try {
      const res = await deletePost(postId).unwrap();
      console.log("delete res:", res);
      if (res?.success) {
        // console.log("delete res:", res?.message);
        toast.success("Post deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete a post");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-8 text-emerald-500">
        Content Management
      </h1>
      {postLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left table-auto border-collapse shadow-lg rounded-lg overflow-hidden bg-white">
            <thead>
              <tr className="bg-gray-600 text-white">
                {headings.map((heading, i) => (
                  <th
                    key={i}
                    className="min-w-[100px] border-b border-gray-800 px-4 py-3 text-center font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts?.data?.length ? (
                posts?.data?.map((post: TNewsPost) => (
                  <TableRow
                    key={post?._id}
                    post={post}
                    setShowDeleteModal={setShowDeleteModal}
                    setPostId={setPostId}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePost(postId)}
      />
    </div>
  );
};

const TableRow = ({ post, setShowDeleteModal, setPostId }: TableRowProps) => {
  return (
    <>
      <tr className="hover:bg-violet-50 transition-colors duration-200">
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
          <div className="w-[60px] h-[50px]">
            <Image
              src={post?.images}
              alt={post?.title}
              width={60}
              height={50}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </td>
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
          {post?._id}
        </td>
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
          {post?.authorId?.name}
        </td>
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[150px]">
          {post?.title?.length <= 26
            ? post?.title
            : post?.title?.slice(0, 26) +
              (post?.title?.length > 26 ? "..." : "")}
        </td>
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
          {post?.category}
        </td>
        <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
          <button
            onClick={() => {
              setShowDeleteModal(true);
              setPostId(post?._id);
            }}
            className="text-lg text-red-600"
          >
            <FiTrash2 />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ContentManagement;
