/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/lib/AxiosInstance";
import { TRegisterFormInput } from "@/app/(commonLayout)/register/page";
import { TLoginFormInput } from "@/app/(commonLayout)/login/page";

export const registerUser = async (userData: TRegisterFormInput) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    console.log("registerUser authservice:", data);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: TLoginFormInput) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    console.log("loginUser authservice:", data);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    console.log("decodedToken authservice:", decodedToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      phone: decodedToken.phone,
      role: decodedToken.role,
      profilePhoto: decodedToken.profilePhoto,
      favouritePosts: decodedToken.favouritePosts,
      address: decodedToken.address,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to get new access token");
  }
};

export const forgotPassword = async (userData: TLoginFormInput) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );
    console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
