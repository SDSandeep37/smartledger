import { useState } from "react";

interface FormData {
  group_id: string;
  ledger_name: string;
  alias_name: string;
  opening_balance: number;
  balance_type: string;
  gst_number?: string;
  pan_number?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}
interface Ledgers {
  group_id: string;
  group_name: string;
}
interface AddLedgerGroupModalProps {
  onClose: () => void;
  ledgers: Ledgers[];
  companyId?: string;
}
const AddLedgerModal = ({
  onClose,
  ledgers,
  companyId,
}: AddLedgerGroupModalProps) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState<FormData>({
    ledger_name: "",
    alias_name: "",
    opening_balance: 0,
    balance_type: "",
    gst_number: "",
    pan_number: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    group_id: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      if (!formData.ledger_name) {
        setMessageType("error");
        setMessage("Please enter the ledger name");
        return;
      }

      if (!formData.alias_name) {
        setMessageType("error");
        setMessage("Please enter ledger alias name");
        return;
      }
      if (!formData.balance_type) {
        setMessageType("error");
        setMessage("Please enter balance type");
        return;
      }
      if (!formData.opening_balance) {
        setMessageType("error");
        setMessage("Please enter opening balance");
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
        `${import.meta.env.VITE_PUBLIC_API_URL}/ledger/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ledger_name: formData.ledger_name,
            alias_name: formData.alias_name,
            opening_balance: formData.opening_balance,
            balance_type: formData.balance_type,
            gst_number: formData.gst_number,
            pan_number: formData.pan_number,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            notes: formData.notes,
            group_id: formData.group_id,

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
          ledger_name: "",
          alias_name: "",
          opening_balance: 0,
          balance_type: "",
          gst_number: "",
          pan_number: "",
          phone: "",
          email: "",
          address: "",
          notes: "",
          group_id: "",
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
      <div className="w-full max-w-lg bg-[#1E293B]/80 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 text-white h-125 overflow-y-scroll">
        <div className="dashboardShortcutMenu p-2">
          <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
            F4
          </button>{" "}
          <span className="text-[10px] underline">To Close</span>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Add New Ledger</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {/* ledger name */}
          <div>
            <label className="block text-sm text-gray-300">
              Ledger Name <span className="text-red-500">*</span>
            </label>
            <input
              name="ledger_name"
              onChange={handleChange}
              value={formData.ledger_name}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter ledger name"
            />
          </div>
          {/* alias name */}
          <div>
            <label className="block text-sm text-gray-300">
              Alias Name <span className="text-red-500">*</span>
            </label>
            <input
              name="alias_name"
              onChange={handleChange}
              value={formData.alias_name}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter alias name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Under Group</label>

            <select
              name="group_id"
              value={formData.group_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            >
              <option value="">Non</option>

              {ledgers.map((ledger) => (
                <option key={ledger.group_id} value={ledger.group_id}>
                  {ledger.group_name}
                </option>
              ))}
            </select>
          </div>
          {/* Opening Balance & Balance Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">
                Opening Balance <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="opening_balance"
                onChange={handleChange}
                value={formData.opening_balance}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">
                Balance Type <span className="text-red-500">*</span>
              </label>
              <select
                name="balance_type"
                onChange={handleChange}
                value={formData.balance_type}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">Select type</option>
                <option value="Dr">Debit</option>
                <option value="Cr">Credit</option>
              </select>
            </div>
          </div>
          {/* GST & PAN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">GST Number</label>
              <input
                name="gst_number"
                onChange={handleChange}
                value={formData.gst_number}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                placeholder="Enter GST number"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">PAN Number</label>
              <input
                name="pan_number"
                onChange={handleChange}
                value={formData.pan_number}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter PAN number"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-300">Address</label>
            <textarea
              rows={2}
              name="address"
              onChange={handleChange}
              value={formData.address}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter address"
            ></textarea>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-300">Notes</label>
            <textarea
              rows={2}
              name="notes"
              onChange={handleChange}
              value={formData.notes}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Additional notes"
            ></textarea>
          </div>
          {/* <div>
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
          </div> */}
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
              Save Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLedgerModal;
