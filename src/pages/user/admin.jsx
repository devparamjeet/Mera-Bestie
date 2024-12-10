import React from 'react';
import Dashboard from '../../components/admin/dashboard';
import Sidebar from '../../components/admin/sidebar';
import { Helmet } from "react-helmet";

const Admin = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Admin | Mera Bestie</title>
            </Helmet>
            
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="lg:w-64 w-full">
                    <Sidebar />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 ps-4 lg:ps-8">
                    <div className="max-w-7xl mx-auto">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
