import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faLock, 
    faArrowRightToBracket, 
    faMosque, 
    faExclamationCircle, 
    faCheckCircle, 
    faSync,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayMessage, setDisplayMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Utility function to show messages temporarily
    const showMessage = (type, text) => {
        setDisplayMessage({ type, text });
        setTimeout(() => setDisplayMessage({ type: '', text: '' }), 4000);
    };

    // --- MODIFICATION: Accept event and prevent default submission ---
    const handleLogin = async (e) => {
        // Prevent default form submission behavior (page reload)
        e.preventDefault(); 
        
        setIsLoading(true);
        setDisplayMessage({ type: '', text: '' });

        if (!username || !password) {
            showMessage('error', "Please enter both username and password.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                username: username,
                password: password
            });

            if (response.data.success) {
                showMessage('success', 'Login successful! Redirecting...');
                // Store token/user data here if needed
                setTimeout(() => {
                    navigate(`/layout/${username}/dashboard`);
                }, 500);
            } else {
                showMessage('error', response.data.message || 'Login failed. Invalid credentials.');
            }
        }
        catch (err) {
            console.error(err);
            showMessage('error', 'Network Error: Unable to connect to the authentication service.');
        } finally {
            setIsLoading(false);
        }
    }
    // -----------------------------------------------------------------

    const handleRegister = () => {
        navigate('/register');
    }

    // Determine message styles
    const messageClass = displayMessage.type === 'error'
        ? 'bg-red-50 text-red-700 border-red-400'
        : 'bg-green-50 text-green-700 border-green-400';
    const messageIcon = displayMessage.type === 'error'
        ? faExclamationCircle
        : faCheckCircle;


    return (
        // Ultra-professional background: large screen gradient with subtle pattern, centered form
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-10 bg-green-100">
            
            {/* Main Login Container Card */}
            <div className="bg-white w-full max-w-lg lg:max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">
                
                {/* Left Side: Brand/Marketing Area (Deep Accent) - Hidden on smaller screens */}
                <div className="hidden lg:flex lg:w-2/5 p-10 flex-col justify-center items-center bg-green-800 text-white relative">
                    {/* Subtle design element */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"2\" fill=\"white\"/></svg>')", backgroundSize: '20px' }}></div>
                    
                    <FontAwesomeIcon icon={faMosque} className="text-white text-6xl mb-6 shadow-md p-3 rounded-full bg-green-700" />
                    <h1 className="font-extrabold text-3xl text-center tracking-tight mb-2">
                        AL MUHMIN ISLAMIC TRUST
                    </h1>
                    <p className="text-sm font-light text-green-200 text-center">
                        Securely manage your trust's financial and member data.
                    </p>
                </div>

                {/* Right Side: Login Form Area (Light Content) */}
                <div className="w-full lg:w-3/5 p-8 sm:p-12 flex flex-col justify-center">

                    <h2 className="font-extrabold text-3xl text-gray-900 mb-2 text-center lg:text-left">
                        Sign In
                    </h2>
                    <p className="text-gray-500 mb-6 text-center lg:text-left">
                        Access to Login
                    </p>

                    {/* Status Message Display */}
                    {displayMessage.text && (
                        <div className={`flex items-center p-4 rounded-lg border-l-4 text-sm font-medium mb-5 ${messageClass}`}>
                            <FontAwesomeIcon icon={messageIcon} className="mr-3 text-lg" />
                            {displayMessage.text}
                        </div>
                    )}

                    {/* --- MODIFICATION: Wrap form elements in a <form> tag with onSubmit handler --- */}
                    <form onSubmit={handleLogin}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label className='block text-gray-700 text-sm font-medium mb-2'>Username</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm transition duration-150 focus:ring-4 focus:ring-green-400/30 focus:border-green-500 focus:outline-none text-gray-800 placeholder:text-gray-500 placeholder:text-sm"
                                    disabled={isLoading}
                                    // A name attribute is good practice for form fields
                                    name="username" 
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className='block text-gray-700 text-sm font-medium mb-2'>Password</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm transition duration-150 focus:ring-4 focus:ring-green-400/30 focus:border-green-500 focus:outline-none text-gray-800 placeholder:text-gray-500 placeholder:text-sm"
                                    disabled={isLoading}
                                    // A name attribute is good practice for form fields
                                    name="password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Login Button: Set type="submit" so it triggers the form onSubmit */}
                        <button
                            type="submit" // Crucial for form submission via Enter key
                            className="w-full py-3 rounded-xl bg-green-700 hover:bg-green-800 transition text-white font-bold text-lg shadow-lg shadow-green-500/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon={faSync} spin />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                    Log In
                                </>
                            )}
                        </button>
                    </form>
                    {/* ----------------- END OF FORM ----------------------------------------- */}

                    {/* Register Link */}
                    <div className='flex justify-center items-center mt-6 text-sm'>
                        <p className="text-gray-500 mr-1">
                            Don’t have an account?
                        </p>
                        <p 
                            onClick={handleRegister} 
                            className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition"
                        >
                            Register Now
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;