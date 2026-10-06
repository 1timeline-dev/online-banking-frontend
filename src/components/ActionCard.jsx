import { motion } from "framer-motion";

const ActionCard = ({
  title,
  description,
  icon,
  onClick,
  accent = "from-slate-900 to-slate-700",
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-[28px] border border-slate-200/70 bg-white/80 p-5 text-left shadow-[0_20px_60px_-30px_rgba(2,6,23,0.4)] backdrop-blur-xl transition"
    >
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </motion.button>
  );
};

export default ActionCard;
