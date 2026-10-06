import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";

const Beneficiaries = () => {
  const navigate = useNavigate();

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const res = await api.get("/user/beneficiaries");
      setBeneficiaries(res.data.beneficiaries);
    } catch (error) {
      toast.error("Unable to load beneficiaries.");
    }
  };

  const addBeneficiary = async () => {
    if (!accountNumber) {
      return toast.error("Enter an account number.");
    }

    try {
      setLoading(true);

      await api.post("/user/beneficiaries", {
        accountNumber,
        nickname,
      });

      toast.success("Beneficiary added.");

      setAccountNumber("");
      setNickname("");

      fetchBeneficiaries();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add beneficiary."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBeneficiary = async (id) => {
    try {
      await api.delete(`/user/beneficiaries/${id}`);

      toast.success("Beneficiary removed.");

      fetchBeneficiaries();
    } catch (error) {
      toast.error("Unable to delete beneficiary.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaUserFriends className="text-blue-600" />
            Beneficiaries
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Dashboard
          </button>
        </div>

        {/* Add Beneficiary */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-4">
            Add Beneficiary
          </h2>

          <div className="grid md:grid-cols-3 gap-3">

            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Nickname (Optional)"
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <button
              onClick={addBeneficiary}
              disabled={loading}
              className="bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
            >
              <FaPlus />
              {loading ? "Adding..." : "Add"}
            </button>

          </div>

        </div>

        {/* Beneficiary List */}

        <div className="bg-white rounded-xl shadow">

          {beneficiaries.length === 0 ? (
            <p className="text-center p-8 text-gray-500">
              No beneficiaries yet.
            </p>
          ) : (
            beneficiaries.map((person) => (
              <div
                key={person._id}
                className="flex justify-between items-center border-b p-5"
              >
                <div>

                  <h3 className="font-semibold text-lg">
                    {person.nickname || person.beneficiary?.fullname}
                  </h3>

                  <p className="text-gray-500">
                    {person.beneficiary?.accountNumber}
                  </p>

                  <p className="text-sm text-gray-400">
                    {person.beneficiary?.email}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      navigate("/transfer", {
                        state: {
                          accountNumber:
                            person.beneficiary?.accountNumber,
                        },
                      })
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Transfer
                  </button>

                  <button
                    onClick={() =>
                      deleteBeneficiary(person._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default Beneficiaries;