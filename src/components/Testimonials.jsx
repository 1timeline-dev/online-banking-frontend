import {
  FaQuoteLeft,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

const testimonials = [
  {
    name: "Secure Transfers",
    role: "OTP Verification",
    review:
      "Every transfer requires a One-Time Password before funds are sent, adding an extra layer of protection.",
  },
  {
    name: "Professional Statements",
    role: "PDF Generation",
    review:
      "Users can instantly download beautifully formatted PDF bank statements showing balances and transaction history.",
  },
  {
    name: "Email Notifications",
    role: "Real-Time Alerts",
    review:
      "Registration, verification, password recovery, debits and credits all trigger automated email notifications.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase">
            Why This Project Stands Out
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Built With Modern Banking Features
          </h2>

          <p className="text-slate-500 mt-5 max-w-3xl mx-auto">
            This project demonstrates secure authentication,
            OTP-protected transfers, PDF statement generation,
            email automation and a complete admin dashboard.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <FaQuoteLeft
                className="text-blue-600 text-4xl mb-6"
              />

              <p className="text-slate-600 leading-8 mb-8">
                {item.review}
              </p>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <FaUserCircle
                    className="text-5xl text-blue-600"
                  />

                  <div>

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-slate-500 text-sm">
                      {item.role}
                    </p>

                  </div>

                </div>

                <div className="flex gap-1">

                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;