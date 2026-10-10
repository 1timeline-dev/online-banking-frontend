import {
  FaMoneyCheckAlt,
  FaLock,
  FaFilePdf,
  FaEnvelope,
  FaMobileAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaMoneyCheckAlt />,
    title: "Instant transfers",
    description: "Move money in seconds with trusted, real-time processing and clear confirmations.",
  },
  {
    icon: <FaLock />,
    title: "OTP protection",
    description: "Every transaction is guarded with an extra layer of authentication for peace of mind.",
  },
  {
    icon: <FaFilePdf />,
    title: "Elegant statements",
    description: "Download polished PDF statements whenever you need a detailed financial snapshot.",
  },
  {
    icon: <FaEnvelope />,
    title: "Smart alerts",
    description: "Stay informed with proactive notifications about activity and important updates.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive banking",
    description: "Access your money seamlessly across desktop, tablet, and mobile experiences.",
  },
  {
    icon: <FaChartLine />,
    title: "Admin oversight",
    description: "Give your team a refined control center to manage users and transactions efficiently.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white/80 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Built for calm, confident banking
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A polished experience that combines luxury feel with the reliability your customers expect.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.45)] sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-2xl text-white shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;