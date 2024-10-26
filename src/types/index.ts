/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPost = {
  _id: string;
  status: string;
  description: string;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  profilePhoto: string;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  profilePhoto: string;
  // favouritePosts?: string[];
  favouritePosts?: Array<any>;
  isVerified?: boolean;
  followers?: string[];
  followings?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TForgotPasswordInput {
  email: string;
}

export type TResetPasswordInput = {
  userId: string;
  newPassword: string;
  token: string;
};

// news feed
type TAuthor = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type TNewsPost = {
  _id: string;
  authorId: TAuthor;
  title: string;
  description: string;
  images: string;
  category: string;
  upVoteNumber: number;
  downVoteNumber: number;
  upVoterList: string[];
  downVoterList: string[];
  isPremium: boolean;
  isDeleted?: boolean;
  comments: string[];
  createdAt: string;
  updatedAt: string;
};
