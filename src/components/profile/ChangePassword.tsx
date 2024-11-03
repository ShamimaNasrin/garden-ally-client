/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>();

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (formData) => {
    // console.log("Password change formData:", formData);
    try {
      await changePassword(formData).unwrap();
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            // type="password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            // type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isChangingPassword}
          className={`px-4 py-2 text-white rounded ${
            isChangingPassword
              ? "bg-gray-400"
              : "bg-emerald-500  hover:bg-emerald-600"
          } text-white rounded`}
        >
          {isChangingPassword ? "Updating..." : "Change Password"}
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
