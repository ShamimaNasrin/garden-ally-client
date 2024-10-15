/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard from "@/components/profile/PostCard";
import { useUser } from "@/context/user.provider";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useUpdateUserProfile } from "@/hooks/user.hook";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type User = {
  id: string;
  name: string;
  profilePhoto: string;
  isFollowing: boolean;
};

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

export interface FollowSuggestion {
  _id: string;
  name: string;
  profilePhoto: string;
  followers: string[];
  followings: string[];
}

const followSuggestions = [
  {
    _id: "follow1",
    name: "Devid Paul",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
  },
  {
    _id: "follow2",
    name: "John Snow",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
  },
  {
    _id: "follow7",
    name: "Brad Stark",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
  },
  {
    _id: "follow5",
    name: "Sansa Stark",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
  },
  {
    _id: "follow3",
    name: "Ariya Stark",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
  },
  {
    _id: "follow4",
    name: "Alex",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    followers: ["user1"],
    followings: ["user2"],
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

const UserProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { user: userInfo, isLoading: userLoading } = useUser();
  console.log("current user: ", userInfo);

  const [formData, setFormData] = useState<TUserForm>({
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
    profilePhoto: userInfo?.profilePhoto || "",
  });

  const {
    data: updatedUser,
    mutate: updateUserProfile,
    isSuccess: isUpdateProfileTrue,
  } = useUpdateUserProfile(userInfo?._id || "");

  // console.log("updated user: ", updatedUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrorMessage("");
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("userLoading:", userLoading);

    if (formData.name.length === 0) {
      console.log("name:", userInfo.name);
      setFormData({
        ...formData,
        name: userInfo?.name,
      });
    }
    if (formData.phone.length === 0) {
      console.log("phone:", userInfo.phone);
      setFormData({
        ...formData,
        phone: userInfo?.phone,
      });
    }
    if (formData.address.length === 0) {
      console.log("address:", userInfo.address);
      setFormData({
        ...formData,
        address: userInfo?.address,
      });
    }
    if (formData.profilePhoto.length === 0) {
      console.log("profilePhoto:", userInfo.profilePhoto);
      setFormData({
        ...formData,
        profilePhoto: userInfo?.profilePhoto,
      });
    }

    console.log("update user:", formData);

    if (
      formData.name.length ||
      formData.phone.length ||
      formData.address.length ||
      formData.profilePhoto.length
    ) {
      updateUserProfile(formData);
    }

    if (isUpdateProfileTrue) {
      toast.success("Profile updated");
    }
    // If all URLs are valid, proceed with form submission
    setErrorMessage("");
  };

  const handleFollowUser = (id: string) => {
    console.log("followUser:", id);
  };
  const handleUnFollowToggle = (id: string) => {
    console.log("UnFollowUser:", id);
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
                {!userInfo?.isVerified && (
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
                  {followSuggestions?.map((suggestion) => (
                    <div
                      key={suggestion?._id}
                      className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg"
                    >
                      <Image
                        src={suggestion.profilePhoto}
                        alt="Profile Picture"
                        width={80}
                        height={80}
                        className="rounded-full mb-4 shadow-lg"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {suggestion.name}
                      </h3>
                      <button
                        onClick={() => handleFollowUser(suggestion?._id)}
                        className="px-4 py-1 mt-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                      >
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* user info and post layout */}

              <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-6">
                {/* update user INfo */}
                <div className="xl:w-[40%] lg:w-[40%] md:w-[30%] w-full mt-8  p-4 rounded-lg ">
                  <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">User Info</h2>
                    <form onSubmit={handleUpdateUser} className="space-y-4">
                      <div className="flex flex-col">
                        <label className="font-medium">Name</label>
                        <input
                          type="text"
                          name="name"
                          // value={formData.name}
                          placeholder={userInfo.name}
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Phone</label>
                        <input
                          type="number"
                          // value={userInfo.phone}
                          placeholder={userInfo.phone}
                          name="phone"
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Address</label>
                        <input
                          type="text"
                          // value={formData.address}
                          placeholder={userInfo.address}
                          name="address"
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Image Url</label>
                        <input
                          type="text"
                          // value={formData.profilePhoto}
                          placeholder={userInfo.profilePhoto}
                          name="profilePhoto"
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                        disabled={errorMessage !== ""}
                      >
                        Update Info
                      </button>
                    </form>
                  </div>

                  <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
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
                </div>

                {/* followings and post */}
                <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] w-full">
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Following</h2>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex flex-wrap gap-4"
                    >
                      {followingList.map((user) => (
                        <div
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
                            <button
                              onClick={() => handleUnFollowToggle(user.id)}
                              className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                            >
                              Unfollow
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
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

export default UserProfile;
