"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard from "@/components/profile/PostCard";
// import { useUser } from "@/context/user.provider";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";

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
    category: "Vegetables",
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
    category: "Vegetables",
    upVoteNumber: 90,
    downVoteNumber: 5,
  },
];

const followingList = [
  {
    id: "1",
    name: "User One",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    isFollowing: true,
  },
  {
    id: "2",
    name: "User Two",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    isFollowing: false,
  },
];

const followersList = [
  {
    id: "3",
    name: "User Three",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    isFollowing: true,
  },
  {
    id: "4",
    name: "User Four",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    isFollowing: false,
  },
];

const UserDashboard = () => {
  const [userLoading, setUserLoading] = useState(false);

  // const { user: userInfo, isLoading: userLoading } = useUser();

  const userInfo = {
    name: "user1",
    phone: "078262",
    address: "bd",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    isVerified: false,
  };
  console.log("current user: ", userInfo);
  return (
    <div className=" mx-auto">
      {userLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {userInfo && (
            <>
              {/* name and image */}
              <div className="flex flex-col items-center p-6">
                <Image
                  src={userInfo?.profilePhoto}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold flex items-center">
                  {userInfo?.name}
                  {userInfo?.isVerified && (
                    <FaCheckCircle className="text-blue-500 ml-2" />
                  )}
                </h1>
              </div>

              {/* user info and post layout */}

              <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex justify-center  gap-6">
                {/* followings and post */}
                <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] w-full ">
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Following</h2>
                    <div className="flex flex-wrap gap-4">
                      {followingList.map((user) => (
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                          key={user.id}
                          className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
                        >
                          <Image
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="profile picture"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div>
                            <p>{user.name}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Followers</h2>
                    <div className="flex flex-wrap gap-4">
                      {followersList?.map((user) => (
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                          key={user.id}
                          className=" flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
                        >
                          <Image
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="profile picture"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <span>{user.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
