"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { PiInstagramLogo } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiYoutube } from "react-icons/si";
import brandlogo from "@/assets/images/brandlogo.png";

const links = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const services = [
  { name: "Rooms", path: "/rooms" },
  { name: "Terms of Service", path: "/terms" },
];

const faqs = [
  { name: "FAQ", path: "/faqs" },
  { name: "Privacy Policy", path: "/privacy" },
];

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-50 to-zinc-200 w-full bottom-0 left-0 z-50">
      <div className="max-w-7xl pt-12 pb-6 mx-auto border border-x-0 border-y-2">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Image
              src={brandlogo}
              alt="Garden Ally"
              width={100}
              height={50}
              className="object-contain"
            />
            <p className="text-base font-normal text-gray-600">
              Join a vibrant community of plant enthusiasts to share tips,
              review products, and grow together on Garden Ally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:col-span-2 md:grid-cols-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                Quick Links
              </h2>
              <ul className="mt-8 space-y-2 text-sm">
                {services.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      href={path}
                      className=" text-gray-600 hover:text-gray-800"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800">Services</h2>
              <ul className="mt-8 space-y-2 text-sm">
                {faqs.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      href={path}
                      className=" text-gray-600 hover:text-gray-800"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800">Faqs</h2>
              <ul className="mt-8 space-y-2 text-sm">
                {links.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      href={path}
                      className=" text-gray-600 hover:text-gray-800"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl font-medium text-gray-800">Contact Us</p>
              <ul className="mt-8 space-y-2 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center sm:justify-start gap-1.5 group"
                    href="mailto:support@comeet.com"
                  >
                    <IoIosMail className="text-[18px] text-gray-600" />
                    <span className="text-gray-600 transition group-hover:text-gray-800">
                      support@comeet.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center sm:justify-start gap-1.5 group"
                    href="tel:+88018352629"
                  >
                    <FaPhone className="text-gray-600" />
                    <span className="text-gray-600 transition group-hover:text-gray-800">
                      +880 18352629
                    </span>
                  </a>
                </li>
                <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                  <FaMapMarkerAlt className="text-gray-600" />
                  <address className="-mt-0.5 not-italic text-gray-600">
                    Dhanmondi, Dhaka
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <BiLogoFacebookSquare className="text-2xl" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <RiTwitterXFill className="text-xl" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <SiYoutube className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <PiInstagramLogo className="text-2xl" />
          </a>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-base font-normal text-gray-500">
            &copy; 2024, GardenAlly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
