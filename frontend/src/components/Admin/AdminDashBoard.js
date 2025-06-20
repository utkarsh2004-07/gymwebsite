import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, Search } from "lucide-react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // Store selected user details
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5000/api/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.users);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch users");
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5000/api/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedUser(response.data.user); // Set selected user details
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch user details");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchUsers();
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin text-blue-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                                <tr key={user._id} onClick={() => fetchUserDetails(user._id)} className="cursor-pointer hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                {user.name[0].toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.membershipPlan === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                                                user.membershipPlan === 'vip' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {user.membershipPlan || 'none'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
    ${user?.isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {user?.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* Empty cell for actions */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Details */}
            {selectedUser && (
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                    <div className="bg-white p-6 rounded-lg shadow mt-4">
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Membership Plan:</strong> {selectedUser.membershipPlan || 'none'}</p>
                        <p><strong>Membership Start Date:</strong> {new Date(selectedUser.membershipStartDate).toLocaleDateString()}</p>
                        <p><strong>Membership End Date:</strong> {new Date(selectedUser.membershipEndDate).toLocaleDateString()}</p>
                        <p><strong>Contact Number:</strong> {selectedUser.contactNumber}</p>
                        <p><strong>Join Date:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                        {/* <p><strong>Diet Plans:</strong> {selectedUser.dietPlans.join(", ")}</p> */}
                        <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {selectedUser.isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
