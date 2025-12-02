import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faMoneyBillWave, faSync, faCalendarAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

const StatCard = ({ title, value, icon, accentColor, loading }) => (

    <div className="
        flex-1 min-w-[280px] h-40 p-6 rounded-xl shadow-2xl transition duration-300 transform hover:shadow-blue-300/50 hover:scale-[1.02]
        bg-white border border-gray-100 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-1/3 h-full rounded-l-full opacity-10" style={{ background: accentColor }}></div>

        {loading ? (
            <div className="flex items-center justify-center h-full">
                <FontAwesomeIcon icon={faSpinner} className='text-2xl text-gray-400 animate-spin' />
            </div>
        ) : (
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between mb-3 bg-red">
                    <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{title}</span>
                    <div className="p-3 rounded-lg" style={{ background: accentColor, color: 'white' }}>
                        <FontAwesomeIcon icon={icon} size='lg' />
                    </div>
                </div>
                <span className="text-4xl font-extrabold leading-none text-gray-900">
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

    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).sort((a, b) => b - a);

    useEffect(() => {
        fetchDashboardData();
    }, []);

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
            <div className='flex flex-col items-start justify-between p-6 mb-10 bg-white border-l-4 border-blue-600 shadow-lg sm:flex-row sm:items-center rounded-xl'>
                <div className="mb-4 sm:mb-0">
                    <h1 className='flex items-center mb-1 text-3xl font-extrabold text-gray-900'>
                        <FontAwesomeIcon icon={faChartBar} className='mr-3 text-blue-600' /> Dashboard Overview
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Key performance indicators for the selected financial period.
                    </p>
                </div>

                <div className="flex items-center">
                    <label htmlFor="year-select" className="flex items-center mr-3 text-sm font-medium text-gray-700">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                        Period:
                    </label>
                    <select
                        id="year-select"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="px-4 py-2 text-gray-800 transition bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="p-2 ml-3 text-gray-500 transition bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Registered Members"
                    value={dashboardData.membersCount}
                    icon={faUsers}
                    accentColor="#3b82f6"
                    loading={loading}
                />

                <StatCard
                    title={`Total Contribution (${year})`}
                    value={formattedAmount}
                    icon={faMoneyBillWave}
                    accentColor="#10b981"
                    loading={loading}
                />

                <StatCard
                    title="Average Monthly Deposit"
                    value={loading ? '...' : "₹ 15,000"}
                    icon={faSpinner}
                    accentColor="#8b5cf6"
                    loading={loading}
                />
            </div>

            <div className="mt-12">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">Detailed Metrics</h2>
                <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
                    <p className="text-gray-500">
                        *This area is reserved for charts (e.g., bar charts of monthly contributions) or detailed reports.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
