"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { RiCloseLine, RiUserLine } from "react-icons/ri";

// type TUser = {
//   role: "user" | "admin";
// };

const Navbar = () => {
  const links = [
    { name: "Home", path: "/home" },
    { name: "News Feed", path: "/news-feed" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact Us", path: "/contactus" },
    // { name: "Register", path: "/signup" },
  ];

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "Shamima",
    role: "user",
  });

  const handleLogout = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 xl:px-16 lg:px-16 md:px-10 px-7">
        <Link href="/" className="normal-case">
          <div className="font-bold text-2xl cursor-pointer flex items-center text-emerald-400">
            {/* <span className="text-3xl text-indigo-600 mr-1 pt-2">.</span> */}
            GardenAlly
          </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <RiCloseLine className="text-emerald-400" />
        </div>

        {/* Navigation links */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 md:static absolute bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-base md:my-0 my-7 text-black hover:text-gray-400 duration-500"
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}

          {/* Dropdown */}
          <div className="relative md:ml-8">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              <RiUserLine className="text-xl" />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 md:left-auto left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                {userDetails ? (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link
                        href={
                          userDetails.role === "user"
                            ? `/${userDetails.role}/user-dashboard`
                            : `/${userDetails.role}/admin-dashboard`
                        }
                        className="block text-sm text-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link
                        href="/profile"
                        className="block text-sm text-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link href="/login" className="block text-sm text-gray-700">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
