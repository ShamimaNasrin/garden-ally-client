/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import PostCard, { TPostCard } from "@/components/profile/PostCard";

type User = {
  id: string;
  name: string;
  profilePhoto: string;
  isFollowing: boolean;
};

const UserProfile = () => {
  const [posts, setPosts] = useState<TPostCard[]>([
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
      isPremium: true,
      isUserVerified: false,
      upVoteNumber: 90,
      downVoteNumber: 5,
    },
  ]);

  const [following, setFollowing] = useState<User[]>([
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
  ]);

  const [followers, setFollowers] = useState<User[]>([
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
    // Add more followers here
  ]);

  const [userInfo, setUserInfo] = useState({
    id: "user1",
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    isVerified: true,
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const handleFollowToggle = (id: string) => {
    setFollowing((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const handleVerification = () => {
    setUserInfo((prev) => ({ ...prev, isVerified: true }));
  };

  const handleUpdateInfo = () => {
    alert("User info updated!");
  };

  const handleChangePassword = () => {
    console.log("User info updated!");
  };

  return (
    <div className=" mx-auto">
      {/* name and image */}
      <div className="flex flex-col items-center p-6">
        <Image
          src={userInfo.profilePhoto}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full mb-4 shadow-lg"
        />
        <h1 className="text-2xl font-semibold flex items-center">
          {userInfo.name}
          {userInfo.isVerified && (
            <FaCheckCircle className="text-blue-500 ml-2" />
          )}
        </h1>
        {!userInfo.isVerified && (
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleVerification}
          >
            Verify Account
          </button>
        )}
      </div>

      <div className="bg-zinc-100 py-6 xl:px-16 lg:px-16 md:px-8 px-6 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-6">
        {/* update user INfo */}
        <div className="xl:w-[40%] lg:w-[40%] md:w-[30%] w-full mt-8  p-4 rounded-lg ">
          <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <form onSubmit={handleUpdateInfo} className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  name="name"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Phone</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  name="phone"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={userInfo.address}
                  name="address"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update Info
              </button>
            </form>
          </div>

          <div className="mb-5 rounded-lg shadow-md p-4 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium">Old Password</label>
                <input
                  type="text"
                  placeholder="Old Password"
                  name="oldPassword"
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">New Password</label>
                <input
                  type="tel"
                  placeholder="New Password"
                  name="newPassword"
                  className="border p-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
            <div className="flex flex-wrap gap-4">
              {following.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
                >
                  <Image
                    src={user.profilePhoto}
                    alt={`${user.name}'s profile picture`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p>{user.name}</p>
                    <button
                      onClick={() => handleFollowToggle(user.id)}
                      className="text-blue-500 text-sm hover:underline hover:text-blue-700"
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Followers</h2>
            <div className="flex flex-wrap gap-4">
              {followers.map((user) => (
                <div
                  key={user.id}
                  className=" flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-md"
                >
                  <Image
                    src={user.profilePhoto}
                    alt="profile picture"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
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
    </div>
  );
};

export default UserProfile;
