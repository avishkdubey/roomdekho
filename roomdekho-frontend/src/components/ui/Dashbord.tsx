import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachometerAlt, faBuilding, faUsers, faUserTie, faCog, faBell, 
    faSearch, faSignOutAlt, faEye, faCheckCircle, faTimesCircle, 
    faBars, faFileInvoiceDollar, faCalendarCheck, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// --- STATIC DEMO DATA ---
const propertiesData = [
    { id: 1, owner: 'Divyansh Vyas', type: '2BHK Flat', location: 'Gwalior, MP', status: 'Pending' },
    { id: 2, owner: 'Abhishek Dubey', type: '1RK Room', location: 'Indore, MP', status: 'Approved' },
    { id: 3, owner: 'Jane Smith', type: '3BHK Apartment', location: 'Bhopal, MP', status: 'Approved' },
    { id: 4, owner: 'John Doe', type: '1BHK Flat', location: 'Gwalior, MP', status: 'Rejected' },
    { id: 5, owner: 'Emily White', type: 'Villa', location: 'Indore, MP', status: 'Pending' },
    { id: 6, owner: 'Michael Brown', type: '2BHK House', location: 'Gwalior, MP', status: 'Approved' },
];

const userGrowthData = [
    { month: 'Jan', owners: 10, renters: 30 },
    { month: 'Feb', owners: 15, renters: 45 },
    { month: 'Mar', owners: 25, renters: 60 },
    { month: 'Apr', owners: 30, renters: 80 },
    { month: 'May', owners: 45, renters: 110 },
    { month: 'Jun', owners: 50, renters: 150 },
];

const revenueData = [
    { month: 'Jan', revenue: 40000 },
    { month: 'Feb', revenue: 30000 },
    { month: 'Mar', revenue: 50000 },
    { month: 'Apr', revenue: 45000 },
    { month: 'May', revenue: 60000 },
    { month: 'Jun', revenue: 75000 },
];

const propertyStatusData = [
    { name: 'Approved', value: 75 },
    { name: 'Pending', value: 43 },
    { name: 'Rejected', value: 7 },
];
const COLORS = ['#4ade80', '#facc15', '#f87171'];


// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const renderContent = () => {
        switch (activeTab) {
            case 'Properties': return <PropertiesManagement />;
            case 'Dashboard': default: return <DashboardHome />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                <div className="text-2xl font-bold p-6 border-b border-gray-700 flex-shrink-0">
                    RoomDekha <span className="text-yellow-400">Admin</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {['Dashboard', 'Properties', 'Bookings', 'Payments', 'Users', 'Owners', 'Messages', 'Settings'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === tab ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-700'}`}>
                            <FontAwesomeIcon icon={getIconForTab(tab)} className="mr-4" />
                            <span className="truncate">{tab}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                     <button className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" />
                        <span className="truncate">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 mr-4 p-2 rounded-full hover:bg-gray-200">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <h1 className="text-xl md:text-3xl font-semibold text-gray-800">{activeTab}</h1>
                    </div>
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="relative hidden md:block">
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-48 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-600 cursor-pointer" />
                        <img src="https://i.pravatar.cc/40" alt="Admin" className="w-10 h-10 rounded-full" />
                    </div>
                </header>
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

const getIconForTab = (tabName: string) => {
    switch (tabName) {
        case 'Dashboard': return faTachometerAlt;
        case 'Properties': return faBuilding;
        case 'Users': return faUsers;
        case 'Owners': return faUserTie;
        case 'Settings': return faCog;
        case 'Bookings': return faCalendarCheck;
        case 'Payments': return faFileInvoiceDollar;
        case 'Messages': return faEnvelope;
        default: return faTachometerAlt;
    }
};

// --- Sub-components for the dashboard content ---

const DashboardHome = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Properties" value="125" />
            <StatCard title="Pending Approvals" value="7" />
            <StatCard title="Total Users" value="2,345" />
            <StatCard title="Revenue (This Month)" value="₹85,000" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="renters" stroke="#f59e0b" strokeWidth={2} name="Renters" />
                        <Line type="monotone" dataKey="owners" stroke="#8b5cf6" strokeWidth={2} name="Owners" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Property Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={propertyStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                            {propertyStatusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Monthly Revenue (₹)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const StatCard = ({ title, value }: { title: string, value: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
        <h3 className="text-gray-500 text-lg">{title}</h3>
        <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
);

const PropertiesManagement = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Properties</h2>
            {/* Add filter/search options here if needed */}
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left">Owner</th>
                        <th className="py-3 px-4 text-left">Property Type</th>
                        <th className="py-3 px-4 text-left">Location</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {propertiesData.map(prop => (
                        <tr key={prop.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{prop.owner}</td>
                            <td className="py-3 px-4">{prop.type}</td>
                            <td className="py-3 px-4">{prop.location}</td>
                            <td className="py-3 px-4">
                                <span className={`px-3 py-1 text-sm rounded-full ${prop.status === 'Approved' ? 'bg-green-100 text-green-700' : prop.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {prop.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-center space-x-3">
                                <button className="text-blue-500 hover:text-blue-700"><FontAwesomeIcon icon={faEye} /></button>
                                <button className="text-green-500 hover:text-green-700"><FontAwesomeIcon icon={faCheckCircle} /></button>
                                <button className="text-red-500 hover:text-red-700"><FontAwesomeIcon icon={faTimesCircle} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Dashboard;

