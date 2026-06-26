import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080817] px-3 py-4 text-slate-100 sm:px-5 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,96,0,0.48),transparent_19%),radial-gradient(circle_at_90%_82%,rgba(0,101,255,0.5),transparent_22%),radial-gradient(circle_at_54%_2%,rgba(255,255,255,0.11),transparent_28%)]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-lg border border-white/15 bg-[#0d0b22]/92">
        <Sidebar sidebarOpen={sidebarOpen} />
        {sidebarOpen && (
          <button
            aria-label="Close sidebar overlay"
            className="absolute inset-0 z-20 bg-black/55 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            type="button"
          />
        )}
        <div className="flex flex-1 flex-col">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
