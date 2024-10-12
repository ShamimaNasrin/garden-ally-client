"use client";

import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { useForgotPassword } from "@/hooks/auth.hook";

interface ForgotPasswordInput {
  email: string;
}

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>();
  const { mutate: handleForgotPassword, isPending } = useForgotPassword();
  //   const router = useRouter();

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
    // console.log(data);
    handleForgotPassword(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg px-10 py-8 space-y-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] relative overflow-hidden"
      >
        <h2 className="text-3xl font-semibold text-center text-emerald-500">
          Forgot Password
        </h2>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-emerald-600 transition-colors duration-300"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
