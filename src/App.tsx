import "./App.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

import CompanyDetails from "./pages/CompanyDetails";
import { UserAuthProvider } from "./Contexts/AuthContext";

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
          </Route>
        </Routes>
      </UserAuthProvider>
    </BrowserRouter>
  );
};
export default App;
