import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function Setting() {
    const navigate = useNavigate();

    const handleAddUserClick = () => {
        navigate('adduser'); 
    };

    const handleAcademicYearClick = () => {
        navigate('academicyear'); 
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">System Settings</h1>
            
            <div className='flex gap-6 mb-8 border-b pb-4'> 
                {/* Add User Button */}
                <button 
                    onClick={handleAddUserClick}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]"
                >
                    <FontAwesomeIcon icon={faUserCog} className="mr-3" />
                    Add User
                </button>

                {/* Academic Year Button (will need the route defined below) */}
                <button 
                    onClick={handleAcademicYearClick}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]"
                >
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                    Academic Year
                </button>
            </div>
            
            {/* THIS IS THE CRITICAL ADDITION: This is where the AddUserPage or AcademicYearPage will render */}
            <div className="mt-8">
                <Outlet /> 
            </div>
        </div>
    );
}

export default Setting;