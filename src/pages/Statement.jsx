import { FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

const Statement = () => {

  const downloadStatement = async () => {
    try {

      const response = await api.get("/user/statement", {
        responseType: "blob",
      });

      const pdf = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(pdf);

      const link = document.createElement("a");

      link.href = url;
      link.download = "BankStatement.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Statement downloaded successfully!");

    } catch (error) {
      toast.error("Unable to download statement.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">

      <div className="w-full max-w-[450px] rounded-2xl bg-white p-6 text-center shadow-lg sm:p-10">

        <FaFilePdf
          size={70}
          className="mx-auto text-red-600 mb-5"
        />

        <h1 className="text-3xl font-bold">
          Bank Statement
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Download your complete account statement as a PDF.
        </p>

        <button
          onClick={downloadStatement}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Download PDF
        </button>

      </div>

    </div>
  );
};

export default Statement;