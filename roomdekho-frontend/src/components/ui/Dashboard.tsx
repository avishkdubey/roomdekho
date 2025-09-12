import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBuilding,
  faUsers,
  faUserTie,
  faCog,
  faBell,
  faSearch,
  faSignOutAlt,
  faEye,
  faCheckCircle,
  faTimesCircle,
  faBars,
  faFileInvoiceDollar,
  faCalendarCheck,
  faEnvelope,
  faWrench,
  faCompressAlt,
  faExpandAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/*
  Dashboard.tsx
  Responsive, accessible admin dashboard (single-file demo)
  - Sidebar: mobile overlay + desktop collapsible
  - Nav items: properly switch tabs and auto-close mobile menu
  - Properties: demo data + approve/reject/view actions
  - Charts: Recharts demo
  - Tailwind classes used (assumes Tailwind is configured)
*/

// --- types 
type PropertyStatus = "Pending" | "Approved" | "Rejected";
interface Property {
  id: number;
  owner: string;
  type: string;
  location: string;
  status: PropertyStatus;
  price?: number;
  createdAt?: string;
}

// --- demo data
const initialProperties: Property[] = [
  { id: 1, owner: "Divyansh Vyas", type: "2BHK Flat", location: "Gwalior, MP", status: "Pending", price: 8500, createdAt: "2025-08-20" },
  { id: 2, owner: "Abhishek Dubey", type: "1RK Room", location: "Indore, MP", status: "Approved", price: 6000, createdAt: "2025-06-12" },
  { id: 3, owner: "Jane Smith", type: "3BHK Apartment", location: "Bhopal, MP", status: "Approved", price: 25000, createdAt: "2025-05-01" },
  { id: 4, owner: "John Doe", type: "1BHK Flat", location: "Gwalior, MP", status: "Rejected", price: 9000, createdAt: "2025-07-03" },
  { id: 5, owner: "Emily White", type: "Villa", location: "Indore, MP", status: "Pending", price: 65000, createdAt: "2025-08-30" },
  { id: 6, owner: "Michael Brown", type: "2BHK House", location: "Gwalior, MP", status: "Approved", price: 15000, createdAt: "2025-04-22" },
  { id: 7, owner: "Sanjay Patel", type: "1RK Room", location: "Bhopal, MP", status: "Pending", price: 5000, createdAt: "2025-09-01" },
  { id: 8, owner: "Ritu Sharma", type: "2BHK Flat", location: "Indore, MP", status: "Approved", price: 12000, createdAt: "2025-03-18" },
  { id: 9, owner: "Amit Verma", type: "Studio", location: "Gwalior, MP", status: "Pending", price: 7000, createdAt: "2025-02-11" },
  { id: 10, owner: "Maya Rao", type: "3BHK Duplex", location: "Indore, MP", status: "Approved", price: 45000, createdAt: "2025-01-30" },
  { id: 11, owner: "Rohit Singh", type: "1BHK Flat", location: "Bhopal, MP", status: "Rejected", price: 8000, createdAt: "2025-07-21" },
  { id: 12, owner: "Neha Gupta", type: "2BHK Flat", location: "Indore, MP", status: "Pending", price: 11000, createdAt: "2025-09-05" },
];

const userGrowthData = [
  { month: "Jan", owners: 10, renters: 30 },
  { month: "Feb", owners: 15, renters: 45 },
  { month: "Mar", owners: 25, renters: 60 },
  { month: "Apr", owners: 30, renters: 80 },
  { month: "May", owners: 45, renters: 110 },
  { month: "Jun", owners: 50, renters: 150 },
];

const revenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 30000 },
  { month: "Mar", revenue: 50000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 60000 },
  { month: "Jun", revenue: 75000 },
];

const propertyStatusData = [
  { name: "Approved", value: 75 },
  { name: "Pending", value: 43 },
  { name: "Rejected", value: 7 },
];
const COLORS = ["#4ade80", "#facc15", "#f87171"];

