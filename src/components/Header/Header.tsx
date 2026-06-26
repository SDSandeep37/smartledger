import { FiMenu, FiX } from "react-icons/fi";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-orange-500/25 px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="grid h-10 w-10 place-items-center rounded border border-white/10 bg-white/5"
        >
          {sidebarOpen ? (
            <FiX className="h-5 w-5" />
          ) : (
            <FiMenu className="h-5 w-5" />
          )}
        </button>

        <h2 className="text-xl font-semibold">Smart Ledger</h2>
      </div>
    </header>
  );
};

export default Header;
