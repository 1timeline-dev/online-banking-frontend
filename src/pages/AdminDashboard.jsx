import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaExchangeAlt,
    FaWallet,
    FaSearch,
    FaArrowLeft,
    FaChartBar,
    FaShieldAlt,
    FaBell,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import api from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTransactions: 0,
        totalBalance: 0,
    });

    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const chartData = [
        {
            name: "Users",
            value: stats.totalUsers,
        },
        {
            name: "Transactions",
            value: stats.totalTransactions,
        },
    ];

    const pieData = [
        {
            name: "Active",
            value: users.filter((u) => !u.isFrozen).length,
        },
        {
            name: "Frozen",
            value: users.filter((u) => u.isFrozen).length,
        },
    ];
    const activeUsers = users.filter((user) => !user.isFrozen).length;

    const frozenUsers = users.filter((user) => user.isFrozen).length;

    const COLORS = ["#16a34a", "#dc2626"];




    useEffect(() => {
        fetchDashboard();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers(search, page);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, page]);
    const fetchDashboard = async () => {
        try {
            const dashboardRes = await api.get("/admin/dashboard");
            const transactionRes = await api.get("/admin/transactions");

            setStats(dashboardRes.data);
            setTransactions(transactionRes.data.transactions);

            await fetchUsers();
        } catch (error) {
            toast.error("Unable to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async (query = "", currentPage = page) => {
        try {
            const res = await api.get(
                `/admin/users?search=${query}&page=${currentPage}`
            );

            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            toast.error("Unable to load users.");
        }
    };
    const toggleFreeze = async (id, frozen) => {
        try {
            const url = frozen
                ? `/admin/unfreeze/${id}`
                : `/admin/freeze/${id}`;

            const { data } = await api.patch(url);

            toast.success(data.message);

            fetchUsers(search, page);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation failed."
            );
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] text-xl font-semibold text-slate-700">
                Loading Admin Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200/80 bg-slate-950 px-6 py-6 text-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.55)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Admin control center</p>
                        <h1 className="mt-2 text-2xl font-semibold leading-tight sm:text-4xl">SecureTrust administration</h1>
                        <p className="mt-2 text-sm text-slate-300">Monitor accounts, finances, and platform activity with clarity.</p>
                    </div>

                    <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-white/20">
                        <FaArrowLeft /> Back to dashboard
                    </button>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)]">
                        <div className="flex items-center justify-between">
                            <div className="rounded-2xl bg-slate-900 p-3 text-white">
                                <FaUsers size={20} />
                            </div>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Live</span>
                        </div>
                        <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total users</h2>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalUsers}</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)]">
                        <div className="flex items-center justify-between">
                            <div className="rounded-2xl bg-emerald-600 p-3 text-white">
                                <FaExchangeAlt size={20} />
                            </div>
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">Flow</span>
                        </div>
                        <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Transactions</h2>
                        <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalTransactions}</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)]">
                        <div className="flex items-center justify-between">
                            <div className="rounded-2xl bg-violet-600 p-3 text-white">
                                <FaWallet size={20} />
                            </div>
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">Capital</span>
                        </div>
                        <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total balance</h2>
                        <p className="mt-2 break-words text-2xl font-semibold text-slate-900 sm:text-3xl">₦{Number(stats.totalBalance).toLocaleString()}</p>
                    </div>
                </div>

                {/* Charts */}

                <div className="mb-8 grid min-w-0 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="min-w-0 rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)] sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">System overview</h2>
                                <p className="text-sm text-slate-500">A quick view of platform growth</p>
                            </div>
                            <div className="rounded-full bg-slate-900 p-3 text-white"><FaChartBar /></div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="min-w-0 rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)] sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">User status</h2>
                                <p className="text-sm text-slate-500">Frozen vs active accounts</p>
                            </div>
                            <div className="rounded-full bg-emerald-50 p-3 text-emerald-700"><FaShieldAlt /></div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                                    {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mb-8 min-w-0 rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)] sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">Recent transactions</h2>
                            <p className="text-sm text-slate-500">Latest activity across the platform</p>
                        </div>
                        <div className="rounded-full bg-slate-100 p-3 text-slate-600"><FaBell /></div>
                    </div>

                    <div className="min-w-0 overflow-x-auto">

                        <table className="min-w-[560px]">

                            <thead>

                                <tr className="border-b bg-slate-50">
                                    <th className="text-left p-4">Sender</th>
                                    <th className="text-left p-4">Receiver</th>
                                    <th className="text-left p-4">Amount</th>
                                    <th className="text-left p-4">Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {transactions.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No transactions found.
                                        </td>
                                    </tr>

                                ) : (

                                    transactions.slice(0, 10).map((transaction) => (

                                        <tr
                                            key={transaction._id}
                                            className="border-b hover:bg-slate-50"
                                        >

                                            <td className="p-4">
                                                {transaction.sender?.fullname}
                                            </td>

                                            <td className="p-4">
                                                {transaction.receiver?.fullname}
                                            </td>

                                            <td className="p-4 font-semibold">
                                                ₦{Number(transaction.amount).toLocaleString()}
                                            </td>

                                            <td className="p-4">
                                                {new Date(transaction.createdAt).toLocaleDateString()}
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
                <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[24px] border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Active users</h3>
                        <p className="mt-3 text-3xl font-semibold text-emerald-800">{activeUsers}</p>
                    </div>
                    <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Frozen users</h3>
                        <p className="mt-3 text-3xl font-semibold text-red-800">{frozenUsers}</p>
                    </div>
                    <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Transactions</h3>
                        <p className="mt-3 text-3xl font-semibold text-sky-800">{stats.totalTransactions}</p>
                    </div>
                    <div className="rounded-[24px] border border-violet-100 bg-violet-50 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Total balance</h3>
                        <p className="mt-3 text-3xl font-semibold text-violet-800">₦{Number(stats.totalBalance).toLocaleString()}</p>
                    </div>
                </div>


                {/* Users Table */}

                <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.4)] sm:p-6">
                    <div className="relative mb-6">
                        <FaSearch className="absolute left-4 top-4 text-slate-400" />
                        <input type="text" placeholder="Search name, email or account number..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 p-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100" />
                    </div>

                    <div className="min-w-0 overflow-x-auto">
                        <table className="min-w-[760px] text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Account</th>
                                    <th className="p-4">Balance</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-slate-500">No users found.</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="border-b border-slate-200 transition hover:bg-slate-50">
                                            <td className="p-4 font-semibold text-slate-900">{user.fullname}</td>
                                            <td className="p-4 text-slate-600">{user.email}</td>
                                            <td className="p-4 text-slate-600">{user.accountNumber}</td>
                                            <td className="p-4 font-semibold text-slate-900">₦{Number(user.balance).toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${user.isFrozen ? "bg-red-600" : "bg-emerald-600"}`}>
                                                    {user.isFrozen ? "Frozen" : "Active"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => navigate(`/admin/user/${user._id}`)} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">View</button>
                                                    <button onClick={() => toggleFreeze(user._id, user.isFrozen)} className={`rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${user.isFrozen ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}>
                                                        {user.isFrozen ? "Unfreeze" : "Freeze"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">Previous</button>
                            <span className="text-sm font-semibold text-slate-600">Page {page} of {totalPages}</span>
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;