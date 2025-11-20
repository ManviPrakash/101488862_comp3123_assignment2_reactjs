import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const loadEmployees = async () => {
    const res = await API.get("/emp/employees");
    setEmployees(res.data);
  };

  const handleSearch = async () => {
    const res = await API.get(`/emp/employees/search?department=${search}`);
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/emp/employees/${id}`);
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Employees List</h2>

      <div style={styles.searchBar}>
        <input
          style={styles.input}
          placeholder="Search by department"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.btn} onClick={handleSearch}>Search</button>
        <Link to="/add" style={styles.addBtn}>Add Employee</Link>
      </div>

      <div style={styles.list}>
        {employees.map((emp) => (
          <div key={emp._id} style={styles.card}>
            <p><b>{emp.first_name} {emp.last_name}</b></p>
            <p>{emp.email}</p>
            <p>{emp.position}</p>

            <div style={styles.actions}>
              <Link to={`/view/${emp._id}`} style={styles.view}>View</Link>
              <Link to={`/edit/${emp._id}`} style={styles.edit}>Edit</Link>
              <button style={styles.delete} onClick={() => deleteEmployee(emp._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { width: "90%", margin: "20px auto" },
  searchBar: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", flex: 1, border: "1px solid #aaa", borderRadius: "5px" },
  btn: { padding: "10px 15px", background: "blue", color: "white", border: "none" },
  addBtn: { padding: "10px 15px", background: "green", color: "white", textDecoration: "none" },
  list: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" },
  card: { padding: "15px", border: "1px solid #ddd", borderRadius: "6px", background: "white" },
  actions: { marginTop: "10px", display: "flex", gap: "8px" },
  view: { background: "#007bff", color: "white", padding: "6px 12px", textDecoration: "none" },
  edit: { background: "#ffc107", color: "black", padding: "6px 12px", textDecoration: "none" },
  delete: { background: "red", color: "white", padding: "6px 12px", border: "none" }
};
