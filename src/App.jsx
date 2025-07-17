import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import OverLayout from './layout/OverLayout';
import MemberDetails from './pages/MemberDetails';
import DistributionDetails from './pages/DistributionDetails';
import Setting from './pages/Setting';
import Dashboard from './pages/Dashboard';
import MainPages from './pages/MainPage'

const App = () => {

	return (
		<Routes>
			<Route path='/' element={<MainPages />} />
			<Route path='/login' element={<Login />} />
			<Route path='/layout/:username' element={<OverLayout />} >
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='memberdetails' element={<MemberDetails />} />
				<Route path='distributiondetails' element={<DistributionDetails />} />
				<Route path='setting' element={<Setting />} />
			</Route>
		</Routes>
	)
}

export default App