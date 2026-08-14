import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { IconLogout, IconUser, IconShield } from "../components/Icons";
import FarmerView from "../components/FarmerView";
import CompanyView from "../components/CompanyView";
import OfficerView from "../components/OfficerView";

export default function Dashboard() {
  const navigate = useNavigate();
  const { category } = useParams(); // farmer, buyer, officer
  const [role, setRole] = useState(localStorage.getItem("role") || "farmer");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Gurpreet Singh");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    // 1. Check if user is logged in
    if (!storedRole) {
      navigate("/login");
      return;
    }

    setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);

    // 2. Map route category parameter to role code
    const categoryToRole = {
      farmer: "farmer",
      buyer: "company",
      officer: "officer"
    };

    const requestedRole = categoryToRole[category];

    // 3. STRICT ROLE-BASED ACCESS CONTROL (RBAC)
    // If user tries to access a URL category that does not match their logged-in role, redirect to allowed dashboard!
    if (requestedRole && requestedRole !== storedRole) {
      console.warn(`[RBAC Enforcement] Blocked unauthorized access attempt to /dashboard/${category}`);
      const allowedCategory = storedRole === "farmer" ? "farmer" : storedRole === "company" ? "buyer" : "officer";
      navigate(`/dashboard/${allowedCategory}`, { replace: true });
    }
  }, [category, navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Clean Enterprise Top Navigation Header */}
      <header style={styles.header}>
        <div style={styles.brandBox} onClick={() => navigate("/")}>
          <Logo size="md" />
        </div>

        {/* User Session Info & Sign Out */}
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{username}</span>
            <span style={{
              ...styles.roleBadge,
              background: role === "farmer" ? "#ecfdf5" : role === "company" ? "#eff6ff" : "#fef2f2",
              color: role === "farmer" ? "#047857" : role === "company" ? "#1d4ed8" : "#b91c1c",
              borderColor: role === "farmer" ? "#a7f3d0" : role === "company" ? "#bfdbfe" : "#fecaca",
            }}>
              {role === "farmer" && "FARMER CATEGORY"}
              {role === "company" && "BIOMASS BUYER CATEGORY"}
              {role === "officer" && "GOVERNMENT OFFICER CATEGORY"}
            </span>
          </div>

          <button style={styles.signOutBtn} onClick={handleSignOut} title="Sign Out">
            <IconLogout size={16} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Role-Isolated Content */}
      <main style={styles.mainContent}>
        {role === "farmer" && <FarmerView />}
        {role === "company" && <CompanyView />}
        {role === "officer" && <OfficerView />}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>CropChar Platform • Agricultural Satellite Stubble Intelligence</span>
          <span>Northern Agricultural Regions (Punjab • Haryana • Bihar • UP)</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "0.9rem 2rem",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "2px",
  },
  userName: {
    fontSize: "0.88rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  roleBadge: {
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "0.7rem",
    fontWeight: "800",
    border: "1px solid",
  },
  signOutBtn: {
    padding: "0.5rem 1rem",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    color: "#334155",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.82rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.15s ease"
  },
  mainContent: {
    flex: 1,
    padding: "1.5rem 2rem",
    maxWidth: "1440px",
    width: "100%",
    margin: "0 auto",
  },
  footer: {
    padding: "1rem 2rem",
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    fontSize: "0.8rem",
    color: "#64748b",
  },
  footerInner: {
    maxWidth: "1440px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem"
  }
};