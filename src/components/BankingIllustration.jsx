import { motion } from "framer-motion";

const BankingIllustration = () => {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-[36px] border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.6)]"
      >
        <svg viewBox="0 0 420 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="32" y="42" width="356" height="236" rx="30" fill="rgba(255,255,255,0.08)" />
          <rect x="58" y="80" width="112" height="92" rx="18" fill="#12233f" />
          <rect x="186" y="80" width="176" height="18" rx="9" fill="#f8fafc" fillOpacity="0.8" />
          <rect x="186" y="112" width="138" height="14" rx="7" fill="#f8fafc" fillOpacity="0.55" />
          <rect x="186" y="140" width="104" height="14" rx="7" fill="#f8fafc" fillOpacity="0.4" />
          <rect x="58" y="198" width="304" height="54" rx="18" fill="rgba(16,185,129,0.18)" />
          <rect x="82" y="214" width="92" height="10" rx="5" fill="#10b981" />
          <rect x="186" y="214" width="122" height="10" rx="5" fill="#f8fafc" fillOpacity="0.65" />
          <rect x="318" y="214" width="24" height="10" rx="5" fill="#fbbf24" />
          <circle cx="338" cy="118" r="44" fill="rgba(16,185,129,0.24)" />
          <circle cx="101" cy="238" r="28" fill="rgba(251,191,36,0.22)" />
          <path d="M86 132 C118 108, 152 92, 189 98 S256 126, 290 122 S338 114, 356 104" stroke="#10b981" strokeWidth="8" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-8 rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Secure transfers</p>
        <p className="mt-2 text-xl font-semibold text-slate-900">₦24,000</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 shadow-lg max-[420px]:right-0"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Protected</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">24/7 support</p>
      </motion.div>
    </div>
  );
};

export default BankingIllustration;
