import { useContext, useEffect, useState } from "react";
import {
    FaMoneyBillWave,
    FaExchangeAlt,
    FaHistory,
    FaUserCircle,
    FaSignOutAlt,
    FaFilePdf,
    FaUserShield,
    FaArrowDown,
    FaArrowUp,
    FaCreditCard,
    FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import ActionCard from "../components/ActionCard";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const balanceRes = await api.get("/user/balance");
            const transactionRes = await api.get("/user/transactions");

            setBalance(balanceRes.data.balance);
            setTransactions(transactionRes.data.transactions);
        } catch (error) {
            toast.error("Unable to load dashboard.");
        }
    };

    const downloadStatement = async () => {
        try {
            const res = await api.get("/user/statement", { responseType: "blob" });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", "Bank-Statement.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Statement downloaded successfully!");
        } catch (error) {
            toast.error("Unable to download statement.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    const actionCards = [
        { title: "Transfer", description: "Move money securely", icon: <FaExchangeAlt />, onClick: () => navigate("/transfer"), accent: "from-slate-900 to-slate-700" },
        { title: "Transactions", description: "Track activity", icon: <FaHistory />, onClick: () => navigate("/transactions"), accent: "from-emerald-600 to-teal-600" },
        { title: "Beneficiaries", description: "Manage recipients", icon: <FaMoneyBillWave />, onClick: () => navigate("/beneficiaries"), accent: "from-slate-800 to-slate-600" },
        { title: "Statement", description: "Download PDF", icon: <FaFilePdf />, onClick: downloadStatement, accent: "from-amber-500 to-orange-600" },
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-6 sm:px-6 lg:px-8">
            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white/70 bg-slate-950/95 px-5 py-4 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
                <div>
                    <p className="text-sm text-slate-400">SecureTrust</p>
                    <h1 className="text-xl font-semibold">Private Banking</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div onClick={() => navigate("/profile")} className="flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-2">
                        {user?.profileImage ? <img src={user.profileImage} alt="Profile" className="h-9 w-9 rounded-full object-cover" /> : <FaUserCircle size={28} />}
                        <span className="hidden text-sm font-medium sm:block">{user?.fullname}</span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </nav>

            <div className="mx-auto max-w-7xl py-6">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-[0_30px_80px_-25px_rgba(15,23,42,0.5)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Available balance</p>
                                <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">₦{Number(balance).toLocaleString()}</h2>
                            </div>
                            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">+12.4%</div>
                        </div>
                        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><FaCreditCard /> Premium card</span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><FaBell /> 3 new notifications</span>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">This month</p>
                                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Income & expenses</h3>
                            </div>
                            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Stable</div>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[24px] bg-slate-50 p-4">
                                <div className="flex items-center gap-2 text-emerald-600"><FaArrowDown /> Income</div>
                                <p className="mt-3 text-2xl font-semibold text-slate-900">₦1.28M</p>
                            </div>
                            <div className="rounded-[24px] bg-slate-50 p-4">
                                <div className="flex items-center gap-2 text-amber-600"><FaArrowUp /> Expenses</div>
                                <p className="mt-3 text-2xl font-semibold text-slate-900">₦547K</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-slate-900">Quick actions</h3>
                        <span className="text-sm text-slate-500">Everything in one place</span>
                    </div>
                    <div className={`grid gap-4 ${user?.role === "admin" ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
                        {actionCards.map((card) => (
                            <ActionCard key={card.title} {...card} />
                        ))}
                        {user?.role === "admin" && (
                            <ActionCard title="Admin panel" description="Manage accounts" icon={<FaUserShield />} onClick={() => navigate("/admin")} accent="from-amber-500 to-orange-600" />
                        )}
                    </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold text-slate-900">Recent transactions</h3>
                                <p className="text-sm text-slate-500">Your latest account activity</p>
                            </div>
                            <button onClick={() => navigate("/transactions")} className="text-sm font-semibold text-emerald-700">View all</button>
                        </div>

                        {transactions.length === 0 ? (
                            <p className="rounded-[20px] bg-slate-50 p-8 text-center text-slate-500">No transactions yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {transactions.slice(0, 5).map((transaction) => {
                                    const isDebit = transaction.type === "Debit";
                                    return (
                                        <div key={transaction._id} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-900">{transaction.receiver?.fullname || transaction.sender?.fullname}</p>
                                                <p className="text-sm text-slate-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`font-semibold ${isDebit ? "text-red-600" : "text-emerald-600"}`}>
                                                {isDebit ? "-" : "+"}₦{Number(transaction.amount).toLocaleString()}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
                        <h3 className="text-2xl font-semibold text-slate-900">Notifications</h3>
                        <div className="mt-6 space-y-3">
                            {[
                                { title: "Transfer completed", text: "Your transfer of ₦15,000 was successful.", time: "2h ago" },
                                { title: "Statement ready", text: "Your monthly statement is available to download.", time: "Yesterday" },
                                { title: "Security update", text: "A new login device was verified successfully.", time: "3d ago" },
                            ].map((item) => (
                                <div key={item.title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-slate-900">{item.title}</p>
                                        <span className="text-xs text-slate-500">{item.time}</span>
                                    </div>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;