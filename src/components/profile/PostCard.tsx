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

export type TPostCard = {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  description: string;
  images: string;
  isPremium: boolean;
  isUserVerified: boolean;
  upVoteNumber: number;
  category: string;
  downVoteNumber: number;
};

type TPostProps = {
  userId: string;
  post: TPostCard;
};

const PostCard = ({ userId, post }: TPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isUnLiked, setIsUnLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // share copy to clipboard feature
  const handleShare = async () => {
    const postUrl = `${window.location.origin}/news-feed/${post.id}`;
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
            <p>{post.authorName}</p>
          </div>

          <div className="flex justify-center items-center">
            <button
              className={`flex items-center gap-1 ${
                isFavorited ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setIsFavorited(!isFavorited)}
              disabled={
                post?.isPremium &&
                !post?.isUserVerified &&
                userId !== post?.authorId
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
              !post?.isUserVerified &&
              userId !== post?.authorId
                ? "blur-sm"
                : ""
            }
          >
            <Link href={`/news-feed/${post.id}`}>
              <div>
                <h3 className="text-lg font-semibold my-1">{post?.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {post?.description}
                </p>
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
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <AiTwotoneLike className="text-blue-500" />
                ) : (
                  <AiOutlineLike />
                )}{" "}
                <span className="text-sm">{post?.upVoteNumber} UpVote</span>
              </button>

              <button
                className="flex items-center gap-1 text-gray-500"
                onClick={() => setIsUnLiked(!isUnLiked)}
              >
                {isUnLiked ? (
                  <AiTwotoneDislike className="text-blue-500" />
                ) : (
                  <AiOutlineDislike />
                )}{" "}
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
            !post?.isUserVerified &&
            userId !== post?.authorId && (
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
