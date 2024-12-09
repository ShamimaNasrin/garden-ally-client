/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useFetchUserByIdQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadImgToImgBB from "@/components/profile/UploadImgToImgBB";
import ChangePassword from "@/components/profile/ChangePassword";

interface TUpdateUserForm {
  name: string;
  phone: string;
  address: string;
  profilePhoto: string;
}

const AdminProfile = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const { data: updatedCurrentUser, isLoading: updatedCurrentUserLoading } =
    useFetchUserByIdQuery(currentUser?._id);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm<TUpdateUserForm>({
    defaultValues: {
      name: updatedCurrentUser?.name || "",
      phone: updatedCurrentUser?.phone || "",
      address: updatedCurrentUser?.address || "",
      // profilePhoto: updatedCurrentUser?.profilePhoto || "",
    },
  });

  // console.log("current user: ", currentUser);
  const [userLoading, setUserLoading] = useState(false);

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

  return (
    <div className="bg-zinc-50 mx-auto">
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
                </h1>
              </div>

              {/* user info layout */}
              <div className="max-w-[600px] mx-auto my-8 p-4">
                <div className="mb-5 rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
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
                          minLength: {
                            value: 8,
                            message: "Phone must be at least 8 characters long",
                          },
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

                <div className="mb-5 rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Change Password
                  </h2>
                  <ChangePassword />
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
