import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AcademicManage() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [academics, setAcademics] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        academic_year: "",
        status: 1,
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch all data
    const fetchAcademic = async () => {
        const res = await axios.get(`${apiUrl}/api/academic/get`);
        setAcademics(res.data);
    };

    useEffect(() => {
        fetchAcademic();
    }, []);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;
            if (editingId) {
                res = await axios.put(`${apiUrl}/api/academic/update/${editingId}`, form);
            } else {
                res = await axios.post(`${apiUrl}/api/academic/add`, form);
            }

            // Show alert
            if (res.data.success) {
                alert(res.data.message); // ✅ normal alert
            } else {
                alert(res.data.message || "Something went wrong!");
            }

            fetchAcademic();
            setShowModal(false);
            setForm({ academic_year: "", status: 1 });
            setEditingId(null);

        } catch (err) {
            alert(err.response?.data?.message || "Server Error ❌");
        }
    };


    // Handle edit
    const openEdit = (item) => {
        setForm(item);
        setEditingId(item.academic_id);
        setShowModal(true);
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return; // confirm before delete

        try {
            const res = await axios.delete(`${apiUrl}/api/academic/delete/${id}`);
            if (res.data.success) {
                alert(res.data.message); // ✅ normal alert
            } else {
                alert(res.data.message || "Delete failed ❌");
            }
            fetchAcademic();
        } catch (err) {
            alert("Server Error ❌");
        }
    };


    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* Title */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Academic Year Management</h1>

                <button
                    onClick={() => { setShowModal(true); setForm({ academic_year: "", status: 1 }); setEditingId(null); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    + Add Academic Year
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4">Academic ID</th>
                            <th className="py-3 px-4">Academic Year</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {academics.map((item, index) => (
                            <tr key={item.academic_id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{index + 1}</td>

                                <td className="py-3 px-4 font-medium">{item.academic_year}</td>

                                <td className="py-3 px-4">
                                    {item.status === 1 ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.academic_id)}
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
                            {editingId ? "Edit Academic Year" : "Add Academic Year"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <label className="block mb-1 font-medium">Academic Year</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    value={form.academic_year}
                                    onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Status</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
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
                                    {editingId ? "Update" : "Add"}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            )}

        </div>
    );
}
