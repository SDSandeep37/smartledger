import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
interface CompanyDetailsProps {
  id: string;
  company_name: string;
}
const CompanySearchModal = ({ onClose }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyDetailsProps[]>([]);
  const [loading, setLoading] = useState(false);

  //refrence to input
  const inputRef = useRef<HTMLInputElement>(null);

  //focus on input tag when modal mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/company/search?companyName=${query}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data);
      setResults(data.company || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-[#1E293B]/80 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] p-6 text-white">
        <div className="dashboardShortcutMenu p-2">
          <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
            F4
          </button>{" "}
          <span className="text-[10px] underline">To close company search</span>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            <span className="text-orange-500">Smart</span>
            <span className="text-blue-500">Ledger</span> — Search Company
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="flex space-x-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter company name..."
            className="flex-1 p-3 rounded-md bg-[#0D1117]/60 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {loading && <p className="text-center text-gray-400">Searching...</p>}
          {!loading && results.length === 0 && (
            <p className="text-center text-gray-400">No results found</p>
          )}
          {results.map((company) => (
            <div
              key={company.id}
              className="flex justify-between items-center p-3 rounded-md bg-[#0D1117]/40 hover:bg-[#0D1117]/70 transition cursor-pointer"
            >
              <span>{company.company_name}</span>
              <Link to={`company/${company.id}`}>
                <button className="text-sm text-(--accent-orange) hover:text-(--accent-orange-glow) cursor-pointer">
                  Select
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySearchModal;
