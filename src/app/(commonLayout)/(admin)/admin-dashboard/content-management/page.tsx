/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import NoDataFound from "@/components/UI/NoDataFound";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "@/components/UI/ConfirmationModal";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

// Sample post data
const posts = [
  {
    id: "1",
    authorId: "user1",
    authorName: "John",
    title: "Post 1",
    description: "This is the first post.",
    imageUrl: "https://i.ibb.co/YDnvjCd/garden2.jpg",
    isPremium: true,
    isUserVerified: false,
    category: "Flowers",
    upVoteNumber: 10,
    downVoteNumber: 20,
  },
  {
    id: "2",
    authorId: "user2",
    authorName: "Alex",
    title: "Post 2",
    description: "This is the second post.",
    imageUrl: "https://i.ibb.co/YDnvjCd/garden2.jpg",
    isPremium: false,
    isUserVerified: false,
    category: "Vegetables",
    upVoteNumber: 90,
    downVoteNumber: 5,
  },
];

const headings = ["Image", "Post ID", "Author", "Title", "Category", "Actions"];

const ContentManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (postId: string) => {
    toast.success("Content deleted successfully!");
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-8 text-emerald-500">
        Content Management
      </h1>
      {isLoading ? (
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
              {posts?.length ? (
                posts?.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-violet-50 transition-colors duration-200"
                  >
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
                      {post.id}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
                      {post.authorName}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[150px]">
                      {post.title}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
                      {post.category}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-center min-w-[100px]">
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="text-lg text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                      <ConfirmationModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={() => handleDelete(post?.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
