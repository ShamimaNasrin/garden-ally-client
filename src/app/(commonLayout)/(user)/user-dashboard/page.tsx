"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard from "@/components/profile/PostCard";
// import { useUser } from "@/context/user.provider";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyPostsQuery } from "@/redux/features/post/postApi";
import NoDataFound from "@/components/UI/NoDataFound";
import { TNewsPost } from "@/types";

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
  const currentUser = useAppSelector(useCurrentUser);
  const { data: postData, isLoading: postLoading } = useGetMyPostsQuery(
    currentUser?._id
  );
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setUserLoading(false);
    }
  }, [currentUser]);

  console.log("current user: ", currentUser);
  return (
    <div className=" mx-auto">
      {userLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentUser && (
            <>
              {/* name and image */}
              <div className="flex flex-col items-center p-6">
                <Image
                  src={currentUser?.profilePhoto}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold flex items-center">
                  {currentUser?.name}
                  {currentUser?.isVerified && (
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
                          key={user?.id}
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
                            <p>{user?.name}</p>
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
                          key={user?.id}
                          className=" flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
                        >
                          <Image
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="profile picture"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <span>{user?.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Posts</h2>
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
