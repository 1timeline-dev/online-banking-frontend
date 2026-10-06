import { useEffect, useState } from "react";
import {
  FaUsers,
  FaExchangeAlt,
  FaShieldAlt,
  FaFilePdf,
} from "react-icons/fa";
import api from "../services/api";

const Stats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/public/stats");

      setStats({
        totalUsers: data.totalUsers,
        totalTransactions: data.totalTransactions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            Trusted Banking Features
          </h2>

          <p className="text-slate-500 mt-4">
            Built with real banking functionalities.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-50 rounded-2xl p-8 shadow text-center">

            <FaUsers className="text-5xl text-blue-600 mx-auto mb-5" />

            <h1 className="text-4xl font-bold">
              {stats.totalUsers}
            </h1>

            <p className="text-slate-500 mt-3">
              Registered Users
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 shadow text-center">

            <FaExchangeAlt className="text-5xl text-green-600 mx-auto mb-5" />

            <h1 className="text-4xl font-bold">
              {stats.totalTransactions}
            </h1>

            <p className="text-slate-500 mt-3">
              Successful Transfers
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 shadow text-center">

            <FaShieldAlt className="text-5xl text-red-500 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">
              JWT + OTP
            </h2>

            <p className="text-slate-500 mt-3">
              Secure Authentication
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-8 shadow text-center">

            <FaFilePdf className="text-5xl text-indigo-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">
              PDF
            </h2>

            <p className="text-slate-500 mt-3">
              Bank Statements
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Stats;