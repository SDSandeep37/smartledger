import { useState } from "react";

interface FormData {
  unit_name: string;
  unit_symbol: string;
}

interface AddUnitsModalProps {
  onClose: () => void;
  companyId?: string;
}
const AddUnitsModal = ({ onClose, companyId }: AddUnitsModalProps) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState<FormData>({
    unit_name: "",
    unit_symbol: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!formData.unit_name) {
        setMessageType("error");
        setMessage("Please enter the unit name");
        return;
      }

      if (!formData.unit_symbol) {
        setMessageType("error");
        setMessage("Please enter the unit symbol");
        return;
      }

      handleApiCall();
    } catch (error) {
      console.log(error);
    } finally {
      timer();
    }
  };
  const handleApiCall = async () => {
    try {
      setMessageType("");
      setMessage("Please wait...");
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/unit/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            unit_name: formData.unit_name,
            unit_symbol: formData.unit_symbol,
            company_id: companyId,
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      if (result.success) {
        setMessageType("success");
        setMessage(result.message);
        setFormData({
          unit_name: "",
          unit_symbol: "",
        });
      }
    } catch (error) {
      console.error("Failed to save the unit:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-[#1E293B]/80 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 text-white">
        <div className="dashboardShortcutMenu p-8">
          <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
            F4
          </button>{" "}
          <span className="text-[10px] underline">To Close</span>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Unit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm text-gray-300">
              Unit Name<span className="text-red-500">*</span>
            </label>
            <input
              name="unit_name"
              onChange={handleChange}
              value={formData.unit_name}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter unit name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">
              Unit Symbol <span className="text-red-500">*</span>
            </label>
            <input
              name="unit_symbol"
              onChange={handleChange}
              value={formData.unit_symbol}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter unit symbol"
            />
            <small>Example: for Pieces write PCS </small>
          </div>

          {message && (
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                maxWidth: "300px",
                padding: "5px 0px",
              }}
              className={
                messageType === "success" ? "text-green-500" : "text-red-500"
              }
            >
              {message}
            </p>
          )}
          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-5 py-2 rounded-md border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-5 py-2 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
            >
              Save Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnitsModal;
