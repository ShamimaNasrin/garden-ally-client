/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../service/AuthServices";
import toast from "react-hot-toast";
import { TRegisterFormInput } from "@/app/(commonLayout)/register/page";
import { TLoginFormInput } from "@/app/(commonLayout)/login/page";

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
