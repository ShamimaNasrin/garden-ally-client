import PostCard from "@/components/profile/PostCard";
import React from "react";

const posts = [
  {
    id: "1",
    authorId: "user1",
    authorName: "John",
    title: "Post 1",
    description: "This is the first post.",
    imageUrl: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
    isPremium: false,
    isUserVerified: false,
    upVoteNumber: 10,
    downVoteNumber: 20,
  },
  {
    id: "2",
    authorId: "user2",
    authorName: "Alex",
    title: "Post 2",
    description: "This is the second post.",
    imageUrl: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
    isPremium: false,
    isUserVerified: false,
    upVoteNumber: 90,
    downVoteNumber: 5,
  },
];

const NewsFeedPage = () => {
  return (
    <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-6">
      {/* update user INfo */}
      <div className="xl:w-[40%] lg:w-[40%] md:w-[30%] w-full mt-8 p-4 rounded-lg"></div>

      {/* Post section */}
      <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] w-full">
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="">
            {posts.map((post) => (
              <PostCard key={post.id} userId="user1" post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;
