// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import envConfig from "@/config/envConfig";
// import { TUpdateProfile } from "@/hooks/user.hook";
// import { cookies } from "next/headers";
// // import axiosInstance from "@/lib/AxiosInstance";

// // export const getUserByEmail = async (userEmail: string) => {
// //   try {
// //     console.log("Fetching user by email:", userEmail);
// //     const { data } = await axiosInstance.get(`/getUserByEmail/${userEmail}`);

// //     console.log("Fetching user by email data:", data);
// //     return data;
// //   } catch (error: any) {
// //     // console.error("Error fetching user:", error);
// //     throw new Error(error.message);
// //   }
// // };

// export const updateUserProfile = async (
//   userId: string,
//   updatedInfo: TUpdateProfile
// ) => {
//   const fetchOptions: any = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedInfo),
//     cache: "no-store",
//   };

//   // console.log("updateUserProfile ", userId, updatedInfo);

//   const res = await fetch(
//     `${envConfig.baseApi}/users/updateProfile/${userId}`,
//     fetchOptions
//   );

//   // console.log("updateUserProfile res", res);

//   if (!res.ok) {
//     throw new Error("Failed to update user profile");
//   }
//   const UpdateResponse = await res.json();
//   console.log("updateUserProfile res", UpdateResponse);

//   if (UpdateResponse?.success) {
//     // Save the new token in cookies
//     cookies().set("accessToken", UpdateResponse?.data?.accessToken);
//   }

//   return UpdateResponse;
// };
