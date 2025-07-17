import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';


const MemberDetails = () => {


  const [memberDetails, setMemberDetails] = useState([]);
  const [isAddModel, setIsAddModel] = useState(false)
  const [addForm, setAddForm] = useState({
    sno: "",
    name: "",
    mobile_no: "",
    email: ""
  })

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/memberdetails`)
        setMemberDetails(response.data)
      }
      catch (err) {
        alert('Fetching Error')
      }
    }
    fetchMemberDetails();
  }, [])

  const AddModel = () => {
    setAddForm({
      sno: "", name: "", email: "", mobile_no: ""
    })
    setIsAddModel(!isAddModel);
  }

  const handleSave = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/memberadd`, addForm);
      alert("Member Added Successfully!");
      setIsAddModel(false);
      setAddForm({ sno: "", name: "", mobile_no: "", email: "" });

      // Refresh member list
      const refreshed = await axios.get(`${apiUrl}/api/memberdetails`);
      setMemberDetails(refreshed.data);
    } catch (error) {
      alert("Error saving member");
    }
  };


  return (
    <div className='min-h-screen '>
      <h1 className='text-center font-bold text-2xl mt-5'>Member Details</h1>
      <div className='flex justify-end gap-5'>
        <input type='text' className='border-2 rounded-lg border-blue-400 p-2 w-72' placeholder='Search a Member' />
        <button className='bg-blue-600 font-bold p-3 w-36 rounded-lg text-white hover:bg-blue-700' onClick={AddModel}>Add</button>
      </div>
      <div className='overflow-x-auto'>
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse mt-5">
          <thead>
            <tr className='bg-blue-500 text-white h-14 text-md'>
              <th className='px-4 py-2 border border-gray-300'>S.No</th>
              <th className='px-4 py-2 border border-gray-300'>Name</th>
              <th className='px-4 py-2 border border-gray-300'>Mobile No</th>
              <th className='px-4 py-2 border border-gray-300'>Email</th>
              <th className='px-4 py-2 border border-gray-300'>Edit</th>
              <th className='px-4 py-2 border border-gray-300'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {memberDetails.map((members, index) => (
              <tr key={index} className='hover:bg-gray-100 text-md text-center h-14'>
                <td className='p-2 border border-gray-300'>{index + 1}</td>
                <td className='p-2 border border-gray-300'>{members.name}</td>
                <td className='p-2 border border-gray-300'>{members.mobile_no}</td>
                <td className='p-2 border border-gray-300'>{members.email}</td>
                <td className="px-2 py-1 border border-gray-300 text-center">
                  <button className='bg-green-600 font-bold p-2 w-28 rounded-lg text-white hover:bg-green-700'>Edit</button>
                </td>
                <td className="px-2 py-1 border border-gray-300 text-center">
                  <button className='bg-red-600 font-bold p-2 w-28 rounded-lg text-white hover:bg-red-700'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddModel && (
        <div className='fixed top-0 left-0 w-full h-full backdrop-blur-md bg-transparent flex justify-center items-center z-10'>
          <div className='bg-white p-6 rounded-lg w-[400px]'>
            <h2 className='text-xl font-bold mb-4'>Add New Member</h2>
            <input
              type='number'
              placeholder='Sno'
              value={addForm.sno}
              onChange={(e) => setAddForm({ ...addForm, sno: e.target.value })}
              className='w-full p-2 border rounded mb-3'
            />
            <input
              type='text'
              placeholder='Name'
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              className='w-full p-2 border rounded mb-3'
            />
            <input
              type='text'
              placeholder='Mobile No'
              value={addForm.mobile_no}
              onChange={(e) => setAddForm({ ...addForm, mobile_no: e.target.value })}
              className='w-full p-2 border rounded mb-3'
            />
            <input
              type='email'
              placeholder='Email'
              value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              className='w-full p-2 border rounded mb-3'
            />

            <div className='flex justify-between'>
              <button
                onClick={handleSave}
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
              >
                Save
              </button>
              <button
                onClick={() => setIsAddModel(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MemberDetails