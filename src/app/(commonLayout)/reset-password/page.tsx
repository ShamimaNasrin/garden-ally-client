"use client";

import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
// import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResetPasswordFormInputs {
  newPassword: string;
}

const ResetPassword = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resetToken = searchParams.get("token");

  // console.log("email: " + email);
  // console.log("token: " + resetToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    // console.log("formData:", data);
    if (email && resetToken) {
      try {
        const res = await resetPassword({
          resetToken,
          payload: {
            token: resetToken,
            userEmail: email,
            newPassword: data.newPassword,
          },
        }).unwrap();

        // console.log("resetPassword res:", res);
        if (res?.success) {
          toast.success("Password updated");
          reset();
        }
      } catch (error) {
        console.error("Failed to reset password:", error);
        toast.error(`Failed to reset password`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg px-10 py-8 space-y-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] relative overflow-hidden"
      >
        <h2 className="text-3xl font-semibold text-center text-emerald-500">
          Reset Your Password
        </h2>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-emerald-600 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