// --- main component
export default function Dashboard(): JSX.Element {
  const tabs = [
    "Dashboard",
    "Properties",
    "Bookings",
    "Payments",
    "Users",
    "Owners",
    "Messages",
    "Maintenance",
    "Settings",
  ];

  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // desktop collapsed icons-only

  const [properties, setProperties] = useState<Property[]>(initialProperties);

  // Search + pagination state (parent-level so other parts can use stats)
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  // filter & paged list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter((p) => `${p.owner} ${p.type} ${p.location} ${p.status}`.toLowerCase().includes(q));
  }, [properties, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // actions
  const approveProperty = (id: number) => setProperties(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" } : p));
  const rejectProperty = (id: number) => setProperties(prev => prev.map(p => p.id === id ? { ...p, status: "Rejected" } : p));
  const viewProperty = (id: number) => {
    const p = properties.find(x => x.id === id);
    if (p) {
      // quick detail modal replacement
      window.alert(`Property\nOwner: ${p.owner}\nType: ${p.type}\nLocation: ${p.location}\nStatus: ${p.status}`);
    }
  };

  // close mobile sidebar on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileSidebarOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // dynamic main-margin so content doesn't hide under fixed sidebar
  const mainMarginClass = isCollapsed ? 'md:ml-20' : 'md:ml-64';

  return (
    <div className={`min-h-screen flex bg-gray-50 text-gray-900`}> 

      {/* OFFCANVAS OVERLAY (mobile) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setMobileSidebarOpen(false)} aria-hidden />
      )}

      {/* SIDEBAR */}
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64 bg-gray-800 text-white flex flex-col`}
      >
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="text-lg font-semibold tracking-wide">
            {isCollapsed ? <span className="text-yellow-400">RD</span> : <span>RoomDekho</span>}
          </div>
          {/* desktop collapse control */}
          <div className="ml-auto hidden md:flex items-center">
            <button
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setIsCollapsed(s => !s)}
              className="p-2 rounded-md hover:bg-gray-700 transition"
              aria-pressed={isCollapsed}
            >
              <FontAwesomeIcon icon={isCollapsed ? faExpandAlt : faCompressAlt} />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMobileSidebarOpen(false); setPage(1); }}
              className={`group w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm
                ${activeTab === tab ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-700'}
                ${isCollapsed ? 'justify-center' : ''}`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              <FontAwesomeIcon icon={getIconForTab(tab)} />
              {!isCollapsed && <span className="truncate">{tab}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN (push content to the right on desktop using margin) */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all ${mainMarginClass}`}>

        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between gap-3 p-3 md:p-4">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger (always visible on small screens) */}
              <button
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>

              {/* Desktop collapse control (repeat here for easier access) */}
              <button
                className="hidden md:inline-flex p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsCollapsed(s => !s)}
                aria-label="Toggle sidebar"
              >
                <FontAwesomeIcon icon={isCollapsed ? faExpandAlt : faCompressAlt} />
              </button>

              <h1 className="text-base md:text-lg font-semibold">{activeTab}</h1>
              <span className="hidden md:inline-block text-sm text-gray-500">Admin panel</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    value={query}
                    onChange={e => { setQuery(e.target.value); setPage(1); }}
                    placeholder="Search properties, owners..."
                    className="pl-10 pr-3 py-2 w-56 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <FontAwesomeIcon icon={faBell} className="text-xl text-gray-600" />
              <img src="https://i.pravatar.cc/40" alt="Admin" className="w-9 h-9 rounded-full" />
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {activeTab === 'Dashboard' && (
            <DashboardHome properties={properties} />
          )}

          {activeTab === 'Properties' && (
            <PropertiesManagement
              properties={paged}
              onApprove={approveProperty}
              onReject={rejectProperty}
              onView={viewProperty}
              query={query}
              setQuery={setQuery}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}

          {activeTab === 'Users' && <UsersManagement />}
          {activeTab === 'Payments' && <PaymentsManagement />}
          {activeTab === 'Messages' && <MessagesManagement />}
          {activeTab === 'Maintenance' && <MaintenanceManagement />}
          {['Bookings','Owners','Settings'].includes(activeTab) && (
            <Placeholder title={activeTab} />
          )}
        </div>

      </main>
    </div>
  );
}

/* ---------------- helpers & subcomponents ---------------- */

const getIconForTab = (tabName: string) => {
  switch (tabName) {
    case "Dashboard": return faTachometerAlt;
    case "Properties": return faBuilding;
    case "Users": return faUsers;
    case "Owners": return faUserTie;
    case "Settings": return faCog;
    case "Bookings": return faCalendarCheck;
    case "Payments": return faFileInvoiceDollar;
    case "Messages": return faEnvelope;
    case "Maintenance": return faWrench;
    default: return faTachometerAlt;
  }
};

const DashboardHome: React.FC<{ properties: Property[] }> = ({ properties }) => {
  const total = properties.length;
  const pending = properties.filter(p => p.status === 'Pending').length;
  const approved = properties.filter(p => p.status === 'Approved').length;
  const revenue = revenueData.reduce((s, r) => s + r.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value={String(total)} />
        <StatCard title="Pending" value={String(pending)} />
        <StatCard title="Approved" value={String(approved)} />
        <StatCard title="Revenue (YTD)" value={`₹${new Intl.NumberFormat().format(revenue)}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">User Growth</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
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
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Property Status</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={propertyStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {propertyStatusData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Monthly Revenue</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
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
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <div className="text-2xl md:text-3xl font-bold mt-2">{value}</div>
  </div>
);

/* Properties table accepts paged rows */
const PropertiesManagement: React.FC<{
  properties: Property[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onView: (id: number) => void;
  query: string;
  setQuery: (s: string) => void;
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
}> = ({ properties, onApprove, onReject, onView, query, setQuery, page, setPage, totalPages }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold">Manage Properties</h2>
        <div className="flex items-center gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search owner, type or location" className="px-3 py-2 rounded-full bg-gray-100 focus:outline-none" />
          <button className="px-4 py-2 rounded-full bg-yellow-500 text-gray-900">Create</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Owner</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{p.owner}</td>
                <td className="px-3 py-2">{p.type}</td>
                <td className="px-3 py-2">{p.location}</td>
                <td className="px-3 py-2">{p.price ? `₹${p.price.toLocaleString()}` : '-'}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${p.status === 'Approved' ? 'bg-green-100 text-green-700' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => onView(p.id)} className="p-2 rounded hover:bg-gray-100"><FontAwesomeIcon icon={faEye} /></button>
                    <button onClick={() => onApprove(p.id)} className="p-2 rounded hover:bg-green-50 text-green-600"><FontAwesomeIcon icon={faCheckCircle} /></button>
                    <button onClick={() => onReject(p.id)} className="p-2 rounded hover:bg-red-50 text-red-600"><FontAwesomeIcon icon={faTimesCircle} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-600">Page {page} / {totalPages}</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

const UsersManagement: React.FC = () => {
  const demo = [
    { id:1, name: 'Abhishek Dubey', role: 'Owner', email: 'abhishek@example.com', status: 'Active' },
    { id:2, name: 'Rohit Kumar', role: 'Renter', email: 'rohit@example.com', status: 'Active' },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Role</th><th className="px-3 py-2 text-left">Email</th><th className="px-3 py-2 text-left">Status</th></tr></thead>
          <tbody>
            {demo.map(u => <tr key={u.id} className="border-b hover:bg-gray-50"><td className="px-3 py-2">{u.name}</td><td className="px-3 py-2">{u.role}</td><td className="px-3 py-2">{u.email}</td><td className="px-3 py-2"><span className={`px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentsManagement: React.FC = () => {
  const demo = [
    { id:1, date: '2025-09-01', title: 'Rent - Apt 3B', amount: 8500, status: 'Paid' },
    { id:2, date: '2025-08-28', title: 'Booking fee - Villa', amount: 5000, status: 'Pending' },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Title</th><th className="px-3 py-2 text-left">Amount</th><th className="px-3 py-2 text-left">Status</th></tr></thead>
          <tbody>{demo.map(t => <tr key={t.id} className="border-b hover:bg-gray-50"><td className="px-3 py-2">{t.date}</td><td className="px-3 py-2">{t.title}</td><td className="px-3 py-2">₹{t.amount.toLocaleString()}</td><td className="px-3 py-2">{t.status}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

const MessagesManagement: React.FC = () => {
  const demo = [
    { id:1, from: 'Owner - Abhishek', subject: 'Property approval?', date: '2025-09-01' },
    { id:2, from: 'Renter - Rohit', subject: 'Maintenance request', date: '2025-08-28' },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Messages</h2>
      <ul className="space-y-2">{demo.map(m => <li key={m.id} className="p-3 rounded hover:bg-gray-50 flex justify-between items-center"><div><div className="font-medium">{m.from}</div><div className="text-sm text-gray-500">{m.subject}</div></div><div className="text-sm text-gray-400">{m.date}</div></li>)}</ul>
    </div>
  );
};

const MaintenanceManagement: React.FC = () => {
  const demo = [
    { id:1, unit: 'Apt 3B', issue: 'Leaky faucet', status: 'Open', requestedOn: '2025-09-01' },
    { id:2, unit: 'Villa 2', issue: 'AC not cooling', status: 'InProgress', requestedOn: '2025-08-25' },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Maintenance</h2>
      <div className="space-y-3">{demo.map(t => <div key={t.id} className="p-3 rounded border hover:shadow-sm flex justify-between items-center"><div><div className="font-medium">{t.unit} — {t.issue}</div><div className="text-sm text-gray-500">Requested: {t.requestedOn}</div></div><div className="flex items-center gap-2"><span className={`px-2 py-1 rounded-full text-sm ${t.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{t.status}</span><button className="px-3 py-1 bg-gray-100 rounded">Assign</button></div></div>)}</div>
    </div>
  );
};

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-500 mt-2">Demo screen — integrate APIs to replace demo data</p>
  </div>
);
