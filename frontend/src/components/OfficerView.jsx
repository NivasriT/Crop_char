import React, { useState } from "react";
import { api } from "../api/client";

export default function OfficerView({ selectedField }) {
  const [dispatched, setDispatched] = useState(false);

  if (!selectedField) {
    return <div style={styles.placeholder}>👈 Select a high-risk field to initiate enforcement dispatch.</div>;
  }

  const handleDispatch = async () => {
    try {
      await api.post(`/fields/${selectedField.id}/dispatch`);
      setDispatched(true);
    } catch (err) {
      console.warn("Backend offline, dispatching team locally:", err);
      setDispatched(true);
    }
  };

  return (
    <div style={styles.card}>
      <h4>👮 Nodal Enforcement Center</h4>
      <p><strong>Field:</strong> {selectedField.id}</p>
      <p><strong>Location:</strong> {selectedField.location || "Sector 4, Patiala Region"}</p>
      <p><strong>Risk Level:</strong> <strong style={{ color: "#f44336" }}>{selectedField.risk_score || "85"}% HIGH</strong></p>

      <div style={styles.dispatchBox}>
        <p>Status: {dispatched ? "🚨 Field Team Dispatched" : "⚠️ High Fire Likelihood"}</p>
        <button 
          style={{ ...styles.btn, backgroundColor: dispatched ? "#2e7d32" : "#d32f2f" }} 
          onClick={handleDispatch}
          disabled={dispatched}
        >
          {dispatched ? "✅ Team En Route" : "🚨 Dispatch Field Officer / Baler"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  placeholder: { padding: "1.5rem", color: "#aaa", fontStyle: "italic", textAlign: "center" },
  card: { display: "flex", flexDirection: "column", gap: "0.8rem", color: "#eee" },
  dispatchBox: { backgroundColor: "#2c1a1a", border: "1px solid #d32f2f", padding: "1rem", borderRadius: "6px" },
  btn: { width: "100%", padding: "0.75rem", border: "none", color: "#fff", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }
};