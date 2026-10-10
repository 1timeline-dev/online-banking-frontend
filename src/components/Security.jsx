import {
  FaShieldAlt,
  FaLock,
  FaFingerprint,
  FaUserShield,
} from "react-icons/fa";

const Security = () => {
  return (
    <section id="security" className="bg-slate-950 py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Your security comes first
          </span>
          <h2 className="mt-8 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Trusted protection for every move
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every transaction is safeguarded through secure authentication, encrypted communication, and elegant account controls that keep your financial life protected.
          </p>
          <button className="mt-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 font-semibold text-white transition hover:brightness-110">
            Learn more
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: <FaShieldAlt />, title: "Secure banking", text: "Bank-grade protection for every account and transfer.", color: "text-emerald-300" },
            { icon: <FaLock />, title: "OTP verification", text: "One-time codes add a strong security layer to sensitive actions.", color: "text-teal-300" },
            { icon: <FaFingerprint />, title: "Encrypted data", text: "Sensitive account information remains protected at all times.", color: "text-amber-300" },
            { icon: <FaUserShield />, title: "Verified access", text: "Every customer is verified for a smoother, safer experience.", color: "text-sky-300" },
          ].map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10 sm:p-8">
              <div className={`mb-5 text-3xl ${item.color}`}>{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;