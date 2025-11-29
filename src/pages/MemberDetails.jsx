import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberDetails = () => {
  const [memberDetails, setMemberDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModel, setIsAddModel] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    email: ""
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch Members
  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/memberdetails`);
      setMemberDetails(response.data);
    } catch (err) {
      alert('Fetching Error');
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  // Add Modal
  const openAddModal = () => {
    setFormData({ sno: "", name: "", mobile_no: "", email: "" });
    setIsAddModel(true);
  };

  // Edit Modal
  const openEditModal = (member) => {
    setSelectedId(member._id);
    setFormData({
      sno: member.sno,
      name: member.name,
      mobile_no: member.mobile_no,
      email: member.email
    });
    setIsEditModel(true);
  };

  // Save New Member
  const handleSave = async () => {
    try {
      await axios.post(`${apiUrl}/api/memberadd`, formData);
      alert("Member Added Successfully!");
      setIsAddModel(false);
      fetchMemberDetails();
    } catch (error) {
      alert("Error saving member");
    }
  };

  // Update Member
  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/api/memberupdate/${selectedId}`, formData);
      alert("Member Updated Successfully!");
      setIsEditModel(false);
      fetchMemberDetails();
    } catch (error) {
      alert("Error updating member");
    }
  };

  // Delete Member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`${apiUrl}/api/memberdelete/${id}`);
        alert("Member Deleted Successfully!");
        fetchMemberDetails();
      } catch (error) {
        alert("Error deleting member");
      }
    }
  };

  // Filter Members for Search
  const filteredMembers = memberDetails.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.mobile_no.includes(searchTerm)
  );

  return (
    <div className='min-h-screen'>
      <h1 className='text-center font-bold text-2xl mt-5'>Member Details</h1>

      <div className='flex justify-end gap-5'>
        <input
          type='text'
          className='border-2 rounded-lg border-blue-400 p-2 w-72'
          placeholder='Search a Member'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className='bg-blue-600 font-bold p-3 w-36 rounded-lg text-white hover:bg-blue-700'
          onClick={openAddModal}
        >
          Add
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse mt-5">
          <thead>
            <tr className='bg-blue-500 text-white h-14 text-md'>
              <th className='px-4 py-2 border'>S.No</th>
              <th className='px-4 py-2 border'>Name</th>
              <th className='px-4 py-2 border'>Mobile No</th>
              <th className='px-4 py-2 border'>Email</th>
              <th className='px-4 py-2 border'>Edit</th>
              <th className='px-4 py-2 border'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member._id} className='hover:bg-gray-100 text-md text-center h-14'>
                <td className='p-2 border'>{index + 1}</td>
                <td className='p-2 border'>{member.name}</td>
                <td className='p-2 border'>{member.mobile_no}</td>
                <td className='p-2 border'>{member.email}</td>
                <td className='p-2 border'>
                  <button
                    className='bg-green-600 font-bold p-2 w-28 rounded-lg text-white hover:bg-green-700'
                    onClick={() => openEditModal(member)}
                  >
                    Edit
                  </button>
                </td>
                <td className='p-2 border'>
                  <button
                    className='bg-red-600 font-bold p-2 w-28 rounded-lg text-white hover:bg-red-700'
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {isAddModel && (
        <div className='fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center z-10'>
          <div className='bg-white p-6 rounded-lg w-[400px]'>
            <h2 className='text-xl font-bold mb-4'>Add New Member</h2>
            <input type='text' placeholder='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <input type='text' placeholder='Mobile No' value={formData.mobile_no} onChange={(e) => setFormData({ ...formData, mobile_no: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <input type='email' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <div className='flex justify-between'>
              <button onClick={handleSave} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Save</button>
              <button onClick={() => setIsAddModel(false)} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModel && (
        <div className='fixed top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center z-10'>
          <div className='bg-white p-6 rounded-lg w-[400px]'>
            <h2 className='text-xl font-bold mb-4'>Edit Member</h2>
            <input type='text' placeholder='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <input type='text' placeholder='Mobile No' value={formData.mobile_no} onChange={(e) => setFormData({ ...formData, mobile_no: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <input type='email' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='w-full p-2 border rounded mb-3' />
            <div className='flex justify-between'>
              <button onClick={handleUpdate} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>Update</button>
              <button onClick={() => setIsEditModel(false)} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MemberDetails;
