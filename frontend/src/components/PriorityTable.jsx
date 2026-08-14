import React from "react";

export default function PriorityTable({ fields, onSelectField }) {
  if (!fields || fields.length === 0) {
    return (
      <div style={styles.emptyState}>
        📡 Waiting for field risk data from backend API (`/api/fields`)...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Field ID</th>
            <th style={styles.th}>Farmer / Location</th>
            <th style={styles.th}>Risk Score</th>
            <th style={styles.th}>Harvest Window Left</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id} style={styles.row}>
              <td style={styles.td}><strong>{field.id}</strong></td>
              <td style={styles.td}>{field.farmer_name || field.location}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.badge,
                  backgroundColor: field.risk_score > 70 ? "#d32f2f" : field.risk_score > 40 ? "#ed6c02" : "#2e7d32"
                }}>
                  {field.risk_score}%
                </span>
              </td>
              <td style={styles.td}>{field.countdown_hours ? `${field.countdown_hours} hrs` : "N/A"}</td>
              <td style={styles.td}>{field.status || "Monitored"}</td>
              <td style={styles.td}>
                <button style={styles.selectBtn} onClick={() => onSelectField && onSelectField(field)}>
                  Inspect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { overflowX: "auto" },
  emptyState: { padding: "1.5rem", color: "#888", textAlign: "center" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" },
  headerRow: { borderBottom: "1px solid #333", color: "#aaa" },
  th: { padding: "0.75rem" },
  td: { padding: "0.75rem", borderBottom: "1px solid #222" },
  row: { transition: "background 0.2s" },
  badge: { padding: "0.2rem 0.5rem", borderRadius: "4px", color: "#fff", fontWeight: "bold", fontSize: "0.8rem" },
  selectBtn: { padding: "0.3rem 0.7rem", backgroundColor: "#0288d1", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }
};