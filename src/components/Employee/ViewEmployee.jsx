import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ViewEmployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    API.get(`/emp/employees/${id}`).then((res) => setEmp(res.data));
  }, [id]);

  if (!emp) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Employee Details</h2>

      <p><b>First Name:</b> {emp.first_name}</p>
      <p><b>Last Name:</b> {emp.last_name}</p>
      <p><b>Email:</b> {emp.email}</p>
      <p><b>Department:</b> {emp.department}</p>
      <p><b>Position:</b> {emp.position}</p>
      <p><b>Salary:</b> {emp.salary}</p>

      <Link to="/employees">
        <button style={styles.button}>Back to List</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    background: "white",
    borderRadius: "8px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};
