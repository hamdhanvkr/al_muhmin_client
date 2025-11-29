import React, { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import SideBar from '../components/layout/SideBar'
import { Outlet } from 'react-router-dom'

function OverLayout() {

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div>
			<TopBar onOpen={() => setIsSidebarOpen(true)} />
			{isSidebarOpen && <SideBar isClose={() => setIsSidebarOpen(false)} />}
			<Outlet />
		</div>
	)
}

export default OverLayout