import React, { useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUsers, faUser, faGear,
    faRightFromBracket, faXmark, faDollarSign, faChartBar
} from '@fortawesome/free-solid-svg-icons';

function SideBar({ isClose }) {

    const { username } = useParams();

    const sidemenus = [
        { name: 'Dashboard', path: `/layout/${username}/dashboard`, icon: faHome },
        { name: 'Member Details', path: `/layout/${username}/memberDetails`, icon: faUsers },
        { name: 'Amount Entry', path: `/layout/${username}/amountEntry`, icon: faDollarSign },
        { name: 'Distribution', path: `/layout/${username}/distributionDetails`, icon: faChartBar },
    ];

    const utilitymenus = [
        { name: 'Academic Management', path: `/layout/${username}/academicManage`, icon: faGear },
        { name: 'User Management', path: `/layout/${username}/userManage`, icon: faGear },
        { name: 'Logout', path: '/', icon: faRightFromBracket }
    ];

    return (
        <div className="fixed top-0 left-0 z-30 h-full px-4 py-6 text-white transition-transform duration-300 shadow-xl w-68 bg-slate-800">
            <button
                className="absolute p-2 transition rounded-full top-4 right-4 hover:bg-slate-700 lg:hidden"
                onClick={isClose}
            >
                <FontAwesomeIcon icon={faXmark} className="text-xl text-slate-300" />
            </button>

            <div className="flex flex-col items-center pb-6 mb-6 border-b border-slate-700">
                <div className="bg-slate-700 p-3.5 rounded-full mb-3">
                    <FontAwesomeIcon icon={faUser} className="text-3xl text-slate-200" />
                </div>
                <span className="text-lg font-semibold capitalize text-slate-100">
                    {username || 'Admin User'}
                </span>
                <span className="text-sm text-slate-400">Application Access</span>
            </div>

            <div className="flex flex-col gap-2">
                <span className="px-3 mb-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
                    Menu
                </span>
                {sidemenus.map((menu, index) => (
                    <NavLink
                        key={index}
                        to={menu.path}
                        onClick={isClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                            ${isActive
                                ? 'bg-slate-700 text-white shadow-inner border-l-4 border-teal-500'
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                        <FontAwesomeIcon icon={menu.icon} className="w-4 h-4" />
                        <span>{menu.name}</span>
                    </NavLink>
                ))}
            </div>

            <hr className="my-6 border-slate-700" />

            <div className="flex flex-col gap-1">
                <span className="px-3 mb-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
                    Tools
                </span>

                {utilitymenus.map((menu, index) => (
                    <NavLink
                        key={index}
                        to={menu.path}
                        onClick={isClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                            ${isActive
                                ? 'bg-slate-700 text-white shadow-inner border-l-4 border-teal-500'
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                        <FontAwesomeIcon icon={menu.icon} className="w-4 h-4" />
                        <span>{menu.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

function OverLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            {isSidebarOpen && (
                <SideBar isClose={() => setIsSidebarOpen(false)} />
            )}
            <div className="flex-1">
                <button
                    className="p-3 m-3 text-white rounded-lg bg-slate-800 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    Open Menu
                </button>
                <Outlet />
            </div>
        </div>
    )
}

export default OverLayout;