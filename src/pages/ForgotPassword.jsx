import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to send reset email."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-8"
      >

        <h2 className="text-3xl font-bold mb-6">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded-lg mb-5"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
        >
          Send Reset Link
        </button>

        <p className="text-center mt-5">
          <Link
            to="/login"
            className="text-blue-600"
          >
            Back to Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default ForgotPassword;