import { useEffect, useState } from "react";
import CompanyRegister from "../components/CompanyRegister/CompanyRegister";
import CompanySearchModal from "../components/CompanySearchModal/CompanySearchModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

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
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="dashboardShortcutMenu p-8">
        <button className="bg-(--accent-orange) px-2 p-1  shadow-lg text-sm rounded-2xl">
          F2
        </button>{" "}
        <span className="text-[10px] underline">To Search Company</span>
      </div>
      <CompanyRegister></CompanyRegister>;
      {showModal && <CompanySearchModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
