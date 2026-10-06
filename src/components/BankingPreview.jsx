import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

const BankingPreview = () => {
  return (
    <section className="bg-slate-100 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase">
            Dashboard Preview
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Banking At Your Fingertips
          </h2>

          <p className="text-slate-500 mt-6 max-w-2xl mx-auto">
            Experience a modern banking dashboard designed for speed,
            simplicity and security.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Virtual Card */}

          <div>

            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-2xl">

              <div className="flex justify-between items-center">

                <FaWallet size={45} />

                <span className="bg-green-500 px-4 py-2 rounded-full text-sm">
                  ACTIVE
                </span>

              </div>

              <h3 className="mt-12 text-lg opacity-80">
                Virtual Debit Card
              </h3>

              <h1 className="text-3xl tracking-widest font-bold mt-4">
                **** **** **** 4832
              </h1>

              <div className="flex justify-between mt-12">

                <div>

                  <p className="text-sm opacity-80">
                    Card Holder
                  </p>

                  <h3 className="font-bold mt-2">
                    Timilehin Joseph
                  </h3>

                </div>

                <div>

                  <p className="text-sm opacity-80">
                    Balance
                  </p>

                  <h3 className="font-bold text-2xl mt-2">
                    ₦245,800
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between">

                <h3 className="font-bold text-xl">
                  Monthly Summary
                </h3>

                <FaCheckCircle className="text-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">

                <div className="bg-green-100 rounded-xl p-5">

                  <FaArrowDown className="text-green-600 text-2xl" />

                  <p className="text-gray-500 mt-3">
                    Income
                  </p>

                  <h2 className="text-3xl font-bold text-green-700">
                    ₦520K
                  </h2>

                </div>

                <div className="bg-red-100 rounded-xl p-5">

                  <FaArrowUp className="text-red-600 text-2xl" />

                  <p className="text-gray-500 mt-3">
                    Expenses
                  </p>

                  <h2 className="text-3xl font-bold text-red-600">
                    ₦274K
                  </h2>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="font-bold text-xl mb-5">
                Recent Transactions
              </h3>

              {[
                {
                  name: "Netflix Subscription",
                  amount: "-₦4,500",
                  color: "text-red-500",
                },
                {
                  name: "Salary Payment",
                  amount: "+₦180,000",
                  color: "text-green-600",
                },
                {
                  name: "Transfer to David",
                  amount: "-₦20,000",
                  color: "text-red-500",
                },
                {
                  name: "Shopping",
                  amount: "-₦15,500",
                  color: "text-red-500",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-none"
                >

                  <div>

                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Successful
                    </p>

                  </div>

                  <span className={`font-bold ${item.color}`}>
                    {item.amount}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default BankingPreview;