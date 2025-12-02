import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowRightToBracket, faMosque, faExclamationCircle, faCheckCircle, faSync } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginModal({ isOpen, onClose }) {

    if (!isOpen) return null;

    const apiUrl = import.meta.env.VITE_API_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayMessage, setDisplayMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const showMessage = (type, text) => {
        setDisplayMessage({ type, text });
        setTimeout(() => setDisplayMessage({ type: '', text: '' }), 4000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDisplayMessage({ type: '', text: '' });

        if (!username || !password) {
            showMessage('error', 'Please enter both username and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                username,
                password
            });

            if (response.data.success) {
                showMessage('success', 'Login successful! Redirecting...');
                setTimeout(() => navigate(`/layout/${username}/dashboard`), 500);
            } else {
                showMessage('error', response.data.message || 'Invalid credentials.');
            }
        } catch (err) {
            showMessage('Error', 'Network Error: Unable to connect.');
            console.log('Error in login : ', err)
        } finally { setIsLoading(false) }
    };

    const messageClass = displayMessage.type === 'error' ? 'bg-red-100 text-red-700 border-red-500' : 'bg-teal-50 text-teal-700 border-teal-500';

    const messageIcon = displayMessage.type === 'error' ? faExclamationCircle : faCheckCircle;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-black backdrop-blur-md">
            <div className="relative w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl">
                <button
                    onClick={onClose}
                    className="absolute text-lg transition top-4 right-5 text-slate-600 hover:text-slate-900"
                >
                    ✖
                </button>
                <div className="flex flex-col lg:flex-row">
                    <div className="relative flex-col items-center justify-center hidden w-3/5 p-10 text-white lg:flex bg-gradient-to-b from-teal-700 to-teal-800 rounded-l-3xl">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <FontAwesomeIcon icon={faMosque} className="p-4 mb-6 text-6xl bg-teal-600 shadow-xl" />
                        <h1 className="text-3xl font-extrabold tracking-tight text-center">AL MUHMIN ISLAMIC TRUST</h1>
                        <p className="mt-3 text-sm text-center text-teal-100">Secure access to your dashboard.</p>
                    </div>
                    <div className="w-full p-6 lg:p-10 lg:w-3/5">
                        <h2 className="mt-5 mb-5 text-xl font-extrabold text-center uppercase lg:mb-6 text-slate-900">
                            Login To Access
                        </h2>
                        {displayMessage.text && (
                            <div className={`flex items-center p-4 rounded-xl border-l-4 text-sm font-medium mb-6 ${messageClass}`}>
                                <FontAwesomeIcon icon={messageIcon} className="mr-3" />
                                {displayMessage.text}
                            </div>
                        )}
                        <form onSubmit={handleLogin}>
                            <div className="mb-5">
                                <label className="block mb-3 text-sm font-medium text-slate-700">USERNAME : </label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faUser} className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full py-2 pl-12 pr-4 border rounded-lg shadow-sm border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-600"
                                        placeholder="Enter username"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block mb-3 text-sm font-medium text-slate-700">PASSWORD :</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faLock} className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full py-2 pl-12 pr-4 border rounded-lg shadow-sm border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-600"
                                        placeholder="Enter password"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center justify-center w-full gap-3 py-2 text-lg font-bold text-white transition bg-teal-600 shadow-lg rounded-xl hover:bg-teal-700 shadow-teal-500/30 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSync} spin />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                                        Login
                                    </>
                                )}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;