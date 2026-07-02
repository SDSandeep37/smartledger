import "./App.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

import CompanyDetails from "./pages/CompanyDetails";
import { UserAuthProvider } from "./Contexts/AuthContext";
import LedgerGroups from "./pages/LedgerGroups";
import Ledgers from "./pages/Ledger";
import Units from "./pages/Units";

const App = () => {
  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="smartledger" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="company/:id" element={<CompanyDetails />} />
            <Route path="ledger_groups/:id" element={<LedgerGroups />} />
            <Route path="ledgers/:id" element={<Ledgers />} />
            <Route path="units/:id" element={<Units />} />
          </Route>
        </Routes>
      </UserAuthProvider>
    </BrowserRouter>
  );
};
export default App;
