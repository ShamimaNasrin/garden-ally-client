/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useState } from "react";
import toast from "react-hot-toast";

const headings = ["User Name", "Email", "Phone", "Role", "Actions"];

// Static user data
const userData = [
  {
    _id: "1",
    name: "Alice Johnson",
    role: "user",
    email: "alice@example.com",
    phone: "123-456-7890",
    address: "123 Elm Street",
  },
  {
    _id: "2",
    name: "Bob Smith",
    role: "user",
    email: "bob@example.com",
    phone: "987-654-3210",
    address: "456 Oak Avenue",
  },
  {
    _id: "3",
    name: "Carol Danvers",
    role: "admin",
    email: "carol@example.com",
    phone: "555-123-4567",
    address: "789 Maple Drive",
  },
];

const UserManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleUpdate = (userId: string, role: string) => {
    const user = userData.find((user) => user._id === userId);
    if (user && user.role !== role) {
      // Here, just a toast message to simulate role update
      toast.success(`User role updated to ${role} for ${user.name}`);
    } else {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="min-h-[70vh] xl:py-12 lg:py-10 py-7 xl:px-16 lg:px-16 md:px-10 px-7 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-8 text-emerald-500">
        User Management
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="mx-auto xl:w-[80%] lg:w-[80%] md:w-[70%] w-full text-left table-auto border-collapse shadow-lg rounded-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gray-600 text-white">
              {headings.map((h, i) => (
                <th
                  key={i}
                  className="border-b border-gray-800 px-4 py-3 text-center font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.length ? (
              userData.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-violet-50 transition-colors duration-200"
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.email}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.phone}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {item.role}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => handleRoleUpdate(item._id, "admin")}
                      className={`py-1 px-3 rounded text-sm font-semibold ${
                        item.role === "admin"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                      disabled={item.role === "admin"}
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
