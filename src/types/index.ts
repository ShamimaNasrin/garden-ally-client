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
  password?: string;
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

export interface TUpdatedUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  profilePhoto: string;
  favouritePosts?: Array<any>;
  isVerified?: boolean;
  followers?: Array<any>;
  followings?: Array<any>;
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
  profilePhoto: string;
};

type TCommentator = {
  _id: string;
  name: string;
  profilePhoto: string;
};

type TComment = {
  comment: string;
  commentatorId: TCommentator;
  isDeleted: boolean;
  _id: string;
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
  comments: TComment[];
  createdAt: string;
  updatedAt: string;
};
