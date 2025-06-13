import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser, faHandHoldingHeart, faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function SideBar({ isClose }) {

	const sidemenus = [
		{
			name: 'Dashboard',
			path: '/layout/dashboard',
			icon: faHome,
		},
		{
			name: 'Member Details',
			path: '/layout/memberdetails',
			icon: faUsers,
		},
		{
			name: 'Distribution Details',
			path: '/layout/distributiondetails',
			icon: faHandHoldingHeart,
		},
		{
			name: 'Setting',
			path: '/layout/setting',
			icon: faGear,
		},
		{
			name: 'Logout',
			path: '/',
			icon: faRightFromBracket,
		}
	]

	return (
		<div>
			<div className="fixed top-0 left-0 h-full w-64 py-6 px-4 bg-gradient-to-b from-green-700 to-emerald-500 z-30 shadow-2xl transition-transform duration-300">
				<button
					className="absolute top-4 right-4 p-2 py-1 hover:bg-white/30 text-white transition"
					onClick={isClose}
				>
					<FontAwesomeIcon icon={faXmark} className="text-lg" />
				</button>
				<div className="flex justify-center mt-10">
					<div className="bg-white/20 p-4 rounded-full">
						<FontAwesomeIcon icon={faUser} className="text-white text-5xl" />
					</div>
				</div>
				<div className="mt-12 flex flex-col gap-4">
					{sidemenus.map((menu, index) => (
						<NavLink
							key={index}
							to={menu.path}
							onClick={isClose}
							className={({ isActive }) =>
								`group flex items-center gap-3 px-4 py-2 rounded-lg text-white text-base font-medium transition 
                				${isActive
									? 'bg-white/25 border-l-4 border-white shadow-inner'
									: 'hover:bg-white/20 hover:shadow-md'}`
							}
						>
							<FontAwesomeIcon icon={menu.icon} className="w-5 h-5" />
							<span>{menu.name}</span>
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
}

export default SideBar

