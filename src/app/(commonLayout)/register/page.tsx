"use client";

import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useUserRegistration } from "@/hooks/auth.hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface TRegisterFormInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profilePhoto: string;
}

// const profilePhoto =  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormInput>();

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const router = useRouter();

  const onSubmit: SubmitHandler<TRegisterFormInput> = async (data) => {
    //   console.log(data);
    const userData = {
      ...data,
      role: "user",
    };

    handleUserRegistration(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-8 space-y-6 xl:w-[38%] lg:w-[38%] md:w-[60%] sm:w-[80%] w-[90%] relative overflow-hidden"
        >
          <h2 className="text-2xl font-semibold text-center text-emerald-500 font-sans">
            Sign Up
          </h2>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                  message: "Please enter a valid email address",
                },
              })}
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profilePhoto"
            >
              Image URL
            </label>
            <input
              type="text"
              id="profilePhoto"
              {...register("profilePhoto", {
                required: "Image url is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-emerald-600"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?
              <Link
                href="/login"
                className="text-emerald-500 hover:text-emerald-600 font-semibold"
              >
                <span className=""> Log in</span>
              </Link>
            </p>
          </div>

          {/* Green Circles */}
          <div className="absolute -top-4 -left-5 w-14 h-14 bg-emerald-200 rounded-full opacity-50 transform transition-all duration-300"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-300 rounded-full opacity-50 transform transition-all duration-300"></div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
