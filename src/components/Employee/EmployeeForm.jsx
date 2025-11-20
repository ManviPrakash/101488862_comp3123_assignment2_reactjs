import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profileImage) data.append("profileImage", profileImage);

    try {
      await API.post("/emp/employees", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/employees");
    } catch (err) {
      console.log(err);
      alert("Failed to add employee");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Employee</h2>

      <form 
        style={styles.form} 
        onSubmit={handleSubmit}
        encType="multipart/form-data"   // ★ FIX ★
      >
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ").toUpperCase()}
            value={formData[key]}
            onChange={handleChange}
            type={key === "date_of_joining" ? "date" : "text"}
            style={styles.input}
          />
        ))}

        <label style={{ textAlign: "left", marginBottom: "8px" }}>
          Profile Image:
        </label>
        <input 
          type="file" 
          onChange={(e) => setProfileImage(e.target.files[0])} 
        />

        <button style={styles.button}>Add Employee</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "450px",
    margin: "40px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #aaa",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};
