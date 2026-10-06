import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaBolt, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import BankingIllustration from "./BankingIllustration";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),linear-gradient(135deg,_#ffffff_0%,_#f4f7fb_100%)] px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <FaBolt /> Premium digital banking experience
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="text-4xl font-semibold leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
            Bank with confidence,
            <br />
            <span className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text">grow with ease.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Manage every transfer, statement, and account update from one elegant workspace designed for modern, secure banking.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-800">
              Open an account <FaArrowRight />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700">
              Sign in
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }} className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm"><FaShieldAlt className="text-emerald-600" /> Secure by design</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm"><FaLock className="text-emerald-600" /> OTP protected transfers</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-sm text-slate-500">Active users</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900"><AnimatedCounter value={24000} prefix="" suffix="+" /></p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-sm text-slate-500">Transactions</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900"><AnimatedCounter value={980000} prefix="" suffix="+" /></p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="text-sm text-slate-500">Trust score</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900"><AnimatedCounter value={99} suffix="%" /></p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-400/20 to-slate-900/10 blur-3xl" />
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <BankingIllustration />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;