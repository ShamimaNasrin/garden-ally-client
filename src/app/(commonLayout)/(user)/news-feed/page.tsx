/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AddPostModal from "@/components/profile/AddPostModal";
import PostCard from "@/components/profile/PostCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
import { TNewsPost } from "@/types";
import React, { useState } from "react";

const NewsFeedPage = () => {
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  // Dynamically build query parameters based on non-empty values
  const queryParams: Record<string, string> = {};
  if (searchByTitle) queryParams.searchTerm = searchByTitle;
  if (searchByCategory) queryParams.category = searchByCategory;

  const { data: postData, isLoading: postLoading } =
    useGetAllPostsQuery(queryParams);

  // clear all filter
  const handleFilterClear = () => {
    setSearchByTitle("");
    setSearchByCategory("");
  };

  return (
    // <div className="bg-zinc-50 h-screen overflow-hidden xl:px-16 lg:px-16 md:px-8 px-6 flex flex-col xl:flex-row lg:flex-row md:flex-row gap-6">
    <div className="bg-zinc-50 h-screen overflow-hidden flex flex-col xl:flex-row lg:flex-row md:flex-row">
      {/* Filter Section */}
      <div className="h-full xl:w-[25%] lg:w-[25%] md:w-[30%] w-full p-4 hidden md:block border-r ">
        <div className="p-7 border-b">
          <h4 className="font-bold text-lg mt-2">By Category</h4>
          <div className="relative my-4">
            <select
              value={searchByCategory}
              onChange={(e) => setSearchByCategory(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Vegetables">Vegetables</option>
              <option value="Flowers">Flowers</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Indoor Plants">Indoor Plants</option>
            </select>
          </div>
          <h4 className="font-bold text-lg my-2">Search By Title</h4>
          <div>
            <input
              onChange={(e) => setSearchByTitle(e.target.value)}
              value={searchByTitle}
              type="text"
              placeholder="Search by Title"
              className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 flex-col xl:flex-row lg:flex-row md:flex-row justify-center items-center mx-auto my-5">
            <button
              onClick={() => setIsAddPostModalOpen(true)}
              className="bg-emerald-500 text-white text-sm px-3 py-2 rounded-md transition-all duration-500 hover:bg-emerald-700"
            >
              Add Post
            </button>
            <button
              onClick={handleFilterClear}
              className="bg-emerald-500 text-white text-sm px-3 py-2 rounded-md transition-all duration-500 hover:bg-emerald-700"
            >
              Clear filter
            </button>
          </div>
        </div>
      </div>

      {/* Post Section */}
      <div className="xl:w-[50%] lg:w-[50%] md:w-[70%] w-full flex justify-center mx-auto overflow-y-auto">
        <div className="">
          {postLoading ? (
            <LoadingSpinner />
          ) : postData?.data?.length ? (
            postData?.data?.map((post: TNewsPost) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="h-full xl:w-[25%] lg:w-[25%] md:w-[30%] w-full p-4 hidden md:block border-l">
        <div className="p-7 border-b">
          <h4 className="font-bold text-lg">Trending Topics</h4>
          <ul className="mt-4 space-y-3">
            <li className="text-sm text-gray-700 hover:underline cursor-pointer">
              Gardening Tips for Beginners
            </li>
            <li className="text-sm text-gray-700 hover:underline cursor-pointer">
              Best Indoor Plants for Air Purification
            </li>
            <li className="text-sm text-gray-700 hover:underline cursor-pointer">
              How to Start Composting at Home
            </li>
            <li className="text-sm text-gray-700 hover:underline cursor-pointer">
              Seasonal Gardening Checklist
            </li>
            <li className="text-sm text-gray-700 hover:underline cursor-pointer">
              Organic Pest Control Methods
            </li>
          </ul>
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
