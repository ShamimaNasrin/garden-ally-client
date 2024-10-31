"use client";

import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiTwotoneDislike,
} from "react-icons/ai";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TNewsPost } from "@/types";
import { useVotePostMutation } from "@/redux/features/post/postApi";

type TPostProps = {
  post: TNewsPost;
};

const PostCard = ({ post }: TPostProps) => {
  const currentUser = useAppSelector(useCurrentUser);
  const [isFavorited, setIsFavorited] = useState(false);

  const [votePost] = useVotePostMutation();

  // Handle vote change
  const handleVote = async (voteType: "upvote" | "downvote") => {
    // console.log("voteType:", voteType);

    if (!currentUser?._id) {
      toast.error("Please log in to vote.");
      return;
    }

    const voteObj = {
      postId: post._id,
      userId: currentUser._id,
      voteType: voteType,
    };

    // console.log("voteObj:", voteObj);

    // Send vote request to server
    try {
      await votePost(voteObj).unwrap();
      toast.success("Vote updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update vote. Please try again.");
    }
  };

  // share copy to clipboard feature
  const handleShare = async () => {
    const postUrl = `${window.location.origin}/news-feed/${post._id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success("Post link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link", error);
      toast.success("Failed to copy link, please try again.");
    }
  };

  return (
    <div className="my-5 max-w-[600px] bg-white rounded-lg overflow-hidden p-4 relative shadow-md hover:shadow-md ">
      <>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2 mb-2">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile picture`"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p>{post?.authorId?.name}</p>
          </div>

          <div className="flex justify-center items-center">
            <button
              className={`flex items-center gap-1 ${
                isFavorited ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setIsFavorited(!isFavorited)}
              disabled={
                post?.isPremium &&
                !currentUser?.isVerified &&
                currentUser?._id !== post?.authorId?._id
              }
            >
              {isFavorited ? <FaHeart /> : <FaRegHeart />}{" "}
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className={
              post?.isPremium &&
              !currentUser?.isVerified &&
              currentUser?._id !== post?.authorId?._id
                ? "blur-sm"
                : ""
            }
          >
            <Link href={`/news-feed/${post._id}`}>
              <div>
                <h3 className="text-lg font-semibold my-1">{post?.title}</h3>
                {/* <p className="text-gray-600 text-sm mb-2">
                  {post?.description}
                </p> */}
                <p
                  className="text-gray-500 text-sm mb-2"
                  dangerouslySetInnerHTML={{
                    __html: post?.description,
                  }}
                ></p>
                <Image
                  src={post?.images}
                  alt={post?.title}
                  width={300}
                  height={400}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              </div>
            </Link>

            <div className="flex items-center justify-between mt-2">
              <button
                className="flex items-center gap-1 text-gray-500"
                onClick={() => handleVote("upvote")}
              >
                {currentUser?._id &&
                post?.upVoterList.includes(currentUser?._id) ? (
                  <AiTwotoneLike className="text-blue-500" />
                ) : (
                  <AiOutlineLike />
                )}
                <span className="text-sm">{post?.upVoteNumber} UpVote</span>
              </button>

              <button
                className="flex items-center gap-1 text-gray-500"
                onClick={() => handleVote("downvote")}
              >
                {currentUser?._id &&
                post?.downVoterList.includes(currentUser?._id) ? (
                  <AiTwotoneDislike className="text-blue-500" />
                ) : (
                  <AiOutlineDislike />
                )}
                <span className="text-sm">{post?.downVoteNumber} DownVote</span>
              </button>

              <div className="flex items-center gap-1 text-gray-500">
                <FaComment />{" "}
                <span className="text-sm cursor-pointer">Comments</span>
              </div>

              <div
                onClick={handleShare}
                className="flex items-center gap-1 text-gray-500"
              >
                <IoShareSocialSharp />{" "}
                <span className="text-sm cursor-pointer">Share</span>
              </div>
            </div>
          </div>

          {post?.isPremium &&
            !currentUser?.isVerified &&
            currentUser?._id !== post?.authorId?._id && (
              <div className="absolute inset-0 bg-white/30 text-lg flex items-center justify-center text-black font-bold">
                Premium Content
              </div>
            )}
        </div>
      </>

      {/* Delete Post Modal */}
      {/* <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePost(post?.id)}
      /> */}
    </div>
  );
};

export default PostCard;
