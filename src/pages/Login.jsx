import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUniversity, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await api.post("/auth/login", formData);
            login(data.user, data.token);
            toast.success(data.message);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
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
                            <FaShieldAlt /> SecureTrust Private Banking
                        </div>
                        <h1 className="text-4xl font-semibold leading-tight">Welcome back to your elegant financial hub.</h1>
                        <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">Sign in to review balances, move money, and stay in control of your finances with realistic confidence.</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                        <p className="text-sm text-slate-300">Trusted by clients who value precision and discretion.</p>
                        <div className="mt-4 flex items-center gap-3 text-emerald-300">
                            <FaShieldAlt /> Bank-grade security and instant access
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg">
                                <FaUniversity size={24} />
                            </div>
                            <h2 className="mt-5 text-3xl font-semibold text-slate-900">Sign in</h2>
                            <p className="mt-2 text-sm text-slate-500">Access your account securely.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Email address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100" required />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Password</label>
                                <div className="relative mt-2">
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                                {loading ? "Signing in..." : "Continue to dashboard"}
                                <FaArrowRight />
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between text-sm">
                            <Link to="/forgot-password" className="font-medium text-emerald-700 transition hover:text-emerald-800">Forgot password?</Link>
                            <Link to="/register" className="font-medium text-slate-700 transition hover:text-slate-900">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;