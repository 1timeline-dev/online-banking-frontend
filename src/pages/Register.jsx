import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUniversity,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) {
      return;
    }

    const fullname = form.fullname.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Basic frontend validation
    if (!fullname || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      console.log("=================================");
      console.log("📤 REGISTERING USER");
      console.log("Email:", email);
      console.log("=================================");

      const res = await api.post("/auth/register", {
        fullname,
        email,
        password,
      });

      console.log("✅ REGISTRATION SUCCESS");
      console.log(res.data);

      toast.success(
        res.data?.message ||
          "Account created. Check your email to verify your account."
      );

      // Clear form after successful registration
      setForm({
        fullname: "",
        email: "",
        password: "",
      });

      // Give the toast a moment before navigating
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.log("=================================");
      console.log("❌ REGISTER ERROR");
      console.log("Status:", error.response?.status);
      console.log(
        "Message:",
        error.response?.data?.message
      );
      console.log(
        "Full Data:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );
      console.log("=================================");

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] lg:grid-cols-[0.95fr_1.05fr]">

        <div className="hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#172554_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <FaShieldAlt />
              Your new banking experience
            </div>

            <h1 className="text-4xl font-semibold leading-tight">
              Open an account that feels as premium as it is secure.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
              Create an account in minutes and unlock a modern banking
              experience with strong protections and elegant controls.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-slate-300">
              Fast onboarding • Secure transfers • Trusted support
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            <div className="mb-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg">
                <FaUniversity size={24} />
              </div>

              <h2 className="mt-5 text-3xl font-semibold text-slate-900">
                Create account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Join SecureTrust with confidence.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    disabled={loading}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}

                {!loading && <FaArrowRight />}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Log in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;