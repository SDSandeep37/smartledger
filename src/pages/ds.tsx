import { useState } from "react";
import {
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiBox,
  FiChevronDown,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiPieChart,
  FiSettings,
  FiX,
} from "react-icons/fi";

const menuItems = [
  { label: "Dashboard", icon: FiGrid, active: true },
  { label: "Ledgers", icon: FiBookOpen },
  { label: "Vouchers", icon: FiCreditCard },
  { label: "Inventory", icon: FiBox },
  { label: "Reports", icon: FiFileText },
  { label: "Settings", icon: FiSettings },
];

const stats = [
  { label: "Total Sales", value: "Rs. 2,45,800", tone: "orange" },
  { label: "Stock Value", value: "Rs. 92,300", tone: "blue" },
  { label: "Payables", value: "Rs. 38,750", tone: "orange" },
  { label: "Receivables", value: "Rs. 56,900", tone: "blue" },
];

const transactions = [
  ["Bash Ltd", "Electro Systems", "Rs. 531,000", "Rs. 1,900,000"],
  ["Bash Mob", "Mitra Textiles", "Rs. 330,000", "Rs. 1,800,000"],
  ["Dash Ind", "Star Supplies", "Rs. 903,000", "Rs. 2,660,000"],
  ["Bash Mob", "Moka Textiles", "Rs. 770,000", "Rs. 2,360,000"],
  ["Prash Ind", "Tyro Blanes", "Rs. 593,000", "Rs. 1,251,000"],
];

const vouchers = [
  ["INV-1023", "Invoice", "Rs. 15,800", "Pending"],
  ["PAY-7859", "Payment", "Rs. 12,500", "Pending"],
  ["PAY-7851", "Payment", "Rs. 12,500", "Overdue"],
];

const accountSummary = [
  ["Bank Balance", "Rs. 1,76,400"],
  ["Cash in Hand", "Rs. 25,300"],
  ["Total Payables", "Rs. 38,750"],
  ["Total Receivables", "Rs. 56,900"],
];

