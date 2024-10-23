/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AddPostModal from "@/components/profile/AddPostModal";
import PostCard from "@/components/profile/PostCard";
import React, { useState } from "react";

const posts = [
  {
    id: "1",
    authorId: "user1",
    authorName: "John",
    title: "Post 1",
    description: "This is the first post.",
    images: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
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
    images: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
    isPremium: false,
    isUserVerified: false,
    category: "Vegetables",
    upVoteNumber: 90,
    downVoteNumber: 5,
  },
];

const NewsFeedPage = () => {
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  // clear all filter
  const handleFilterClear = () => {
    setSearchByTitle("");
    setSearchByCategory("");
  };
  return (
    <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-6">
      {/* filter */}
      <div className="xl:w-[40%] lg:w-[40%] md:w-[30%] w-full mt-8 px-4 rounded-lg ">
        <div className="p-7 bg-white shadow-lg rounded-lg">
          {/* Capacity range filter */}
          <h4 className="font-bold text-lg  mt-2">By Category</h4>
          <div className="relative my-4">
            {" "}
            {/* Removed max-w-sm to allow full width */}
            <select
              value={searchByCategory}
              onChange={(e) => setSearchByCategory(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="5">Vegetables</option>
              <option value="10">Flowers</option>
              <option value="20">Landscaping</option>
              <option value="50">Indoor Plants</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548a.997.997 0 011.461 0L10 10.572l3.023-3.024a.997.997 0 011.461 0 .997.997 0 010 1.461l-3.75 3.75a.997.997 0 01-1.461 0l-3.75-3.75a.997.997 0 010-1.461z" />
              </svg>
            </div>
          </div>

          {/* Search by name or keywords */}
          <h4 className="font-bold text-lg  my-2">Search Post By Title</h4>
          <div>
            <input
              onChange={(e) => setSearchByTitle(e.target.value)}
              value={searchByTitle}
              type="text"
              placeholder="Search by Title"
              className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Clear Filters */}
          <div className=" flex xl:flex-row lg:flex-row md:flex-row gap-3 flex-col justify-center items-center mx-auto my-5">
            <div>
              <button
                onClick={() => setIsAddPostModalOpen(true)}
                className="bg-emerald-500 text-white  text-sm px-3 py-2 rounded-md transition-all duration-500 hover:bg-emerald-700 "
              >
                Add Post
              </button>
            </div>

            <div>
              <button
                onClick={handleFilterClear}
                className="bg-emerald-500 text-white  text-sm px-3 py-2 rounded-md transition-all duration-500 hover:bg-emerald-700 "
              >
                Clear filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post section */}
      <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] w-full">
        <div className="mt-8">
          <div className="">
            {posts.map((post) => (
              <PostCard key={post.id} userId="user1" post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Add post modal */}
      {isAddPostModalOpen && (
        <AddPostModal closeModal={setIsAddPostModalOpen} />
      )}
    </div>
  );
};

export default NewsFeedPage;
