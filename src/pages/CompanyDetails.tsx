import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuthContext } from "../Contexts/AuthContext";
import CompanyEdit from "../components/CompanyEdit/CompanyEdit";
interface Company {
  id: string;
  user_id: string;
  company_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_number: string;
  pan_number: string;
  financial_year_start: string;
  financial_year_end: string;
  phone: string;
  email: string;
  industry?: string;
  employees?: string;
}
const CompanyDetails = () => {
  const { id } = useParams(); // get company ID from URL
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserAuthContext)!;
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "F3") {
        setShowEdit(true);
        event.preventDefault();
      }
      if (event.key == "F4") {
        setShowEdit(false);
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/company/${id}/company`,
          { credentials: "include" },
        );
        const data = await response.json();
        if (!data.success) {
          setError(data.message || "Failed to load company details");
          return;
        }
        setCompany(data.company);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Something went wrong while loading company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading company details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!company)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No company data found
      </div>
    );

  return (
    <>
      <div className="bg-[url(/background.png)]   flex items-center justify-center bg-linear-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] text-white">
        <div className="w-full max-w-4xl p-8 rounded-xl bg-[#1E293B]/60 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-orange-500">Smart</span>
                <span className="text-blue-500">Ledger</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                ERP Simplified. Business Amplified.
              </p>
            </div>
            <h2 className="text-2xl font-semibold">Company Details</h2>
          </div>

          {/* Company Info */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-white">
              {company.company_name}
            </h3>
            <p className="text-gray-300">
              {company.address}, {company.city}, {company.state},{" "}
              {company.country} – {company.pincode}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
            <div className="space-y-2">
              <p>
                <span className="text-gray-400">GST Number:</span>{" "}
                <span className="font-semibold">{company.gst_number}</span>
              </p>
              <p>
                <span className="text-gray-400">PAN Number:</span>{" "}
                <span className="font-semibold">{company.pan_number}</span>
              </p>
              <p>
                <span className="text-gray-400">Financial Year:</span>{" "}
                <span className="font-semibold">
                  {company.financial_year_start} to {company.financial_year_end}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="text-gray-400">Phone:</span>{" "}
                <span className="font-semibold">{company.phone}</span>
              </p>
              <p>
                <span className="text-gray-400">Email:</span>{" "}
                <span className="font-semibold">{company.email}</span>
              </p>
            </div>
          </div>

          {/* Bottom Info Boxes */}
          {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="p-4 rounded-md bg-linear-to-r from-orange-500/20 to-orange-500/10 border border-orange-500">
            <p className="text-gray-400">Industry</p>
            <p className="font-semibold text-white">
              {company.industry || "Technology & IT Services"}
            </p>
          </div>
          <div className="p-4 rounded-md bg-linear-to-r from-blue-500/20 to-blue-500/10 border border-blue-500">
            <p className="text-gray-400">Number of Employees</p>
            <p className="font-semibold text-white">
              {company.employees || "50 - 100 Employees"}
            </p>
          </div>
        </div> */}

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            {user?.id === company.user_id ? (
              <div className="flex justify-center items-center gap-1">
                <button
                  onClick={() => setShowEdit(true)}
                  className="px-5 py-2 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
                >
                  Edit
                </button>
                OR press
                <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
                  F3
                </button>{" "}
              </div>
            ) : (
              ""
            )}

            <button
              onClick={() => setShowEdit(false)}
              className="px-5 py-2 rounded-md border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
      {showEdit && <CompanyEdit />}
    </>
  );
};

export default CompanyDetails;
