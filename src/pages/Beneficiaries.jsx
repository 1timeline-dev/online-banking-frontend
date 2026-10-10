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
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
            <FaUserFriends className="text-blue-600" />
            Beneficiaries
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Dashboard
          </button>
        </div>

        {/* Add Beneficiary */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow sm:p-6">

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
              className="min-w-0 rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Nickname (Optional)"
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value)
              }
              className="min-w-0 rounded-lg border p-3"
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
                className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="min-w-0 break-words">

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

                <div className="flex shrink-0 gap-3 self-end sm:self-auto">

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