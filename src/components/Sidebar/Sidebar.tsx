import { useContext } from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../../Contexts/AuthContext";

const menuItems = [
  { label: "Dashboard", icon: FiGrid, active: true },
  { label: "Ledgers", icon: FiBookOpen },
  { label: "Vouchers", icon: FiCreditCard },
  { label: "Inventory", icon: FiBox },
  { label: "Reports", icon: FiFileText },
  { label: "Settings", icon: FiSettings },
];

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const { logout } = useContext(UserAuthContext)!;
  return (
    <aside
      className={`absolute inset-y-0 left-0 z-30 flex flex-col border-r border-white/10 bg-[#0a0a1d]/95 transition-all duration-300 lg:relative ${
        sidebarOpen
          ? "w-64 translate-x-0 lg:w-60"
          : "w-20 -translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-linear-to-br from-orange-500 via-orange-600 to-blue-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]">
          <FiBarChart2 className="h-6 w-6 text-white" />
        </div>

        <div className={sidebarOpen ? "block" : "hidden"}>
          <h1 className="text-xl font-bold leading-none">
            <span className="text-orange-400">Smart</span>
            <span className="text-blue-300">Ledger</span>
          </h1>
          <p className="mt-1 text-[11px] text-slate-400">
            ERP simplified. Business amplified.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-5">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              to={item.label === "Dashboard" ? "" : item.label.toLowerCase()}
              key={item.label}
            >
              <button
                key={item.label + index}
                className={`flex h-10 w-full items-center gap-3 rounded px-3 text-sm transition ${
                  item.active
                    ? "bg-orange-500/20 text-orange-300 shadow-[inset_3px_0_0_#f97316]"
                    : "text-slate-300 hover:bg-white/7 hover:text-white"
                } ${sidebarOpen ? "justify-start" : "justify-center"}`}
                title={sidebarOpen ? undefined : item.label}
                type="button"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={sidebarOpen ? "block" : "hidden"}>
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-5">
        <button
          onClick={() => logout()}
          className={`cursor-pointer flex h-10 w-full items-center gap-3 rounded px-3 text-sm text-slate-300 transition hover:bg-white/7 hover:text-white ${
            sidebarOpen ? "justify-start" : "justify-center"
          }`}
          type="button"
        >
          <FiLogOut className="h-4 w-4 shrink-0" />
          <span className={sidebarOpen ? "block" : "hidden"}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
