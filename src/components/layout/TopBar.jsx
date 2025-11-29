import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function TopBar({ onOpen }) {

	const navigate = useNavigate();

	const handleLogout = () => { navigate('/')};

	return (
		<header className='py-3 px-6 flex items-center justify-between bg-slate-800 shadow-xl'>

			{/* Left Section: Menu Toggle */}
			<button
				onClick={onOpen}
			// Set the base text color to slate-300 so the icon is visible

			>

				<FontAwesomeIcon icon={faBars} size='xl' color='white' />
			</button>

			{/* Center Section: Static App Title */}
			<div className='flex-1 flex justify-center'>
				<h1 className='text-slate-100 font-extrabold text-xl tracking-wider'>
					AL MUHMIN ISLAMIC TRUST
				</h1>
			</div>

			{/* Right Section: Logout Button */}
			<button
				onClick={handleLogout}
				className='p-2 rounded transition duration-200 text-red-400 hover:text-white hover:bg-red-600'
				aria-label="Logout"
			>
				{/* This icon is visible because the container text class is set to text-red-400 */}
				<FontAwesomeIcon icon={faRightFromBracket} size='xl' />
			</button>
		</header>
	);
}

export default TopBar;