import { useState } from 'react';
import Photos from '../../assets/TRUST LOGO.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	return (
		<div className="bg-gradient-to-br from-green-700 to-emerald-500 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8">
			<div className="bg-white flex justify-center items-center gap-4 p-5 rounded-xl shadow-lg w-full max-w-md">
				<img src={Photos} alt="Trust Logo" className="w-16 h-16 rounded-full object-cover" />
				<div className='space-y-1'>
					<h1 className="font-bold text-base text-gray-800 tracking-wide">AL MUHMIN ISLAMIC TRUST</h1>
					<p className="text-green-600 font-medium text-sm">V KALATHUR</p>
				</div>
			</div>

			<div className="bg-white w-full max-w-md mt-8 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
				<h1 className="font-bold text-xl text-green-700 text-center">Login to Your Account</h1>

				<div className="relative">
					<FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="USERNAME"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
					/>
				</div>

				<div className="relative">
					<FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<input
						type="password"
						placeholder="PASSWORD"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder:text-sm"
					/>
				</div>

				<button
					onClick={() => navigate('/layout/dashboard')}
					className="w-full py-2 rounded-lg bg-green-700 hover:bg-emerald-600 transition text-white font-semibold text-lg shadow-md flex items-center justify-center gap-2"
				>
					<FontAwesomeIcon icon={faArrowRightToBracket} />
					Login
				</button>
			</div>
		</div>
	);
}

export default LoginForm;
