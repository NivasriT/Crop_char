import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RiskMap from "../components/RiskMap";
import PriorityTable from "../components/PriorityTable";
import FarmerView from "../components/FarmerView";
import CompanyView from "../components/CompanyView";
import OfficerView from "../components/OfficerView";
import { api } from "../api/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role") || "farmer");
  const [fields, setFields] = useState([]);
  const [fires, setFires] = useState([]);
  const [stats, setStats] = useState({ fields_monitored: 0, high_risk: 0, prevented: 0, active_fires: 0 });
  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [fieldsRes, firesRes, statsRes] = await Promise.all([
          api.get("/fields"),
          api.get("/fires"),
          api.get("/stats"),
        ]);
        
        setFields(fieldsRes.data);
        setFires(firesRes.data);
        setStats(statsRes.data);

        // Auto-select first high risk field for quick inspection
        if (fieldsRes.data.length > 0) {
          setSelectedField(fieldsRes.data[0]);
        }
      } catch (err) {
        console.error("Error fetching live backend data:", err);
      }
    };

    fetchAllData();
    // Refresh live satellite data every 10 seconds
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar currentRole={role} onRoleChange={handleRoleChange} onLogout={handleLogout} />

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <div>
            <h2>🌾 CropChar Monitor Platform</h2>
            <p style={{ color: "#aaa", margin: 0, fontSize: "0.85rem" }}>Live Satellite & ML Prevention Network</p>
          </div>
          <span style={styles.roleBadge}>Role: {role.toUpperCase()}</span>
        </header>

        {/* Live System Stats Banner */}
        <div style={styles.statsBar}>
          <div style={styles.statCard}>📊 Monitored Fields: <strong>{stats.fields_monitored}</strong></div>
          <div style={styles.statCard}>⚠️ High Risk Fields: <strong style={{ color: "#f44336" }}>{stats.high_risk}</strong></div>
          <div style={styles.statCard}>🔥 Active Satellite Fires: <strong style={{ color: "#ff9800" }}>{stats.active_fires}</strong></div>
          <div style={styles.statCard}>🛡️ Burns Prevented: <strong style={{ color: "#4caf50" }}>{stats.prevented}</strong></div>
        </div>

        <div style={styles.grid}>
          <div style={styles.mapSection}>
            <h3>Field Risk Overview</h3>
            <RiskMap fields={fields} fires={fires} onSelectField={setSelectedField} />
          </div>

          <div style={styles.detailSection}>
            <h3>Role Action Panel</h3>
            {role === "farmer" && <FarmerView selectedField={selectedField} />}
            {role === "company" && <CompanyView selectedField={selectedField} />}
            {role === "officer" && <OfficerView selectedField={selectedField} />}
          </div>
        </div>

        <div style={styles.tableSection}>
          <h3>High-Risk Priority Queue</h3>
          <PriorityTable fields={fields} onSelectField={setSelectedField} />
        </div>
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: { display: "flex", minHeight: "100vh", backgroundColor: "#121212", color: "#fff", fontFamily: "Arial, sans-serif" },
  mainContent: { flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333", paddingBottom: "1rem" },
  roleBadge: { backgroundColor: "#2e7d32", padding: "0.4rem 0.8rem", borderRadius: "20px", fontWeight: "bold", fontSize: "0.85rem" },
  statsBar: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" },
  statCard: { backgroundColor: "#1e1e1e", padding: "0.8rem 1rem", borderRadius: "6px", fontSize: "0.9rem", border: "1px solid #2a2a2a" },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" },
  mapSection: { backgroundColor: "#1e1e1e", padding: "1rem", borderRadius: "8px" },
  detailSection: { backgroundColor: "#1e1e1e", padding: "1rem", borderRadius: "8px" },
  tableSection: { backgroundColor: "#1e1e1e", padding: "1rem", borderRadius: "8px" },
};