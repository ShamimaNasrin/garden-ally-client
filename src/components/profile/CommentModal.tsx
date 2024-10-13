"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { TPostCard } from "./PostCard";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

type CommentModalProps = {
  post: TPostCard;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TComment = {
  _id?: string;
  comment: string;
  commentatorId: string;
  isDeleted: boolean;
};

const comments: TComment[] = [
  {
    _id: "comment1",
    comment: "This is an insightful post, thanks for sharing!",
    commentatorId: "user2",
    isDeleted: false,
  },
  {
    _id: "comment2",
    comment: "I totally agree with your points.",
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

const CommentModal = ({ post, closeModal }: CommentModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [existComment, setExistComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);
  const [isDelete, setIsDelete] = useState(false);

  const userId = "user1";

  const handleAddComment = () => {
    if (!newComment.trim()) return toast.error("Comment cannot be empty!");
    toast.success("Comment added!");
    setNewComment("");
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-[700px] max-h-[80%] shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
        <p className="text-sm mb-4">{post.description}</p>

        <Image
          src={post?.imageUrl}
          alt={post?.title}
          width={300}
          height={400}
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <div className="my-8">
          <h2 className="text-md font-semibold mb-4">
            {comments?.length} Comments
          </h2>
          <div className="flex flex-wrap gap-4">
            {comments?.map((com) => (
              <div
                key={com._id}
                className="flex w-full items-center justify-between space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
              >
                <div className="w-[85%] flex items-center">
                  <Image
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="profile picture"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <input
                    className="ml-1 w-full text-wrap bg-gray-50 p-2 mb-4 rounded"
                    placeholder="Add a comment"
                    value={com?.comment}
                    onChange={(e) => setExistComment(e.target.value)}
                  />
                </div>
                <div
                  className={`w-[15%] ${
                    userId !== com?.commentatorId && "hidden"
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedComment(com);
                    }}
                    className="mr-2 text-lg"
                  >
                    <AiOutlineEdit />
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
            ))}
          </div>
        </div>

        <h2 className="text-md font-semibold mb-4">Add Comment</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-center items-center">
          {" "}
          <button
            onClick={handleAddComment}
            className="mx-auto p-2 bg-emerald-500 text-white rounded mb-3"
          >
            Add Comment
          </button>
        </div>
        <button
          onClick={() => closeModal(false)}
          className="w-full py-2 text-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
