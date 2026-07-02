import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddLedgerGroupModal from "../components/AddLedgerGroupModal/AddLedgerGroupModal";
interface LedgerGroup {
  id: string;
  group_name: string;
  nature: string;
  parent_group_id: string | null;
  parent_group?: string;
  is_system: boolean;
}

const LedgerGroups = () => {
  const { id: companyId } = useParams();
  const [groups, setGroups] = useState<LedgerGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(search.toLowerCase()),
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
      if (event.ctrlKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    const fetchLedgerGroups = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/ledger-group/${companyId}/all`,
          { credentials: "include" },
        );
        const data = await response.json();
        if (!data.success) {
          setError(data.message || "Failed to load ledger groups");
          return;
        }
        setGroups(data.ledgerGroups);
      } catch (err) {
        console.error("Error fetching ledger groups:", err);
        setError("Something went wrong while loading ledger groups");
      } finally {
        setLoading(false);
      }
    };

    fetchLedgerGroups();
  }, [companyId]);

  const columns = [
    {
      name: "Group Name",
      selector: (row: any) => row.group_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Nature",
      selector: (row: any) => row.nature,
      sortable: true,
    },
    {
      name: "Under Group",
      selector: (row: any) => row.parent_group || "-",
      sortable: true,
    },

    {
      name: "System Generated",
      cell: (row: LedgerGroup) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.is_system
              ? "bg-green-600/20 text-green-400"
              : "bg-gray-600/20 text-gray-400"
          }`}
        >
          {row.is_system ? "Yes" : "No"}
        </span>
      ),
      sortable: true,
      right: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          {row.is_system ? (
            <button className="cursor-pointer px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
              <FiEdit2 />
            </button>
          ) : (
            <>
              <button className="cursor-pointer px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
                <FiEdit2 />
              </button>
              <button className="cursor-pointer px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition">
                <FiTrash2 />
              </button>
            </>
          )}
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
              <span className="text-orange-500">Ledger </span>
              <span className="text-blue-500">Groups</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage all primary and custom ledger groups.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer px-5 py-2 rounded-md bg-linear-to-r from-orange-500 to-blue-600 font-semibold hover:opacity-90 transition"
          >
            Add New Group
          </button>
          <div className="dashboardShortcutMenu p-8">
            <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
              F2
            </button>{" "}
            <span className="text-[10px] underline">
              To Add New Ledger Group
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-[#1E293B]/60 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)] p-4">
          {/* <h2 className="text-xl font-semibold mb-4">Ledger Groups</h2> */}
          <input
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-72 px-4 py-2 rounded bg-slate-800 border border-slate-700"
          />
          <DataTable
            noDataComponent={
              <div className="py-10 text-gray-400">No ledger groups found.</div>
            }
            columns={columns}
            data={filteredGroups}
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
        <AddLedgerGroupModal
          onClose={() => setShowModal(false)}
          ledgerGroups={groups}
          companyId={companyId}
        />
      )}
    </>
  );
};

export default LedgerGroups;
