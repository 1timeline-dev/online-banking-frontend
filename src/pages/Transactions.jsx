import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaArrowDown, FaArrowUp, FaDownload, FaSearch, FaArrowLeft } from "react-icons/fa";

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/user/transactions");
      setTransactions(res.data.transactions);
    } catch (error) {
      toast.error("Unable to load transactions.");
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

      toast.success("Statement downloaded.");
    } catch (error) {
      toast.error("Unable to download statement.");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const person = transaction.receiver?.fullname || transaction.sender?.fullname || "";
    return person.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Transactions</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Transaction history</h1>
            <p className="mt-2 text-slate-500">Review every movement with clarity and confidence.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={downloadStatement} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700">
              <FaDownload /> Statement
            </button>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100">
              <FaArrowLeft /> Dashboard
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search recipient..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100" />
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="rounded-[24px] bg-slate-50 py-16 text-center text-slate-500">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-950 text-sm text-white">
                <tr>
                  <th className="rounded-tl-[20px] px-4 py-3">Date</th>
                  <th className="px-4 py-3">Person</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="rounded-tr-[20px] px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => {
                  const isDebit = transaction.type === "Debit";
                  return (
                    <tr key={transaction._id} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                      <td className="px-4 py-4 text-sm text-slate-600">{new Date(transaction.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4 font-medium text-slate-900">{transaction.receiver?.fullname || transaction.sender?.fullname}</td>
                      <td className="px-4 py-4">
                        {isDebit ? <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600"><FaArrowUp /> Debit</span> : <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600"><FaArrowDown /> Credit</span>}
                      </td>
                      <td className={`px-4 py-4 font-semibold ${isDebit ? "text-red-600" : "text-emerald-600"}`}>₦{Number(transaction.amount).toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${transaction.status === "Successful" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{transaction.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;