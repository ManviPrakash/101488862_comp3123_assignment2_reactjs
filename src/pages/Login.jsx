import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", { email, password });
      localStorage.setItem("token", res.data.jwt_token);
      navigate("/employees");
    } catch {
      alert("Invalid Login");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.button}>Login</button>

        <button
          type="button"
          style={styles.linkButton}
          onClick={() => navigate("/")}
        >
          Go to Signup
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fafafa",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  linkButton: {
    padding: "10px",
    marginTop: "10px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
