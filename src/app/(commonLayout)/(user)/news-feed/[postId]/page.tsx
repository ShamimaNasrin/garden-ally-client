"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import EditPostModal from "@/components/profile/EditPostModal";

type TPostDetailsProps = {
  params: {
    postId: string;
  };
};

export type TComment = {
  _id: string;
  comment: string;
  commentatorId: string;
  isDeleted: boolean;
};

const comments: TComment[] = [
  {
    _id: "comment1",
    comment: "This is an insightful post, thanks for sharing! ",
    commentatorId: "user2",
    isDeleted: false,
  },
  {
    _id: "comment2",
    comment:
      "I totally agree with your points.This is an insightful post, thanks for sharing!This is an insightful post, thanks for sharing!",
    commentatorId: "user1",
    isDeleted: false,
  },
  {
    _id: "comment3",
    comment: "Can you elaborate more on this topic?",
    commentatorId: "user3",
    isDeleted: false,
  },
];

const userId = "user1";

const post = {
  id: "1",
  authorId: "user1",
  authorName: "John",
  title: "Post 1",
  description: "This is the first post.",
  imageUrl: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
  isPremium: false,
  isUserVerified: false,
  category: "Vegetables",
  upVoteNumber: 10,
  downVoteNumber: 20,
};

const PostDetails = ({ params: { itemId } }: TPostDetailsProps) => {
  const [newComment, setNewComment] = useState("");
  const [existCommentEdit, setExistCommentEdit] = useState("");
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // delete post
  const handleDeletePost = async (postId: string) => {
    console.log("post deleted:", postId);
    // try {
    //   const res = await removeBooking(bookingId).unwrap();
    //   if (res?.success) {
    //     console.log("delete res:", res?.message);
    //     toast.success("booking deleted successfully!");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Failed to Delete booking");
    // }
    setShowDeleteModal(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return toast.error("Comment cannot be empty!");
    toast.success("Comment added!");
    setNewComment("");
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
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-start">
          <div className=" w-[90%] mb-2 ">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {post.title}
            </h2>
            <p className="text-gray-600 text-md mb-6">{post.description}</p>
          </div>

          <div className=" w-[10%] justify-self-end text-end ">
            <button
              className={`mr-1 ${userId !== post?.authorId && "hidden"}`}
              onClick={openEditModal}
            >
              <AiFillEdit />
            </button>
          </div>
        </div>

        <Image
          src={post?.imageUrl}
          alt={post?.title}
          width={700}
          height={400}
          className="w-full h-auto rounded-lg mb-8 object-cover"
        />

        <div className="my-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {comments?.length} Comments
          </h2>
          <div className="space-y-6">
            {comments?.map((com) => (
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
                      userId !== com?.commentatorId && "hidden"
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
                        setIsDelete(true);
                      }}
                      className="text-lg text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {userId === com?.commentatorId && isEditComment && (
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

      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <EditPostModal post={post} closeModal={setIsEditModalOpen} />
      )}
    </div>
  );
};

export default PostDetails;
