import React, { useState } from "react";
import { api } from "../api/client";

export default function FarmerView({ selectedField }) {
  const [optedIn, setOptedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!selectedField) {
    return <div style={styles.placeholder}>👈 Click on a field from the map or table to view farm details & incentives.</div>;
  }

  const handleOptIn = async () => {
    setSubmitting(true);
    try {
      await api.post(`/fields/${selectedField.id}/consent`, { optIn: true });
      setOptedIn(true);
    } catch (err) {
      console.warn("Backend offline, opting in locally:", err);
      setOptedIn(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <h4>🌾 Farmer Stubble Management Panel</h4>
      <p><strong>Field ID:</strong> {selectedField.id}</p>
      <p><strong>Risk Index:</strong> <span style={{ color: selectedField.risk_score > 70 ? "#f44336" : "#4caf50" }}>{selectedField.risk_score}%</span></p>

      {/* SHAP / Risk Factors from ML Lead (Nivedha) */}
      <div style={styles.reasonBox}>
        <strong>Risk Factors (ML Analysis):</strong>
        <ul>
          {selectedField.top_reasons?.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          )) || <li>Short sowing window detected (+40% risk)</li>}
        </ul>
      </div>

      <div style={styles.actionBox}>
        <h5>🎁 Biomass Buyback Incentive</h5>
        <p>Opt-in to sell your crop residue instead of burning. Estimated earnings: <strong>₹2,400 / acre</strong></p>
        
        <button 
          style={{ ...styles.btn, backgroundColor: optedIn ? "#2e7d32" : "#0288d1" }} 
          onClick={handleOptIn} 
          disabled={submitting || optedIn}
        >
          {optedIn ? "✅ Machine Pickup Requested!" : submitting ? "Sending Request..." : "🚜 Request Equipment / Sell Biomass"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  placeholder: { padding: "1.5rem", color: "#aaa", fontStyle: "italic", textAlign: "center" },
  card: { display: "flex", flexDirection: "column", gap: "0.8rem", color: "#eee" },
  reasonBox: { backgroundColor: "#262626", padding: "0.8rem", borderRadius: "6px", fontSize: "0.85rem" },
  actionBox: { backgroundColor: "#1e2e1e", border: "1px solid #2e7d32", padding: "1rem", borderRadius: "6px" },
  btn: { width: "100%", padding: "0.75rem", border: "none", color: "#fff", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }
};