import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const AdminUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchTransactions();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/admin/user/${id}`);
      setUser(data.user);
    } catch (error) {
      toast.error("Unable to load user.");
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get(`/admin/user/${id}/transactions`);
      setTransactions(data);
    } catch (error) {
      toast.error("Unable to load transactions.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mb-6"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex flex-col items-center">

            <FaUserCircle className="text-blue-600 text-8xl mb-4" />

            <h1 className="text-3xl font-bold">
              {user.fullname}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
            <p className="text-sm">Account Number</p>
            <h2 className="text-xl font-bold">
              {user.accountNumber}
            </h2>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow">
            <p className="text-sm">Balance</p>
            <h2 className="text-2xl font-bold">
              ₦{Number(user.balance).toLocaleString()}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
            <p className="text-sm">Transactions</p>
            <h2 className="text-2xl font-bold">
              {transactions.length}
            </h2>
          </div>

          <div
            className={`rounded-xl p-6 shadow text-white ${user.isFrozen ? "bg-red-600" : "bg-emerald-600"
              }`}
          >
            <p className="text-sm">Status</p>
            <h2 className="text-2xl font-bold">
              {user.isFrozen ? "Frozen" : "Active"}
            </h2>
          </div>

        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Customer Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Full Name</p>
              <h3 className="font-semibold text-lg">
                {user.fullname}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold text-lg">
                {user.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Account Number</p>
              <h3 className="font-semibold text-lg">
                {user.accountNumber}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Current Balance</p>
              <h3 className="font-semibold text-green-600 text-xl">
                ₦{Number(user.balance).toLocaleString()}
              </h3>
            </div>

          </div>

        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Transaction History
          </h2>

          {transactions.length === 0 ? (

            <p className="text-gray-500">
              No transactions found.
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    <th className="p-4 text-left">Sender</th>

                    <th className="p-4 text-left">Receiver</th>

                    <th className="p-4 text-left">Amount</th>

                    <th className="p-4 text-left">Date</th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map((transaction) => (

                    <tr
                      key={transaction._id}
                      className="border-b odd:bg-white even:bg-slate-50 hover:bg-blue-50"
                    >

                      <td className="p-4">
                        {transaction.sender?.fullname}
                      </td>

                      <td className="p-4">
                        {transaction.receiver?.fullname}
                      </td>

                      <td className="p-4 font-bold text-green-600">
                        ₦{Number(transaction.amount).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default AdminUser;