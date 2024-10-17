/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const setTokenToCookies = (token: string) => {
  cookies().set("accessToken", token);
};

export const removeTokenFromCookies = () => {
  cookies().set("accessToken", "", { expires: new Date(0) });
  cookies().set("refreshToken", "", { expires: new Date(0) });
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    console.log("decodedToken getCurrentUser authservice:", decodedToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      phone: decodedToken.phone,
      address: decodedToken.address,
      role: decodedToken.role,
      profilePhoto: decodedToken.profilePhoto,
      favouritePosts: decodedToken.favouritePosts,
      isVerified: decodedToken.isVerified,
      followers: decodedToken.followers,
      followings: decodedToken.followings,
      isDeleted: decodedToken.isDeleted,
    };
  }

  return decodedToken;
};
