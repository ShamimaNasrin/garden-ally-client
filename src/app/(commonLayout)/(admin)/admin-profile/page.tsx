/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/user.provider";
import { TUserForm } from "../../(user)/user-profile/page";
import { useUpdateUserProfile } from "@/hooks/user.hook";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

// type User = {
//   id: string;
//   name: string;
//   profilePhoto: string;
//   isFollowing: boolean;
// };

const AdminProfile = () => {
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

                <div className="mb-5 rounded-lg shadow-md p-4">
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProfile;
