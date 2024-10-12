/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserLogin } from "@/hooks/auth.hook";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useUser } from "@/context/user.provider";

export interface TLoginFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInput>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<TLoginFormInput> = async (data) => {
    console.log(data);
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg px-10 py-8 space-y-6 xl:w-[33%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%] relative overflow-hidden"
        >
          <h2 className="text-3xl font-semibold text-center text-emerald-500">
            Login
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

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-emerald-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-emerald-500 hover:text-emerald-600 text-sm"
            >
              Forgot Password?
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don’t have an account yet?
              <a
                href="/register"
                className="text-emerald-500 hover:text-emerald-600 font-semibold"
              >
                {" "}
                Sign up
              </a>
            </p>
          </div>

          {/* Decorative circles for styling */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-200 rounded-full opacity-50 group-hover:scale-125 transform transition-all duration-300"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-300 rounded-full opacity-50 group-hover:scale-125 transform transition-all duration-300"></div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
