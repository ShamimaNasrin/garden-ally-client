"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import EditPostModal from "@/components/profile/EditPostModal";
import { FaFileArrowDown } from "react-icons/fa6";
import { usePDF } from "react-to-pdf";
import {
  useAddCommentMutation,
  useDeletePostMutation,
  useGetSinglePostQuery,
} from "@/redux/features/post/postApi";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IoEllipsisVertical } from "react-icons/io5";
import ConfirmationModal from "@/components/UI/ConfirmationModal";
import { useRouter } from "next/navigation";

type TPostDetailsProps = {
  params: {
    postId: string;
  };
};

type TCommentator = {
  _id: string;
  name: string;
  profilePhoto: string;
};

export type TComment = {
  comment: string;
  commentatorId: TCommentator;
  isDeleted: boolean;
  _id: string;
};

// const comments: TComment[] = [
//   {
//     _id: "comment1",
//     comment: "This is an insightful post, thanks for sharing! ",
//     commentatorId: "user2",
//     isDeleted: false,
//   },
//   {
//     _id: "comment2",
//     comment:
//       "I totally agree with your points.This is an insightful post, thanks for sharing!This is an insightful post, thanks for sharing!",
//     commentatorId: "user1",
//     isDeleted: false,
//   },
//   {
//     _id: "comment3",
//     comment: "Can you elaborate more on this topic?",
//     commentatorId: "user3",
//     isDeleted: false,
//   },
// ];

const PostDetails = ({ params: { postId } }: TPostDetailsProps) => {
  const { data: post, isLoading: postLoading } = useGetSinglePostQuery(postId);
  const currentUser = useAppSelector(useCurrentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const [addComment] = useAddCommentMutation();
  const router = useRouter();

  // console.log("postId:", postId);
  console.log("single post:", post);

  const [newComment, setNewComment] = useState("");
  const [existCommentEdit, setExistCommentEdit] = useState("");
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);
  const [isCommentDelete, setIsCommentDelete] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { toPDF, targetRef } = usePDF({ filename: "post.pdf" });

  const openEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // console.log("dropdownOpen:", dropdownOpen);

  // delete post
  const handleDeletePost = async (postId: string) => {
    // console.log("post deleted:", postId);

    try {
      const res = await deletePost(postId).unwrap();
      if (res?.success) {
        console.log("delete res:", res?.message);
        toast.success("Post deleted successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete a post");
    }
    setShowDeleteModal(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return toast.error("Comment cannot be empty!");
    try {
      await addComment({
        postId,
        commentData: {
          comment: newComment,
          commentatorId: currentUser?._id && currentUser?._id,
        },
      }).unwrap();

      toast.success("Comment added!");
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleEditComment = (commentId: string) => {
    console.log("comment id:", commentId);
    if (!existCommentEdit.trim())
      return toast.error("Comment cannot be empty!");
    toast.success("Comment updated!");
    setExistCommentEdit("");
    setIsEditComment(false);
  };

  return (
    <div
      ref={targetRef}
      className="bg-gray-100 min-h-screen p-6 flex justify-center"
    >
      {postLoading ? (
        <LoadingSpinner />
      ) : post?.data ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <div className="flex justify-between items-start">
            <div className=" w-[90%] mb-2 ">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {post?.data?.title}
              </h2>

              {/* <p className="text-gray-600 text-md mb-6">
                {post?.data?.description}
              </p> */}
              <p
                className="text-gray-500 text-sm mb-2"
                dangerouslySetInnerHTML={{
                  __html: post?.data?.description,
                }}
              ></p>
            </div>

            <div className="relative flex w-[10%] justify-end items-center text-end ">
              <button onClick={() => toPDF()}>
                <FaFileArrowDown className="inline-block mr-1 " />
              </button>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`flex items-center justify-center text-gray-600 ${
                  currentUser?._id !== post?.data?.authorId?._id && "hidden"
                }`}
              >
                <IoEllipsisVertical className="text-lg" />
              </button>
              {dropdownOpen && (
                <ul
                  // className="absolute right-0 md:left-auto left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2"
                  className="absolute right-0 top-5 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10"
                  style={{ transform: "translateY(8px)" }}
                >
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                      onClick={() => {
                        openEditModal();
                        setDropdownOpen(false);
                      }}
                    >
                      <AiFillEdit /> <span>Edit post</span>
                    </button>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDropdownOpen(false);
                      }}
                    >
                      <FiTrash2 /> Delete post
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <Image
            src={post?.data?.images}
            alt={post?.data?.title}
            width={700}
            height={400}
            className="w-full h-auto rounded-lg mb-8 object-cover"
          />

          <div className="my-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {post?.data?.comments?.length} Comments
            </h2>
            <div className="space-y-6">
              {post?.data?.comments?.map((com: TComment) => (
                <div
                  key={com._id}
                  className=" bg-gray-50 p-4 rounded-lg shadow-sm "
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-[80%] flex self-center items-center ">
                      <Image
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt="profile picture"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <p className="ml-2 w-full text-wrap bg-gray-50  ">
                        {com?.comment}
                      </p>
                    </div>
                    <div
                      className={`w-[20%]  justify-self-end text-end self-center ${
                        currentUser?._id !== com?.commentatorId?._id && "hidden"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSelectedComment(com);
                          setIsEditComment(!isEditComment);
                        }}
                        className="mr-2 text-lg"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedComment(com);
                          setIsCommentDelete(true);
                        }}
                        className="text-lg text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  {currentUser?._id === com?.commentatorId?._id &&
                    isEditComment && (
                      <div className="flex items-center gap-3 mt-3">
                        <input
                          className="ml-1 w-full max-w-[600px] text-wrap bg-white border p-2 rounded"
                          placeholder="Add a comment"
                          onChange={(e) => setExistCommentEdit(e.target.value)}
                        />

                        <button
                          onClick={() => handleEditComment(com._id)}
                          className="bg-emerald-500 text-white px-2 py-1 rounded"
                        >
                          save
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="my-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Comment
            </h2>
            <input
              className="w-full p-3 border rounded-md text-gray-700"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="mt-4 w-full p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
            >
              Add Comment
            </button>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}

      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <EditPostModal post={post?.data} closeModal={setIsEditModalOpen} />
      )}
      {/* Delete Post Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePost(postId)}
      />
    </div>
  );
};

export default PostDetails;