const chartBars = [22, 54, 18, 36, 30, 12, 49, 37, 61, 70, 82, 92];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080817] px-3 py-4 text-slate-100 sm:px-5 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,96,0,0.48),transparent_19%),radial-gradient(circle_at_90%_82%,rgba(0,101,255,0.5),transparent_22%),radial-gradient(circle_at_54%_2%,rgba(255,255,255,0.11),transparent_28%)]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-lg border border-white/15 bg-[#0d0b22]/92 shadow-[0_0_36px_rgba(0,0,0,0.45),0_0_28px_rgba(255,90,0,0.28)]">
        <aside
          className={`absolute inset-y-0 left-0 z-30 flex flex-col border-r border-white/10 bg-[#0a0a1d]/95 transition-all duration-300 lg:relative ${
            sidebarOpen
              ? "w-64 translate-x-0 lg:w-60"
              : "w-20 -translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-gradient-to-br from-orange-500 via-orange-600 to-blue-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]">
              <FiBarChart2 className="h-6 w-6 text-white" />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"}`}>
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
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`flex h-10 w-full items-center gap-3 rounded px-3 text-sm transition ${
                    item.active
                      ? "bg-orange-500/20 text-orange-300 shadow-[inset_3px_0_0_#f97316]"
                      : "text-slate-300 hover:bg-white/7 hover:text-white"
                  } ${sidebarOpen ? "justify-start" : "justify-center"}`}
                  title={sidebarOpen ? undefined : item.label}
                  type="button"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-white/10 px-3 py-5">
            {[
              ["Support", FiHelpCircle],
              ["Logout", FiLogOut],
            ].map(([label, Icon]) => (
              <button
                key={label as string}
                className={`flex h-10 w-full items-center gap-3 rounded px-3 text-sm text-slate-300 transition hover:bg-white/7 hover:text-white ${
                  sidebarOpen ? "justify-start" : "justify-center"
                }`}
                title={sidebarOpen ? undefined : (label as string)}
                type="button"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                  {label as string}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {sidebarOpen && (
          <button
            aria-label="Close sidebar overlay"
            className="absolute inset-0 z-20 bg-black/55 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            type="button"
          />
        )}

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex h-20 items-center justify-between border-b border-orange-500/25 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                className="grid h-10 w-10 place-items-center rounded border border-white/10 bg-white/5 text-slate-200 transition hover:border-orange-400/60 hover:text-orange-300"
                onClick={() => setSidebarOpen((value) => !value)}
                type="button"
              >
                {sidebarOpen ? (
                  <FiX className="h-5 w-5" />
                ) : (
                  <FiMenu className="h-5 w-5" />
                )}
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Business Overview
                </p>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Dashboard
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                aria-label="Notifications"
                className="relative grid h-10 w-10 place-items-center rounded bg-white/5 text-orange-300"
                type="button"
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
              </button>
              <div className="hidden h-10 items-center gap-2 rounded border border-white/10 bg-white/5 px-3 text-sm sm:flex">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-500 text-xs font-bold">
                  A
                </span>
                Admin
                <FiChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </header>

          <div className="grid flex-1 gap-5 overflow-y-auto p-4 sm:p-6">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className={`rounded border p-5 ${
                    stat.tone === "orange"
                      ? "border-orange-500/25 bg-[linear-gradient(135deg,rgba(249,115,22,0.28),rgba(16,13,33,0.92)_55%)] shadow-[0_0_22px_rgba(249,115,22,0.16)]"
                      : "border-blue-500/25 bg-[linear-gradient(135deg,rgba(59,130,246,0.26),rgba(16,13,33,0.92)_55%)] shadow-[0_0_22px_rgba(59,130,246,0.16)]"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    {stat.label}
                  </p>
                  <strong
                    className={`mt-2 block text-2xl ${
                      stat.tone === "orange"
                        ? "text-orange-300"
                        : "text-blue-300"
                    }`}
                  >
                    {stat.value}
                  </strong>
                </article>
              ))}
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.12fr_1fr]">
              <article className="rounded border border-white/10 bg-white/[0.035] p-4">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Recent Transactions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-xs">
                    <thead className="text-slate-400">
                      <tr className="border-b border-white/10">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Description</th>
                        <th className="pb-3 text-right font-medium">Debit</th>
                        <th className="pb-3 text-right font-medium">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(
                        ([date, description, debit, credit]) => (
                          <tr
                            key={`${date}-${description}`}
                            className="border-b border-white/7 last:border-0"
                          >
                            <td className="py-3 text-orange-300">{date}</td>
                            <td className="py-3 text-slate-200">
                              {description}
                            </td>
                            <td className="py-3 text-right text-slate-300">
                              {debit}
                            </td>
                            <td className="py-3 text-right text-orange-300">
                              {credit}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    Analytics
                  </h3>
                  <FiPieChart className="h-4 w-4 text-blue-300" />
                </div>
                <div className="flex h-64 items-end gap-3 rounded bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] px-4 pb-7 pt-5">
                  {chartBars.map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        className={`w-full rounded-t ${
                          index % 3 === 0
                            ? "bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.45)]"
                            : index % 3 === 1
                              ? "bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.45)]"
                              : "bg-slate-200"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.12fr_1fr]">
              <article className="rounded border border-white/10 bg-white/[0.035] p-4">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Pending Vouchers
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[460px] text-left text-xs">
                    <thead className="text-slate-400">
                      <tr className="border-b border-white/10">
                        <th className="pb-3 font-medium">Voucher No.</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 text-right font-medium">Amount</th>
                        <th className="pb-3 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchers.map(([number, type, amount, status]) => (
                        <tr
                          key={number}
                          className="border-b border-white/7 last:border-0"
                        >
                          <td className="py-3 text-slate-200">{number}</td>
                          <td className="py-3 text-slate-300">{type}</td>
                          <td className="py-3 text-right text-slate-200">
                            {amount}
                          </td>
                          <td className="py-3 text-right">
                            <span
                              className={`rounded px-2 py-1 text-[11px] font-semibold ${
                                status === "Overdue"
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : "bg-orange-500/15 text-orange-300"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded border border-white/10 bg-white/[0.035] p-4">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Account Summary
                </h3>
                <div className="divide-y divide-white/10 text-sm">
                  {accountSummary.map(([label, value], index) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3"
                    >
                      <span className="text-slate-300">{label}</span>
                      <strong
                        className={
                          index === 2
                            ? "text-orange-300"
                            : index === 3
                              ? "text-blue-300"
                              : "text-slate-100"
                        }
                      >
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
