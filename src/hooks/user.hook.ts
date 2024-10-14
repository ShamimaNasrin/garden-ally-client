/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@/context/user.provider";
import { getCurrentUser } from "@/service/AuthServices";
import { updateUserProfile } from "@/service/UserServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";

// export const useGetUserByEmail = (email: string) => {
//   return useQuery({
//     queryKey: ["GET_USER_BY_EMAIL"],
//     queryFn: async () => await getUserByEmail(email),
//   });
// };

// export const useGetUserByEmail = (email: string) => {
//   return useQuery({
//     queryKey: ["GET_USER_BY_EMAIL", email],
//     queryFn: () => getUserByEmail(email),
//     enabled: !!email, // Only run if email is provided
//     retry: 1, // Optional: retry once if request fails
//   });
// };

export type TUpdateProfile = {
  name: string;
  phone: string;
  address: string;
  profilePhoto: string;
};

// export const useUpdateUserProfile = (userId: string) => {
//   return useMutation({
//     mutationKey: ["UPDATE_PROFILE"],
//     mutationFn: (updatedInfo: TUpdateProfile) =>
//       updateUserProfile(userId, updatedInfo),
//     onSuccess: () => {
//       toast.success("Profile updated successfully");
//     },
//     onError: (error: any) => {
//       toast.error(error.message);
//     },
//   });
// };

export const useUpdateUserProfile = (userId: string) => {
  const { setUser } = useUser();

  return useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: (updatedInfo: TUpdateProfile) =>
      updateUserProfile(userId, updatedInfo),
    onSuccess: async (data) => {
      toast.success("Profile updated successfully");

      // Refetch the user with the new token
      const updatedUser = await getCurrentUser();
      setUser(updatedUser);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
