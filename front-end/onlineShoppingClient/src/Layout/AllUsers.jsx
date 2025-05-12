import React, { useState } from "react";
import useAllUsers from "../Hooks/useAllUser";


const AllUsers = () => {
    const [allusers, loading, refetch] = useAllUsers();
    const [filterRole, setFilterRole] = useState(""); // Role Filter State

    if (loading) {
        return <h1>Loading...</h1>;
    }

    // Filter users based on role
    const filteredUsers = filterRole ? allusers.filter(user => user.role === filterRole) : allusers;

    // Function to update user status
    const updateUserStatus = async (userId, newStatus) => {
        try {
            const response = await fetch(`https://online-shoppin-server.vercel.app/allusers/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                refetch(); // Refresh data after update
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // Function to update user role
    const updateUserRole = async (userId, newRole) => {
        try {
            const response = await fetch(`https://online-shoppin-server.vercel.app/allusers/${userId}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                refetch();
            }
        } catch (error) {
            console.error("Failed to update role:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Users ({filteredUsers.length})</h1>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <select
                    onChange={(e) => setFilterRole(e.target.value)}
                    value={filterRole}
                    className="border p-2 rounded"
                >
                    <option value="">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">Photo</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Action</th>
                            <th className="border border-gray-300 p-2">Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                                <td className={`border border-gray-300 p-2 text-center ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>
                                    {user.status}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role !== "admin" && (
                                        user.status === "active" ? (
                                            <button onClick={() => updateUserStatus(user._id, "blocked")} className="btn btn-sm btn-error">
                                                Block
                                            </button>
                                        ) : (
                                            <button onClick={() => updateUserStatus(user._id, "active")} className="btn btn-sm btn-success">
                                                Unblock
                                            </button>
                                        )
                                    )}
                                </td>
                                {/* Make Admin Button */}
                                <td className="border border-gray-300 p-2 text-center">
                                    {user.role === "admin" ? (
                                        <button onClick={() => updateUserRole(user._id, "user")} className="btn btn-sm btn-error">
                                            Make User
                                        </button>
                                    ) : (
                                        <button onClick={() => updateUserRole(user._id, "admin")} className="btn btn-sm btn-primary">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
