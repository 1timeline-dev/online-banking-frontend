import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
  FaShieldAlt,
  FaUniversity,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^\d{6}$/.test(otp)) {
      toast.error("Enter your email address and the 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/auth/verify-email-otp", {
        email: normalizedEmail,
        otp,
      });

      toast.success(data.message || "Email verified. You can now log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not verify your email."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error("Enter your email address first.");
      return;
    }

    setResending(true);

    try {
      const { data } = await api.post("/auth/resend-email-otp", {
        email: normalizedEmail,
      });
      toast.success(data.message || "A new verification code has been sent.");
      setOtp("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not resend the code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#172554_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <FaShieldAlt />
              Secure email verification
            </div>
            <h1 className="text-4xl font-semibold leading-tight">
              One quick step to get your account ready.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
              Confirm it’s really you with the secure code we sent to your
              inbox.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-slate-300">
              Your code is valid for 10 minutes and can only be used once.
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
                Verify your email
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter the 6-digit code sent to your email address.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label
                  htmlFor="verification-email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <div className="relative mt-2">
                  <FaEnvelope
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="verification-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading || resending}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="verification-code"
                  className="text-sm font-medium text-slate-700"
                >
                  Verification code
                </label>
                <input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  disabled={loading || resending}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-2xl tracking-[0.6em] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-describedby="verification-code-help"
                  required
                />
                <p
                  id="verification-code-help"
                  className="mt-2 text-center text-xs text-slate-500"
                >
                  Check your inbox and spam folder.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || resending || otp.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify email"}
                {!loading && <FaArrowRight />}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">Didn’t receive a code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={loading || resending}
                className="font-semibold text-emerald-700 transition hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-slate-600">
              <Link
                to="/register"
                className="font-semibold text-slate-700 transition hover:text-slate-900"
              >
                Back to create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
