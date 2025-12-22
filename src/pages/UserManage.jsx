import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function UserManage() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: ""
    });

    const roleMap = {
        1: "Admin",
        2: "Chapter Head",
        3: "Member",
        4: "Donor"
    };


    const fetchUsers = async () => {
        const res = await axios.get(`${apiUrl}/api/all`);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await axios.put(`${apiUrl}/api/update/${editId}`, form);
            alert("User Updated successfully");
        } else {
            await axios.post(`${apiUrl}/api/add`, form);
            alert("User Added successfully");
        }

        setForm({ username: "", password: "", role: "" });
        setEditId(null);
        setShowModal(false);
        fetchUsers();
    };

    const handleEdit = (item) => {
        setForm({
            username: item.username,
            password: item.password,
            role: item.role
        });
        setEditId(item._id);
        setShowPassword(false);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        await axios.delete(`${apiUrl}/api/delete/${id}`);
        fetchUsers();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* Title */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

                <button
                    onClick={() => {
                        setShowModal(true);
                        setForm({ username: "", password: "" });
                        setEditId(null);
                        setShowPassword(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    + Add User
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4">S.No</th>
                            <th className="py-3 px-4">Username</th>
                            <th className="py-3 px-4">Password</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, index) => (
                            <tr key={u._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 font-medium">{u.username}</td>
                                <td className="py-3 px-4">{u.password}</td>
                                <td className="py-3 px-4">{roleMap[u.role]}</td>


                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => handleEdit(u)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">

                        <h2 className="text-2xl font-semibold mb-4">
                            {editId ? "Edit User" : "Add User"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Username */}
                            <div>
                                <label className="block mb-1 font-medium">Username</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Password + Eye Toggle */}
                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full border px-3 py-2 rounded"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Role</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    value={form.role}
                                    onChange={(e) =>
                                        setForm({ ...form, role: Number(e.target.value) })
                                    }
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Chapter Head</option>
                                    <option value={3}>Member</option>
                                    <option value={4}>Donor</option>
                                </select>
                            </div>


                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {editId ? "Update" : "Add"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
