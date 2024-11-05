/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaUsers, FaCreditCard, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import UserActivityChart from "@/components/charts/UserActivityChart";

const sections = [
  {
    title: "User Management",
    icon: <FaUsers className="text-4xl text-lime-500" />,
    description: "Manage users, roles, and permissions in the system.",
    bgColor: "bg-lime-100",
    path: "/admin-dashboard/user-management",
  },
  {
    title: "Payment History",
    icon: <FaCreditCard className="text-4xl text-green-500" />,
    description: "View and manage all payment transactions and history.",
    bgColor: "bg-green-100",
    path: "/admin-dashboard/payment-history",
  },
  {
    title: "Content Management",
    icon: <FaFileAlt className="text-4xl text-amber-500" />,
    description: "Manage post content",
    bgColor: "bg-amber-100",
    path: "/admin-dashboard/content-management",
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      {/* Management Card */}
      <div className="my-5">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-center mb-8 text-emerald-500"
        >
          Admin Dashboard
        </motion.h1>
        <motion.div
          whileInView={{ opacity: 1, translateY: 0 }}
          initial={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-center text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${section.bgColor}`}
            >
              <div className="mb-4">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-700">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <Link href={section.path} passHref>
                <p className="inline-block px-4 py-2 rounded text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
                  Manage
                </p>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Chart Part */}

      <UserActivityChart />
    </div>
  );
};

export default AdminDashboard;
