import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faUsers,
	faUser,
	faGear,
	faRightFromBracket,
	faXmark,
	faDollarSign,
	faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useParams } from 'react-router-dom';

function SideBar({ isClose }) {
	
	const { username } = useParams();

	const sidemenus = [
		{
			name: 'Dashboard',
			path: `/layout/${username}/dashboard`,
			icon: faHome,
		},
		{
			name: 'Member Details',
			path: `/layout/${username}/memberdetails`,
			icon: faUsers,
		},
		{
			name: 'Amount Entry',
			path: `/layout/${username}/amountentry`,
			icon: faDollarSign,
		},
		{
			name: 'Distribution',
			path: `/layout/${username}/distributiondetails`,
			icon: faChartBar,
		},
	];

	const utilitymenus = [
		{
			name: 'Settings',
			path: `/layout/${username}/setting`,
			icon: faGear,
		},
		{
			name: 'Logout',
			path: '/',
			icon: faRightFromBracket,
		}
	];

	return (
		<div>
			<div className="fixed top-0 left-0 h-full w-68 py-6 px-4 bg-slate-800 text-white z-30 shadow-xl transition-transform duration-300">
				<button
					className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 transition lg:hidden"
					onClick={isClose}
					aria-label="Close Sidebar"
				>
					<FontAwesomeIcon icon={faXmark} className="text-xl text-slate-300" />
				</button>

				<div className="flex flex-col items-center border-b border-slate-700 pb-6 mb-6">
					<div className="bg-slate-700 p-3.5 rounded-full mb-3">
						<FontAwesomeIcon icon={faUser} className="text-slate-200 text-3xl" />
					</div>
					<span className="text-lg font-semibold text-slate-100 capitalize">
						{username || 'Admin User'}
					</span>
					<span className="text-sm text-slate-400">Application Access</span>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
						Menu
					</span>
					{sidemenus.map((menu, index) => (
						<NavLink
							key={index}
							to={menu.path}
							onClick={isClose}
							className={({ isActive }) =>
								`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out
								${isActive
									? 'bg-slate-700 text-white shadow-inner border-l-4 border-teal-500'
									: 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
							}
						>
							<FontAwesomeIcon icon={menu.icon} className="w-4 h-4" />
							<span>{menu.name}</span>
						</NavLink>
					))}
				</div>

				<hr className="my-6 border-slate-700" />

				<div className="flex flex-col gap-1">
					<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
						Tools
					</span>

					{utilitymenus.map((menu, index) => (
						<NavLink
							key={`utility-${index}`}
							to={menu.path}
							onClick={isClose}
							className={({ isActive }) =>
								`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out
								${isActive
									? 'bg-slate-700 text-white shadow-inner border-l-4 border-teal-500'
									: 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
							}
						>
							<FontAwesomeIcon icon={menu.icon} className="w-4 h-4" />
							<span>{menu.name}</span>
						</NavLink>
					))}
				</div>

			</div>
		</div>
	);
}

export default SideBar;