import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const VerifyTransfer = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      return toast.error("Please enter the OTP.");
    }

    setLoading(true);

    try {
      const res = await api.post("/user/verify-transfer", {
        otp,
      });

      toast.success(res.data.message || "Transfer successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify Transfer
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg p-3 text-center text-xl tracking-[8px] mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify Transfer"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default VerifyTransfer;