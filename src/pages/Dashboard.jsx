import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faMoneyBillWave, faSync, faCalendarAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Custom Card Component for Statistics (Elevated Design)
const StatCard = ({ title, value, icon, accentColor, loading }) => (
    <div className={`
        flex-1 min-w-[280px] h-40 p-6 rounded-xl shadow-2xl transition duration-300 transform hover:shadow-blue-300/50 hover:scale-[1.02]
        bg-white border border-gray-100 relative overflow-hidden
    `}>
        {/* Subtle Background Accent */}
        <div className={`absolute top-0 right-0 w-1/3 h-full opacity-10 rounded-l-full`} style={{ background: accentColor }}></div>

        {loading ? (
            <div className="flex items-center justify-center h-full">
                <FontAwesomeIcon icon={faSpinner} className='animate-spin text-gray-400 text-2xl' />
            </div>
        ) : (
            <div className="flex flex-col justify-between h-full">
                {/* Icon and Title */}
                <div className="flex bg-red justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</span>
                    <div className={`p-3 rounded-lg`} style={{ background: accentColor, color: 'white' }}>
                        <FontAwesomeIcon icon={icon} size='lg' />
                    </div>
                </div>
                
                {/* Value */}
                <span className="text-4xl font-extrabold text-gray-900 leading-none">
                    {value}
                </span>
            </div>
        )}
    </div>
);

function Dashboard() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [dashboardData, setDashboardData] = useState({
        membersCount: 0,
        totalAmount: 0,
    });
    const [loading, setLoading] = useState(false);

    // Generate last 5 years dynamically
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).sort((a, b) => b - a); 

    useEffect(() => {
        fetchDashboardData();
    }, [year]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/api/amountentry/dashboard/${year}`);
            setDashboardData(res.data);
        } catch (err) {
            console.error("Error fetching dashboard data", err);
            setDashboardData({ membersCount: 'N/A', totalAmount: 'N/A' }); 
        } finally {
            setLoading(false);
        }
    };

    const formattedAmount = dashboardData.totalAmount !== 'N/A'
        ? new Intl.NumberFormat('en-IN', { 
            style: 'currency', 
            currency: 'INR', 
            minimumFractionDigits: 0 
        }).format(dashboardData.totalAmount)
        : 'N/A';

    return (
        <div className="min-h-screen p-6 sm:p-10 bg-gray-50">
            
            {/* Header and Filter Block */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl shadow-lg mb-10 border-l-4 border-blue-600'>
                <div className="mb-4 sm:mb-0">
                    <h1 className='font-extrabold text-3xl text-gray-900 flex items-center mb-1'>
                        <FontAwesomeIcon icon={faChartBar} className='mr-3 text-blue-600' /> Dashboard Overview
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Key performance indicators for the selected financial period.
                    </p>
                </div>

                {/* Year Selector / Filter */}
                <div className="flex items-center">
                    <label htmlFor="year-select" className="text-gray-700 font-medium mr-3 flex items-center text-sm">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                        Period:
                    </label>
                    <select
                        id="year-select"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border border-gray-300 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                        disabled={loading}
                    >
                        {years.map((yr) => (
                            <option key={yr} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={fetchDashboardData}
                        disabled={loading}
                        className="ml-3 p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition disabled:opacity-50"
                        aria-label="Refresh Data"
                    >
                        <FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Total Members */}
                <StatCard
                    title="Total Registered Members"
                    value={dashboardData.membersCount}
                    icon={faUsers}
                    accentColor="#3b82f6" // blue-500
                    loading={loading}
                />

                {/* Total Amount */}
                <StatCard
                    title={`Total Contribution (${year})`}
                    value={formattedAmount}
                    icon={faMoneyBillWave}
                    accentColor="#10b981" // emerald-500
                    loading={loading}
                />

                {/* Placeholder Card (Example for future expansion) */}
                <StatCard
                    title="Average Monthly Deposit"
                    value={loading ? '...' : "₹ 15,000"}
                    icon={faSpinner}
                    accentColor="#8b5cf6" // violet-500
                    loading={loading}
                />
            </div>
            
            {/* Optional: Detailed Metrics Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Detailed Metrics</h2>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-gray-500">
                        *This area is reserved for charts (e.g., bar charts of monthly contributions) or detailed reports.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;