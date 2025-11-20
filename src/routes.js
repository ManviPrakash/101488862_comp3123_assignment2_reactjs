import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeList from "./components/Auth/EmployeeList";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/employees" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={token ? <EmployeeList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
