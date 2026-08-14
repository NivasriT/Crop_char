import React from "react";

export default function Sidebar({ currentRole, onRoleChange, onLogout }) {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>🌱 CropChar</h2>
      <nav style={styles.nav}>
        <div style={styles.sectionTitle}>Switch Role View</div>
        <button
          style={{ ...styles.navBtn, ...(currentRole === "farmer" ? styles.active : {}) }}
          onClick={() => onRoleChange("farmer")}
        >
          👨‍🌾 Farmer View
        </button>
        <button
          style={{ ...styles.navBtn, ...(currentRole === "company" ? styles.active : {}) }}
          onClick={() => onRoleChange("company")}
        >
          🏭 Biomass Buyer View
        </button>
        <button
          style={{ ...styles.navBtn, ...(currentRole === "officer" ? styles.active : {}) }}
          onClick={() => onRoleChange("officer")}
        >
          👮 Nodal Officer View
        </button>
      </nav>

      <button style={styles.logoutBtn} onClick={onLogout}>
        🚪 Switch Account / Exit
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    backgroundColor: "#181818",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #2a2a2a",
  },
  logo: { color: "#4caf50", margin: "0 0 2rem 0" },
  sectionTitle: { fontSize: "0.75rem", color: "#888", marginBottom: "0.8rem", textTransform: "uppercase" },
  nav: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  navBtn: {
    padding: "0.75rem 1rem",
    textAlign: "left",
    backgroundColor: "transparent",
    color: "#ccc",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  active: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "0.75rem",
    backgroundColor: "#2a2a2a",
    color: "#ff5252",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};