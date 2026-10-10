import { Link } from "react-router-dom";
import { FaUniversity, FaShieldAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/70 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-slate-800 shadow-lg shadow-emerald-950/20 sm:h-11 sm:w-11">
            <FaUniversity className="text-xl text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold tracking-tight text-white sm:text-lg">SecureTrust Bank</h1>
            <p className="text-xs text-slate-400 max-[360px]:hidden">Secure • Fast • Trusted</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-slate-300 transition hover:text-emerald-300">Features</a>
          <a href="#security" className="text-sm text-slate-300 transition hover:text-emerald-300">Security</a>
          <a href="#testimonials" className="text-sm text-slate-300 transition hover:text-emerald-300">Reviews</a>
        </div>

        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <Link to="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300">
            Login
          </Link>
          <Link to="/register" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:brightness-110">
            <FaShieldAlt /> Open Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;