import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faEdit, faTrashAlt, faTimes, faSave, faSync, faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ title, children, onClose }) => (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-4 bg-black bg-opacity-40 backdrop-blur-sm'>
        <div className='w-full max-w-lg p-8 text-gray-800 transition-all duration-300 bg-white shadow-2xl rounded-xl'>
            <div className='flex items-center justify-between pb-4 mb-6 border-b border-gray-100'>
                <h2 className='text-2xl font-bold text-blue-600'>{title}</h2>
                <button onClick={onClose} className='p-1 text-gray-500 rounded-full hover:text-gray-900'>
                    <FontAwesomeIcon icon={faTimes} size='lg' />
                </button>
            </div>
            {children}
        </div>
    </div>
);

const MemberDetails = () => {

    const [memberDetails, setMemberDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModel, setIsAddModel] = useState(false);
    const [isEditModel, setIsEditModel] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        sno: "",
        name: "",
        mobile_no: "",
        email: ""
    });

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const fetchMemberDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/memberdetails`);
            setMemberDetails(response.data);
        } catch (err) {
            alert('Error fetching member data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMemberDetails();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setFormData({ sno: "", name: "", mobile_no: "", email: "" });
        setIsAddModel(true);
    };

    const openEditModal = (member) => {
        setSelectedId(member._id);
        setFormData({
            sno: member.sno || "",
            name: member.name,
            mobile_no: member.mobile_no,
            email: member.email
        });
        setIsEditModel(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.mobile_no || !formData.email) {
            alert("Name, Mobile No, and Email are required.");
            return;
        }
        try {
            await axios.post(`${apiUrl}/api/memberadd`, formData);
            alert("New Member added.");
            setIsAddModel(false);
            fetchMemberDetails();
        } catch {
            alert("Failed to save.");
        }
    };

    const handleUpdate = async () => {
        if (!formData.name || !formData.mobile_no || !formData.email) {
            alert("Name, Mobile No, and Email are required.");
            return;
        }
        try {
            await axios.put(`${apiUrl}/api/memberupdate/${selectedId}`, formData);
            alert("Member updated.");
            setIsEditModel(false);
            fetchMemberDetails();
        } catch {
            alert("Failed to update.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this member permanently?")) {
            try {
                await axios.delete(`${apiUrl}/api/memberdelete/${id}`);
                alert("Member deleted.");
                fetchMemberDetails();
            } catch {
                alert("Failed to delete.");
            }
        }
    };

    const filteredMembers = memberDetails.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.mobile_no && member.mobile_no.includes(searchTerm)) ||
        (member.sno && String(member.sno).includes(searchTerm))
    );

    return (
        <div className='min-h-screen p-6 text-gray-800 sm:p-10 bg-gray-50'>
            <div className='p-6 mb-8 bg-white border-l-4 border-blue-600 shadow-lg rounded-xl'>
                <h1 className='flex items-center mb-1 text-xl font-extrabold text-gray-900 lg:text-3xl'>
                    <FontAwesomeIcon icon={faUsers} className='mr-3 text-blue-600' /> Member Directory
                </h1>
                <p className='text-sm text-gray-500'>
                    Manage and search all registered members.
                </p>
            </div>

            <div className='flex flex-col items-stretch justify-between gap-4 mb-6 md:flex-row md:items-center'>
                <div className='relative w-full md:w-96'>
                    <FontAwesomeIcon icon={faSearch} className='absolute text-gray-400 -translate-y-1/2 left-3 top-1/2' />
                    <input
                        type='text'
                        className='w-full p-3 pl-10 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
                        placeholder='Search by Name, Email, Mobile'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    className='flex items-center justify-center w-full p-3 font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 md:w-auto'
                    onClick={openAddModal}
                >
                    <FontAwesomeIcon icon={faUserPlus} className='mr-2' /> Add Member
                </button>
            </div>

            <div className='overflow-x-auto bg-white shadow-xl rounded-xl'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className='bg-slate-800'>
                        <tr className='text-sm font-semibold tracking-wider text-white uppercase h-14'>
                            <th className='px-6 py-3'>S.No</th>
                            <th className='px-6 py-3'>Name</th>
                            <th className='hidden px-6 py-3 sm:table-cell'>Mobile No</th>
                            <th className='hidden px-6 py-3 lg:table-cell'>Email</th>
                            <th className='px-6 py-3 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className='p-6 text-center text-gray-500'>
                                    <FontAwesomeIcon icon={faSync} className='mr-2 animate-spin' /> Loading...
                                </td>
                            </tr>
                        ) : filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className='p-6 text-center text-gray-500'>
                                    <FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> No members found.
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member, index) => (
                                <tr key={member._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition text-sm lg:text-base`}>
                                    <td className='p-4 px-6 text-center'>{index + 1}</td>
                                    <td className='p-4 px-6 text-center'>{member.name}</td>
                                    <td className='hidden p-4 px-6 text-center sm:table-cell'>{member.mobile_no}</td>
                                    <td className='hidden p-4 px-6 text-center lg:table-cell'>{member.email}</td>
                                    <td className='p-4 px-6 text-center'>
                                        <div className='flex justify-center gap-2'>
                                            <button
                                                className='p-2 text-blue-600 transition-colors rounded hover:text-blue-800'
                                                onClick={() => openEditModal(member)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} className='mr-1.5' />
                                                <span className='hidden sm:inline'>Edit</span>
                                            </button>
                                            <button
                                                className='p-2 text-red-600 transition-colors rounded hover:text-red-800'
                                                onClick={() => handleDelete(member._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} className='mr-1.5' />
                                                <span className='hidden sm:inline'>Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isAddModel && (
                <Modal title="Create New Member" onClose={() => setIsAddModel(false)}>
                    <input type='text' name='name' placeholder='Name *'
                        value={formData.name} onChange={handleChange}
                        className='w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <input type='text' name='mobile_no' placeholder='Mobile No *'
                        value={formData.mobile_no} onChange={handleChange}
                        className='w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <input type='email' name='email' placeholder='Email *'
                        value={formData.email} onChange={handleChange}
                        className='w-full p-3 mb-6 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <div className='flex justify-end gap-3'>
                        <button onClick={handleSave} className='px-6 py-2 text-white bg-blue-600 rounded-lg'>
                            <FontAwesomeIcon icon={faSave} className='mr-2' /> Save
                        </button>
                        <button onClick={() => setIsAddModel(false)} className='px-6 py-2 text-gray-800 bg-gray-300 rounded-lg'>
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}

            {isEditModel && (
                <Modal title="Update Member" onClose={() => setIsEditModel(false)}>
                    <input type='text' name='sno' placeholder='S.No'
                        value={formData.sno} onChange={handleChange}
                        className='w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <input type='text' name='name' placeholder='Name *'
                        value={formData.name} onChange={handleChange}
                        className='w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <input type='text' name='mobile_no' placeholder='Mobile No *'
                        value={formData.mobile_no} onChange={handleChange}
                        className='w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50'
                    />
                    <input type='email' name='email' placeholder='Email *'
                        value={formData.email} onChange={handleChange}
                        className='w-full p-3 mb-6 border border-gray-300 rounded-lg bg-gray-50'
                    />

                    <div className='flex justify-end gap-3'>
                        <button onClick={handleUpdate} className='px-6 py-2 text-white rounded-lg bg-amber-600'>
                            <FontAwesomeIcon icon={faEdit} className='mr-2' /> Update
                        </button>
                        <button onClick={() => setIsEditModel(false)} className='px-6 py-2 text-gray-800 bg-gray-300 rounded-lg'>
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MemberDetails;