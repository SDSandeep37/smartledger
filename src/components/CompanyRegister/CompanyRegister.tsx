import { useState } from "react";

const CompanyRegister = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    gst_number: "",
    pan_number: "",
    financial_year_start: "",
    financial_year_end: "",
    phone: "",
    email: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      if (!formData.email) {
        setMessageType("error");
        setMessage("Please fill the form");
        return;
      }

      if (!formData.email) {
        setMessageType("error");
        setMessage("Please enter your email");
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
        `${import.meta.env.VITE_PUBLIC_API_URL}/company/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_name: formData.company_name,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: formData.pincode,
            gst_number: formData.gst_number,
            pan_number: formData.pan_number,
            financial_year_start: formData.financial_year_start,
            financial_year_end: formData.financial_year_end,
            phone: "+91" + formData.phone,
            email: formData.email,
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
          company_name: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          gst_number: "",
          pan_number: "",
          financial_year_start: "",
          financial_year_end: "",
          phone: "",
          email: "",
        });
      }
    } catch (error) {
      console.error("Company registeration failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div className="bg-[url(/background.png)] min-h-screen flex items-center justify-center bg-linear-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] text-white">
      <div className="w-full max-w-3xl p-8 rounded-xl bg-[#1E293B]/60 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {/* Logo & Heading */}
        <div className="text-center mb-8 ">
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">Smart</span>
            <span className="text-blue-500">Ledger</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            ERP Simplified. Business Amplified.
          </p>
          <h2 className="text-2xl font-semibold mt-6">Register Your Company</h2>
          <p className="text-gray-400 text-sm">
            Provide your company details to get started.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm text-gray-300">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company_name"
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter address"
            ></textarea>
          </div>

          {/* City, State, Country */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {["City", "State", "Country"].map((label) => (
              <div key={label}>
                <label className="block text-sm text-gray-300">
                  {label}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={label.toLocaleLowerCase()}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  placeholder={label}
                />
              </div>
            ))}
          </div>

          {/* Pincode, GST, PAN */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {[
              {
                label: "Pincode",
                name: "pincode",
                type: "text",
                required: true,
              },
              {
                label: "GST Number",
                name: "gst_number",
                type: "text",
                required: false,
              },
              {
                label: "PAN Number",
                name: "pan_number",
                type: "text",
                required: false,
              },
            ].map(({ label, type, required, name }) => (
              <div key={label}>
                <label className="block text-sm text-gray-300">
                  {label}
                  {required ? <span className="text-red-500">*</span> : ""}
                </label>
                <input
                  type={type}
                  name={name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder={label}
                />
              </div>
            ))}
          </div>

          {/* Financial Year */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Financial Year Start", name: "financial_year_start" },
              { label: "Financial Year End", name: "financial_year_end" },
            ].map(({ label, name }) => (
              <div key={label}>
                <label className="block text-sm text-gray-300">{label}</label>
                <input
                  type="date"
                  name={name}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Phone", type: "tel" },
              { label: "Email", type: "email" },
            ].map(({ label, type }) => (
              <div key={label}>
                <label className="block text-sm text-gray-300">
                  {label}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  name={label.toLowerCase()}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
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
          <div className="space-y-3 pt-4">
            <button
              type="submit"
              className="cursor-pointer w-full py-3 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;
