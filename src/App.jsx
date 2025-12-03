import React from 'react'
import { Routes, Route } from 'react-router-dom';
import OverLayout from './layout/OverLayout';
import MemberDetails from './pages/MemberDetails';
import DistributionDetails from './pages/DistributionDetails';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage'
import AmountEntry from './pages/AmountEntry';
import AcademicManage from './pages/AcademicManage';
import UserManage from './pages/UserManage';

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/layout/:username/*' element={<OverLayout />} >
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='memberDetails' element={<MemberDetails />} />
                <Route path='amountEntry' element={<AmountEntry />} />
                <Route path='distributionDetails' element={<DistributionDetails />} />
                <Route path='academicManage' element={<AcademicManage />} />
                <Route path='userManage' element={<UserManage />} />
            </Route>
        </Routes>
    )
}

export default App