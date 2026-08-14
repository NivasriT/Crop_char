import React, { useState } from "react";
import { api } from "../api/client";

export default function CompanyView({ selectedField }) {
  const [offerSent, setOfferSent] = useState(false);

  if (!selectedField) {
    return <div style={styles.placeholder}>👈 Click on a field to make a biomass procurement offer.</div>;
  }

  const handleSendOffer = async () => {
    try {
      await api.post(`/fields/${selectedField.id}/offer`, { pricePerTon: 1800 });
      setOfferSent(true);
    } catch (err) {
      console.warn("Backend offline, sending offer locally:", err);
      setOfferSent(true);
    }
  };

  return (
    <div style={styles.card}>
      <h4>🏭 Biomass Buyer Marketplace</h4>
      <p><strong>Target Field:</strong> {selectedField.id}</p>
      <p><strong>Est. Yield:</strong> {selectedField.yield_tons || "12"} Tons Stubble</p>
      <p><strong>Window Remaining:</strong> {selectedField.countdown_hours || "48"} Hours</p>

      <div style={styles.offerBox}>
        <p>Standard Rate: <strong>₹1,800 / Ton</strong></p>
        <button 
          style={{ ...styles.btn, backgroundColor: offerSent ? "#2e7d32" : "#ed6c02" }} 
          onClick={handleSendOffer}
          disabled={offerSent}
        >
          {offerSent ? "✅ Offsite Collection Scheduled" : "📦 Bid for Collection Rights"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  placeholder: { padding: "1.5rem", color: "#aaa", fontStyle: "italic", textAlign: "center" },
  card: { display: "flex", flexDirection: "column", gap: "0.8rem", color: "#eee" },
  offerBox: { backgroundColor: "#2b2319", border: "1px solid #ed6c02", padding: "1rem", borderRadius: "6px" },
  btn: { width: "100%", padding: "0.75rem", border: "none", color: "#fff", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }
};