/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../service/AuthServices";
import toast from "react-hot-toast";
import { TRegisterFormInput } from "@/app/(commonLayout)/register/page";
import { TLoginFormInput } from "@/app/(commonLayout)/login/page";
import { TForgotPasswordInput, TResetPasswordInput } from "@/types";

export const useUserRegistration = () => {
  return useMutation<any, Error, TRegisterFormInput>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData: any) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, TLoginFormInput>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData: any) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, TForgotPasswordInput>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (email) => await forgotPassword(email),
    onSuccess: () => {
      toast.success("Reset link sent! Check your email.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reset link.");
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, TResetPasswordInput>({
    mutationFn: async (userData: any) => await resetPassword(userData),

    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Failed to reset password.");
    },
  });
};
