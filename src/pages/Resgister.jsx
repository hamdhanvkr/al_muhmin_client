import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowRightToBracket, faImage, faPhone, faMailBulk, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Resgister() {

    const [error, setError] = useState('')
    const navigate = useNavigate('')

    const apiUrl = import.meta.env.VITE_API_URL;

    const [registerData, setRegisterData] = useState({
        name: '',
        address: '',
        email: '',
        phoneNo: '',
        username: '',
        password: '',
        image: null,
    })

    const handleInputChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
        console.log(registerData);
    }

    const handleSubmit = async () => {
        if (!registerData.name || !registerData.address || !registerData.email || !registerData.phoneNo ||
            !registerData.username || !registerData.password) {
            alert('Please Filled The All Fields')
            return
        }
        try {
            const response = await axios.post(`${apiUrl}/api/register`, registerData)

            if (response.data.success) {
                navigate('/login')
            }
            else{
                setError(response.data.message) || "Registration Failed"
            }
        }

        catch (err) {
            console.error(error)
        }
    }


    return (
        <div className="bg-gradient-to-br from-green-700 to-emerald-500 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8">
            <div className="bg-white w-full max-w-md mt-8 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
                <h1 className="font-bold text-xl text-green-700 text-center">Sign Up to Your Account</h1>
                {error && <p className='text-red-400'>{error}</p>}
                <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name='name'
                        value={registerData.name}
                        onChange={handleInputChange}
                        placeholder="NAME"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faAddressBook} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name='address'
                        value={registerData.address}
                        onChange={handleInputChange}
                        placeholder="ADDRESS"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faMailBulk} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name='email'
                        value={registerData.email}
                        onChange={handleInputChange}
                        placeholder="EMAIL"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name='phoneNo'
                        value={registerData.phoneNo}
                        onChange={handleInputChange}
                        placeholder="PHONE NO"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name='username'
                        value={registerData.username}
                        onChange={handleInputChange}
                        placeholder="USERNAME"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        name='password'
                        value={registerData.password}
                        onChange={handleInputChange}
                        placeholder="PASSWORD"
                        className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
                    />
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="file"
                        name='image'
                        value={registerData.image}
                        onChange={handleInputChange}
                        placeholder="IMAGE"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 rounded-lg bg-green-700 hover:bg-emerald-600 transition text-white font-semibold text-lg shadow-md flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Resgister