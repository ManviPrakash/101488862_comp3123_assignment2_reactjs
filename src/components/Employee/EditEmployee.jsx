import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const loadEmployee = async () => {
    const res = await API.get(`/emp/employees/${id}`);
    setEmployee(res.data);
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(employee).forEach((key) => data.append(key, employee[key]));
    if (profileImage) data.append("profileImage", profileImage);

    await API.put(`/emp/employees/${id}`, data);
    navigate("/employees");
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Edit Employee</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          name="first_name"
          value={employee.first_name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="last_name"
          value={employee.last_name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          value={employee.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="position"
          value={employee.position}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="date_of_joining"
          value={employee.date_of_joining?.split("T")[0]}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          style={styles.input}
        />

        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />

        <button style={styles.button}>Update</button>
      </form>
    </div>
  );
}

const styles = {
  container: { width: "450px", margin: "40px auto", padding: "25px", background: "white" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", marginBottom: "12px", borderRadius: "5px", border: "1px solid #aaa" },
  button: { padding: "10px", background: "blue", color: "white", border: "none" }
};
