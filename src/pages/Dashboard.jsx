import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [year, setYear] = useState(new Date().getFullYear());
    const [dashboardData, setDashboardData] = useState({
        membersCount: 0,
        totalAmount: 0,
    });
    const [loading, setLoading] = useState(false);

    // Generate last 5 years dynamically
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Header with Year Selector */}
            <h2 className="text-2xl font-bold text-center">Dashboard</h2>
            <div className="flex justify-center mt-5">
                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border px-3 py-2 rounded"
                >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p>Loading dashboard data...</p>
            ) : (
                <div className="flex gap-10">
                    {/* Total Members */}
                    <div className="w-60 h-40 border-black border-2 rounded-2xl mt-5 flex shadow-lg bg-white">
                        <div className="h-full w-full flex flex-col justify-center items-center font-bold">
                            <span>Total Members</span>
                            <span>{dashboardData.membersCount}</span>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="w-60 h-40 border-black border-2 rounded-2xl mt-5 flex shadow-lg bg-white">
                        <div className="h-full w-full flex flex-col justify-center items-center font-bold">
                            <span>Total Amount</span>
                            <span>₹ {dashboardData.totalAmount}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
