/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard from "@/components/profile/PostCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useGetMyPostsQuery } from "@/redux/features/post/postApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { IUser, TFavouritePost, TFollowUser, TNewsPost } from "@/types";
import NoDataFound from "@/components/UI/NoDataFound";
import {
  useAddFollowMutation,
  useFetchUserByIdQuery,
  useGetFollowSuggestionQuery,
  useUnFollowMutation,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import FavoritePostSection from "@/components/profile/FavoritePostSection";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadImgToImgBB from "@/components/profile/UploadImgToImgBB";

export interface TUserForm {
  _id?: string;
  role?: string;
  email?: string;
  name: string;
  phone: string;
  address: string;
  profilePhoto: string;
  favouritePosts?: Array<any>;
  isVerified?: boolean;
  followers?: string[];
  followings?: string[];
  isDeleted?: boolean;
}

// const posts = [
//   {
//     id: "1",
//     authorId: "user1",
//     authorName: "John",
//     title: "Post 1",
//     description: "This is the first post.",
//     images: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
//     isPremium: false,
//     isUserVerified: false,
//     category: "Vegetables",
//     upVoteNumber: 10,
//     downVoteNumber: 20,
//   },
//   {
//     id: "2",
//     authorId: "user2",
//     authorName: "Alex",
//     title: "Post 2",
//     description: "This is the second post.",
//     images: "https://i.ibb.co.com/YDnvjCd/garden2.jpg",
//     isPremium: false,
//     isUserVerified: false,
//     category: "Vegetables",
//     upVoteNumber: 90,
//     downVoteNumber: 5,
//   },
// ];

export interface FollowSuggestion {
  _id: string;
  name: string;
  profilePhoto: string;
  followers: string[];
  followings: string[];
}

interface TUpdateUserForm {
  name: string;
  phone: string;
  address: string;
  profilePhoto: string;
}

const UserProfile = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const { data: postData, isLoading: postLoading } = useGetMyPostsQuery(
    currentUser?._id
  );
  const { data: followSuggestions, isLoading: followSuggestionLoading } =
    useGetFollowSuggestionQuery(currentUser?._id);
  const { data: updatedCurrentUser, isLoading: updatedCurrentUserLoading } =
    useFetchUserByIdQuery(currentUser?._id);
  const [addFollow, { isLoading: isFollowLoading }] = useAddFollowMutation();
  const [unFollow, { isLoading: isUnFollowLoading }] = useUnFollowMutation();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TUpdateUserForm>({
    defaultValues: {
      name: updatedCurrentUser?.name || "",
      phone: updatedCurrentUser?.phone || "",
      address: updatedCurrentUser?.address || "",
      // profilePhoto: updatedCurrentUser?.profilePhoto || "",
    },
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  // console.log("user post: ", postData);
  // console.log("updatedCurrentUser: ", updatedCurrentUser);

  useEffect(() => {
    if (currentUser) {
      setUserLoading(false);
    }
  }, [currentUser]);

  // update user profile
  // useEffect(() => {
  //   if (updatedCurrentUser) {
  //     reset({
  //       name: updatedCurrentUser?.data?.name || "",
  //       phone: updatedCurrentUser?.data?.phone || "",
  //       address: updatedCurrentUser?.data?.address || "",
  //       profilePhoto: updatedCurrentUser?.data?.profilePhoto || "",
  //     });
  //   }
  // }, [updatedCurrentUser, reset]);

  useEffect(() => {
    if (updatedCurrentUser) {
      setValue("name", updatedCurrentUser?.data?.name);
      setValue("phone", updatedCurrentUser?.data?.phone);
      setValue("address", updatedCurrentUser?.data?.address);
    }
  }, [updatedCurrentUser, setValue]);

  const onSubmit: SubmitHandler<TUpdateUserForm> = async (data) => {
    // console.log("formdata:", data);

    if (data.profilePhoto && data.profilePhoto.length) {
      console.log("default img:", data.profilePhoto);
      try {
        const file = data.profilePhoto[0] as any;
        const imgBBUrl = await UploadImgToImgBB(file);
        data.profilePhoto = imgBBUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
        return;
      }
    } else {
      data.profilePhoto = "";
    }

    const userData = {
      name: data.name || updatedCurrentUser?.data?.name,
      phone: data.phone || updatedCurrentUser?.data?.phone,
      address: data.address || updatedCurrentUser?.data?.address,
      profilePhoto: data.profilePhoto || updatedCurrentUser?.data?.profilePhoto,
    };

    // console.log("userData:", userData);

    try {
      await updateUserProfile({
        userId: currentUser && currentUser?._id,
        updatedInfo: userData,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  // Handle follow user
  const handleFollowUser = async (followId: string) => {
    // console.log("followUser:", followId);
    if (currentUser) {
      try {
        await addFollow({
          userId: currentUser?._id,
          followId,
        }).unwrap();
        toast.success(`Successfully follow user`);
      } catch (error) {
        console.error("Failed to follow user:", error);
        toast.error(`Failed to Follow`);
      }
    }
  };

  // Handle unfollow user
  const handleUnFollowToggle = async (followingId: string) => {
    // console.log("unfollowUser:", followingId);
    if (currentUser) {
      try {
        await unFollow({
          userId: currentUser?._id,
          followingId,
        }).unwrap();
        toast.success(`Successfully unfollow user`);
      } catch (error) {
        console.error("Failed to unfollow user:", error);
        toast.error(`Failed to unFollow`);
      }
    }
  };

  const handleVerification = () => {
    console.log("handleVerification");
  };

  const handleChangePassword = () => {
    if (!oldPassword?.length || !newPassword?.length) {
      console.log("Password change:", oldPassword, newPassword);
      toast.error("Please provide your old and new password");
      return;
    }
  };

  return (
    <div className=" mx-auto">
      {userLoading || updatedCurrentUserLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {updatedCurrentUser?.data && (
            <>
              {/* name and image */}
              <div className="flex flex-col items-center p-6">
                <Image
                  src={updatedCurrentUser?.data?.profilePhoto}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold flex items-center">
                  {updatedCurrentUser?.data?.name}
                  {updatedCurrentUser?.data?.isVerified && (
                    <FaCheckCircle className="text-blue-500 ml-2" />
                  )}
                </h1>
                {!updatedCurrentUser?.data?.isVerified && (
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleVerification}
                  >
                    Verify Account
                  </button>
                )}
              </div>

              {/* Follow suggession  */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="container mx-auto py-6 xl:px-16 lg:px-16 md:px-8 px-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Follow Other user
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {followSuggestionLoading ? (
                    <LoadingSpinner />
                  ) : followSuggestions?.data?.length ? (
                    followSuggestions?.data?.map((suggestion: IUser) => (
                      <div
                        key={suggestion?._id}
                        className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg"
                      >
                        <Image
                          src={suggestion?.profilePhoto}
                          alt="Profile Picture"
                          width={80}
                          height={80}
                          className="rounded-full mb-4 shadow-lg"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {suggestion?.name}
                        </h3>
                        <button
                          onClick={() => handleFollowUser(suggestion?._id)}
                          className="px-4 py-1 mt-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                          disabled={isFollowLoading}
                        >
                          Follow
                        </button>
                      </div>
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </motion.div>

              {/* user info and post layout */}

              <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-6">
                {/* update user INfo */}
                <div className="xl:w-[40%] lg:w-[40%] md:w-[30%] w-full mt-8 px-4 rounded-lg ">
                  <>
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <input
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            {...register("phone", {
                              required: "Phone number is required",
                            })}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <input
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            {...register("address", {
                              required: "Address number is required",
                            })}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Profile Photo
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            placeholder="Add image"
                            {...register("profilePhoto")}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                          {errors.profilePhoto && (
                            <p className="text-red-500 text-sm">
                              {errors.profilePhoto.message}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          className={`px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 ${
                            isUpdating ? "opacity-50" : ""
                          }`}
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </button>
                      </form>
                    </div>
                  </>

                  {/* Change password */}
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>
                    <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
                      <form
                        onSubmit={handleChangePassword}
                        className="space-y-4"
                      >
                        <div className="flex flex-col">
                          <label className="font-medium">Old Password</label>
                          <input
                            type="text"
                            placeholder="Old Password"
                            name="oldPassword"
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">New Password</label>
                          <input
                            type="tel"
                            placeholder="New Password"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 rounded"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                        >
                          Confirm
                        </button>
                      </form>
                    </div>
                  </>

                  {/* favorite post */}
                  <>
                    <h1 className="text-xl font-semibold mb-4">Favorites</h1>

                    {updatedCurrentUser?.data?.favouritePosts?.length ? (
                      updatedCurrentUser?.data?.favouritePosts?.map(
                        (post: TFavouritePost) => (
                          <FavoritePostSection key={post._id} post={post} />
                        )
                      )
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                </div>

                {/* followings and post */}
                <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] w-full">
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
                                <p className="text-sm text-nowrap line-clamp-1">
                                  {user?.name}
                                </p>
                                <button
                                  onClick={() =>
                                    handleUnFollowToggle(user?._id)
                                  }
                                  className="text-blue-500 cursor-pointer text-xs hover:underline hover:text-blue-700"
                                  disabled={isUnFollowLoading}
                                >
                                  Unfollow
                                </button>
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
                              <span className="text-sm line-clamp-2">
                                {user?.name}
                              </span>
                            </motion.div>
                          )
                        )
                      ) : (
                        <NoDataFound />
                      )}
                    </div>
                  </div>

                  {/* my post */}
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

export default UserProfile;
