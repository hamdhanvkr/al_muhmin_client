import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';


const MemberDetails = () => {


  const [memberDetails, setMemberDetails] = useState([]);

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

  return (
    <div className='min-h-screen '>
      <h1 className='text-center font-bold text-2xl mt-5'>Member Details</h1>
      <div className='flex justify-end gap-5'>
        <input type='text' className='border-2 rounded-lg border-blue-400 p-2 w-72' placeholder='Search a Member' />
        <button className='bg-blue-600 font-bold p-3 w-36 rounded-lg text-white hover:bg-blue-700'>Add</button>
      </div>
      <table className="w-full text-left border-collapse mt-5">
        <thead className='bg-blue-500'>
          <tr className='text-white'>
            <th className='p-2'>S.No</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Mobile No</th>
            <th className='p-2'>Email</th>
          </tr>
        </thead>
        <tbody>
          {memberDetails.map((members, index) => (
            <tr key={index} className='border'>
              <td className='p-2'>{index + 1}</td>
              <td className='p-2'>{members.name}</td>
              <td className='p-2'>{members.mobile_no}</td>
              <td className='p-2'>{members.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default MemberDetails