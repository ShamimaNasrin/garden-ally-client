/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envConfig from "@/config/envConfig";
import { TUpdateProfile } from "@/hooks/user.hook";
// import axiosInstance from "@/lib/AxiosInstance";

// export const getUserByEmail = async (userEmail: string) => {
//   try {
//     console.log("Fetching user by email:", userEmail);
//     const { data } = await axiosInstance.get(`/getUserByEmail/${userEmail}`);

//     console.log("Fetching user by email data:", data);
//     return data;
//   } catch (error: any) {
//     // console.error("Error fetching user:", error);
//     throw new Error(error.message);
//   }
// };

export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/items/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const updateUserProfile = async (
  userId: string,
  updatedInfo: TUpdateProfile
) => {
  console.log("userId,", userId);
  console.log("Updating user profile", updatedInfo);
  console.log("url", `${envConfig.baseApi}/users/updateProfile/${userId}`);

  const fetchOptions: any = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
    cache: "no-store",
  };

  const res = await fetch(
    `${envConfig.baseApi}/users/updateProfile/${userId}`,
    fetchOptions
  );

  console.log("updateUserProfile res", res);

  if (!res.ok) {
    throw new Error("Failed to update user profile");
  }

  return res.json();
};
