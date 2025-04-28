import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from '../Navbar'; // Import the sidebar navigation
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import Navbar from '../../Navbar';

// Define the months in order
const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalDepenses: 0,
    });

    const [monthlyData, setMonthlyData] = useState({
        revenues: 0,
        depenses: 0,
        month: months[new Date().getMonth()], // Default to the current month
    });

    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch the total stats when the component mounts
    useEffect(() => {
        const role = localStorage.getItem("user");
        if (role === "admin") setIsAdmin(true);

        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard-stats');
                setStats(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des statistiques:', error);
            }
        };

        fetchStats();
    }, []);

    // Fetch monthly revenue and expense data when month changes
    const fetchMonthlyData = async (selectedMonth) => {
        try {
            const monthIndex = months.indexOf(selectedMonth) + 1; // Convert month name to index (1-12)
            console.log("Fetching data for:", selectedMonth, "Index:", monthIndex);

            const response = await axios.get('http://localhost:8000/api/monthly-data', {
                params: { month: monthIndex, year: new Date().getFullYear() }
            });

            console.log("API Response:", response.data);

            if (response.data) {
                const monthName = months[parseInt(response.data.month, 10) - 1]; // Map "01" to "Janvier", "02" to "Février", etc.
                setMonthlyData({
                    revenues: parseFloat(response.data.revenues),
                    depenses: parseFloat(response.data.depenses),
                    month: monthName,
                });
            } else {
                console.error("No data available for the selected month.");
            }
        } catch (error) {
            console.error("Error fetching monthly data:", error);
        }
    };

    // Handle month change from dropdown
    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        fetchMonthlyData(selectedMonth);
    };

    return (
        <div className="dashboard-container">
            {/* Render Navbar only if the user is an admin */}
            {<Navbar />}

            <div className="dashboard-content">
                <h1>Tableau de bord - Administration</h1>

                {/* Statistics Section */}
                <div className="stats">
                    <div className="stat-card">
                        <h2>Total des Revenus</h2>
                        <p>{stats.totalIncome} €</p>
                    </div>
                    <div className="stat-card">
                        <h2>Total des Dépenses</h2>
                        <p>{stats.totalDepenses} €</p>
                    </div>
                </div>

                {/* Monthly Report Section */}
                <div className="monthly-report">
                    <h2>Rapport Mensuel - {monthlyData.month}</h2>

                    {/* Monthly Revenue and Expense Display */}
                    <div className="stats">

                    <div className="stat-card">
                        <h3>Revenus</h3>
                        <p>{monthlyData.revenues} €</p>
                    </div>
                    <div className="stat-card">
                        <h3>Dépenses</h3>
                        <p>{monthlyData.depenses} €</p>
                    </div>
                    </div>
                    

                    {/* Dropdown to select month */}
<div className="month-selector mb-8">
    <label htmlFor="month-select" className="block text-gray-700 font-medium mb-2">
        Sélectionner un mois
    </label>
    <select
        id="month-select"
        onChange={handleMonthChange}
        className="w-full max-w-sm bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
        {months.map((month) => (
            <option key={month} value={month}>
                {month}
            </option>
        ))}
    </select>
</div>

<div className="chart-container bg-white shadow-lg rounded-lg p-6">
    <ResponsiveContainer width="100%" height={400}>
        <BarChart
            data={[
                {
                    name: monthlyData.month,
                    revenus: monthlyData.revenues,
                    depenses: monthlyData.depenses,
                },
            ]}
        >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="name" className="text-gray-700" />
            <YAxis className="text-gray-700" />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: '#4A5568' }}
            />
            <Legend wrapperStyle={{ color: '#4A5568' }} />
            <Bar dataKey="revenus" fill="#34D399" name="Revenus" radius={[8, 8, 0, 0]} />
            <Bar dataKey="depenses" fill="#F87171" name="Dépenses" radius={[8, 8, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;