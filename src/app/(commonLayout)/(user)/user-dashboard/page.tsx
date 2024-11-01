"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard from "@/components/profile/PostCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyPostsQuery } from "@/redux/features/post/postApi";
import NoDataFound from "@/components/UI/NoDataFound";
import { TFollowUser, TNewsPost } from "@/types";
import { useFetchUserByIdQuery } from "@/redux/features/user/userApi";

const UserDashboard = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const { data: postData, isLoading: postLoading } = useGetMyPostsQuery(
    currentUser?._id
  );
  const { data: updatedCurrentUser, isLoading: updatedCurrentUserLoading } =
    useFetchUserByIdQuery(currentUser?._id);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setUserLoading(false);
    }
  }, [currentUser]);

  // console.log("current user: ", currentUser);

  return (
    <div className=" mx-auto">
      {userLoading || updatedCurrentUserLoading ? (
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
                  {/* followings list */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Following</h2>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex flex-wrap gap-4"
                    >
                      {updatedCurrentUser?.data?.followings?.length ? (
                        updatedCurrentUser?.data?.followings?.map(
                          (user: TFollowUser) => (
                            <div
                              key={user._id}
                              className="w-[158px] flex items-center space-x-2 bg-gray-50 p-2 rounded-lg shadow-md overflow-hidden"
                            >
                              <Image
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="profile picture"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <p className="text-sm text-nowrap">
                                  {user?.name}
                                  {/* {user?.name?.length <= 11
                                    ? user.name
                                    : user?.name?.slice(0, 10) +
                                      (user?.name?.length > 10 ? "..." : "")} */}
                                </p>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <NoDataFound />
                      )}
                    </motion.div>
                  </div>

                  {/* followers list */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Followers</h2>
                    <div className="flex flex-wrap gap-4">
                      {updatedCurrentUser?.data?.followers?.length ? (
                        updatedCurrentUser?.data?.followers?.map(
                          (user: TFollowUser) => (
                            <motion.div
                              initial={{ opacity: 0, y: 40 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 1 }}
                              key={user._id}
                              className="w-[158px] flex items-center space-x-2 bg-gray-50 p-2 rounded-lg shadow-md overflow-hidden"
                            >
                              <Image
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="profile picture"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <span className="text-sm">{user?.name}</span>
                            </motion.div>
                          )
                        )
                      ) : (
                        <NoDataFound />
                      )}
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
