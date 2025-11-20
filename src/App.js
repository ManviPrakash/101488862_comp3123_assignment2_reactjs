import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeForm from "./components/Employee/EmployeeForm";
import EditEmployee from "./components/Employee/EditEmployee";
import ViewEmployee from "./components/Employee/ViewEmployee";

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={navbarStyle}>
      <h3 style={{ margin: 0 }}>Employee Manager</h3>

      <button onClick={logout} style={logoutBtn}>
        Logout
      </button>
    </div>
  );
}

const navbarStyle = {
  background: "#222",
  color: "white",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoutBtn = {
  background: "red",
  padding: "8px 14px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/view/:id" element={<ViewEmployee />} />
      </Routes>
    </>
  );
}

export default App;
