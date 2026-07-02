import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddUnitsModal from "../components/AddUnitsModal/AddUnitsModal";
interface Units {
  id: string;
  unit_name: string;
  unit_symbol: string;
}

const Units = () => {
  const { id: companyId } = useParams();
  const [units, setUnits] = useState<Units[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredUnits = units.filter((unit) =>
    unit.unit_name.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "F2") {
        setShowModal(true);
        event.preventDefault();
      }
      if (event.key == "F4") {
        setShowModal(false);
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/unit/${companyId}/company`,
          { credentials: "include" },
        );
        const data = await response.json();
        if (!data.success) {
          setError(data.message || "Failed to load ledger groups");
          return;
        }
        setUnits(data.units);
      } catch (err) {
        console.error("Error fetching ledger groups:", err);
        setError("Something went wrong while loading ledger groups");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [companyId]);

  const columns = [
    {
      name: "Unit Name",
      selector: (row: any) => row.unit_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Unit Symbol",
      selector: (row: any) => row.unit_symbol,
      sortable: true,
    },

    {
      name: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <button className="cursor-pointer px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
            <FiEdit2 />
          </button>
          <button className="cursor-pointer px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition">
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading ledger groups...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <>
      <Link to={`/smartledger/company/${companyId}`}>
        <button className="px-5 py-2 rounded-md bg-linear-to-r from-blue-500 to-red-600 font-semibold hover:opacity-90 transition">
          {" "}
          Back to company details page
        </button>
      </Link>
      <div className="min-h-screen bg-linear-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] text-white p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-orange-500">Unit </span>
              <span className="text-blue-500">s</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage all units and their symbols.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer px-5 py-2 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
          >
            Add New Unit
          </button>
          <div className="dashboardShortcutMenu p-8">
            <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
              F2
            </button>{" "}
            <span className="text-[10px] underline">To Add New Unit</span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-[#1E293B]/60 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)] p-4">
          <input
            type="text"
            placeholder="Search by unit name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-72 px-4 py-2 rounded bg-slate-800 border border-slate-700"
          />
          <DataTable
            noDataComponent={
              <div className="py-10 text-gray-400">No unit/s found.</div>
            }
            columns={columns}
            data={filteredUnits}
            pagination
            highlightOnHover
            striped
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#1E293B",
                  color: "#60A5FA",
                  fontWeight: "600",
                },
              },
              rows: {
                style: {
                  backgroundColor: "#0D1117",
                  color: "#E5E7EB",
                },
              },
            }}
          />
        </div>
      </div>
      {showModal && (
        <AddUnitsModal
          onClose={() => setShowModal(false)}
          companyId={companyId}
        />
      )}
    </>
  );
};

export default Units;
