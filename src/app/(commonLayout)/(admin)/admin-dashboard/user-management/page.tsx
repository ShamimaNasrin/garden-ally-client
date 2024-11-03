/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import NoDataFound from "@/components/UI/NoDataFound";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useFetchAllUserQuery,
  useModifyUserRoleMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";

const headings = ["User Name", "Email", "Phone", "Role", "Actions"];

const UserManagement: React.FC = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const { data: userData, isLoading } = useFetchAllUserQuery(
    currentUser && currentUser?._id
  );

  const [modifyUserRole] = useModifyUserRoleMutation();

  // console.log("userData:", userData);

  const handleRoleUpdate = async (userId: string, role: string) => {
    // console.log(userId, role);
    try {
      await modifyUserRole({
        userId,
        updatedInfo: { role },
      }).unwrap();
      toast.success("User role updated successfully!");
    } catch (err) {
      toast.error("Failed to update user role");
      console.error("Error updating user role", err);
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
            {userData?.data?.length ? (
              userData?.data?.map((user: any) => (
                <tr
                  key={user?._id}
                  className="hover:bg-violet-50 transition-colors duration-200"
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {user?.name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {user?.email}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {user?.phone}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    {user?.role}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        handleRoleUpdate(
                          user?._id,
                          user?.role === "admin" ? "user" : "admin"
                        )
                      }
                      className="py-1 w-[100px] rounded text-sm font-semibold bg-green-500 text-white hover:bg-green-600"
                    >
                      {user?.role === "admin" ? "Make User" : "Make Admin"}
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
