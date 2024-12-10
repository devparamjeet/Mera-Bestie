import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    // Sample data for pie charts
    const orderData = [
        { name: 'Completed', value: 75 },
        { name: 'Pending', value: 25 }
    ];
    
    const revenueData = [
        { name: 'Profit', value: 65 },
        { name: 'Cost', value: 35 }
    ];
    
    const growthData = [
        { name: 'Growth', value: 82 },
        { name: 'Target', value: 18 }
    ];

    const COLORS = ['#FF8042', '#FFBB28'];

    return (
        <div className="p-6 bg-pink-100 transition-all duration-300">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-6">Welcome back to Mera Bestie Admin!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-gray-600 text-lg mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold text-pink-600">432</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 12% from last month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-gray-600 text-lg mb-2">Orders Delivered</h2>
                    <p className="text-3xl font-bold text-pink-600">357</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 8% from last month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-gray-600 text-lg mb-2">Revenue Generated</h2>
                    <p className="text-3xl font-bold text-pink-600">₹128,000</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 15% from last month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-gray-600 text-lg mb-2">Total Products</h2>
                    <p className="text-3xl font-bold text-pink-600">89</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 5% from last month</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Order Status</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={orderData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-2xl font-bold text-pink-600 mt-4">75%</p>
                    <p className="text-center text-gray-600">Completion Rate</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Revenue Analytics</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={revenueData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-2xl font-bold text-pink-600 mt-4">65%</p>
                    <p className="text-center text-gray-600">Profit Margin</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Customer Growth</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={growthData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {growthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-2xl font-bold text-pink-600 mt-4">82%</p>
                    <p className="text-center text-gray-600">Growth Rate</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
