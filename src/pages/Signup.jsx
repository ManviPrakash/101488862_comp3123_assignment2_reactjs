import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      await API.post("/user/signup", { username, email, password });
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Signup</h2>

      <form onSubmit={handleSignup} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.button}>Signup</button>
        <button
          type="button"
          style={styles.linkButton}
          onClick={() => navigate("/login")}
        >
          Login Instead
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
    background: "green",
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
