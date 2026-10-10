import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="min-w-0">
            <h2 className="mb-5 text-3xl font-semibold text-emerald-400">SecureTrust Bank</h2>
            <p className="max-w-sm leading-8 text-slate-400">
              A premium digital banking experience designed for secure everyday financial confidence.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick links</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="/" className="transition hover:text-emerald-300">Home</a></li>
              <li><a href="/login" className="transition hover:text-emerald-300">Login</a></li>
              <li><a href="/register" className="transition hover:text-emerald-300">Register</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Features</h3>
            <ul className="space-y-3 text-slate-400">
              <li>OTP verification</li>
              <li>Instant transfers</li>
              <li>PDF statements</li>
              <li>Email alerts</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact</h3>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-start gap-3 break-all sm:break-normal"><FaEnvelope className="mt-1 shrink-0 text-emerald-400" /> support@securetrustbank.com</div>
              <div className="flex items-center gap-3"><FaPhoneAlt className="shrink-0 text-emerald-400" /> +234 800 000 0000</div>
              <div className="flex items-center gap-3"><FaMapMarkerAlt className="shrink-0 text-emerald-400" /> Lagos, Nigeria</div>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-slate-800"></div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} SecureTrust Bank. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-emerald-600"><FaFacebookF /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-sky-500"><FaTwitter /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-pink-600"><FaInstagram /></a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-700"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;