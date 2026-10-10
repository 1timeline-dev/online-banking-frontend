import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Transfer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/user/transfer", form);

      toast.success(res.data.message);

      navigate("/verify-transfer");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Transfer failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Transfer Money
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">
            <label>Account Number</label>

            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Enter account number"
            />
          </div>

          <div className="mb-6">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Enter amount"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Transfer;