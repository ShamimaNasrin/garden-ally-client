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

const AdminProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    isVerified: true,
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const handleUpdateInfo = () => {
    console.log("User info updated!");
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
        </h1>
      </div>

      <div className="max-w-[600px] mx-auto my-8 p-4">
        <div className="mb-5 rounded-lg shadow-md p-4">
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

        <div className="mb-5 rounded-lg shadow-md p-4">
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
    </div>
  );
};

export default AdminProfile;
