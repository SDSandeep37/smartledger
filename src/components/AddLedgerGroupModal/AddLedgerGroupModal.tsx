import { useState } from "react";

interface FormData {
  group_name: string;
  nature: string;
  parent_group_id: string;
}
interface LedgerGroup {
  id: string;
  group_name: string;
}
interface AddLedgerGroupModalProps {
  onClose: () => void;
  ledgerGroups: LedgerGroup[];
  companyId?: string;
}
const AddLedgerGroupModal = ({
  onClose,
  ledgerGroups,
  companyId,
}: AddLedgerGroupModalProps) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState<FormData>({
    group_name: "",
    nature: "",
    parent_group_id: "",
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
      if (!formData.group_name) {
        setMessageType("error");
        setMessage("Please enter the group name");
        return;
      }

      if (!formData.nature) {
        setMessageType("error");
        setMessage("Please enter nature for the ledger group");
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
        `${import.meta.env.VITE_PUBLIC_API_URL}/ledger-group/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            group_name: formData.group_name,
            nature: formData.nature,
            parent_group_id: formData.parent_group_id,
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
          group_name: "",
          nature: "",
          parent_group_id: "",
        });
      }
    } catch (error) {
      console.error("Failed to save the ledger group:", error);
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
          <h2 className="text-xl font-semibold">Add New Ledger Group</h2>
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
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              name="group_name"
              onChange={handleChange}
              value={formData.group_name}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter group name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">
              Nature <span className="text-red-500">*</span>
            </label>
            <input
              name="nature"
              onChange={handleChange}
              value={formData.nature}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter Nature/Category of Ledger Group"
            />
            <small>Use only Expenses,Assets, Liabilities and Income </small>
          </div>

          {/* <div>
            <label className="block text-sm text-gray-300">Under Group</label>
            <input
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Parent group name"
            />
          </div> */}
          <div>
            <label className="block text-sm text-gray-300">Under Group</label>

            <select
              name="parent_group_id"
              value={formData.parent_group_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            >
              <option value="">Primary Group (No Parent)</option>

              {ledgerGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.group_name}
                </option>
              ))}
            </select>
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
              Save Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLedgerGroupModal;
