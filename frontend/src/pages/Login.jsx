import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    try {
      // Optional API call to log role session with backend
      await api.post("/login", { role });
    } catch (err) {
      console.log("Backend offline, continuing with local role selection:", err);
    }
    
    // Save chosen role and navigate to dashboard
    localStorage.setItem("role", role);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌱 CropChar</h1>
        <p style={styles.subtitle}>Field-Level Stubble Burning Prevention Platform</p>

        <h3 style={styles.prompt}>Select Your Role to Enter:</h3>

        <div style={styles.buttonGroup}>
          <button 
            style={{ ...styles.button, backgroundColor: "#2e7d32" }} 
            onClick={() => handleRoleSelect("farmer")}
          >
            👨‍🌾 Farmer View
          </button>

          <button 
            style={{ ...styles.button, backgroundColor: "#0288d1" }} 
            onClick={() => handleRoleSelect("company")}
          >
            🏭 Biomass Buyer View
          </button>

          <button 
            style={{ ...styles.button, backgroundColor: "#d32f2f" }} 
            onClick={() => handleRoleSelect("officer")}
          >
            👮 Nodal Officer View
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  card: {
    padding: "2.5rem",
    borderRadius: "12px",
    backgroundColor: "#1e1e1e",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    maxWidth: "400px",
    width: "100%",
  },
  title: { fontSize: "2.2rem", margin: "0 0 0.5rem 0", color: "#4caf50" },
  subtitle: { fontSize: "0.9rem", color: "#aaa", marginBottom: "2rem" },
  prompt: { marginBottom: "1.5rem", fontWeight: "normal" },
  buttonGroup: { display: "flex", flexDirection: "column", gap: "1rem" },
  button: {
    padding: "0.85rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.1s ease",
  },
};