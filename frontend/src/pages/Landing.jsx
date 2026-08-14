import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { 
  IconSatellite, IconLeaf, IconFlame, IconFactory, IconShield, 
  IconTruck, IconCheck, IconArrowRight, IconUser 
} from "../components/Icons";

export default function Landing() {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 0,
      title: "Satellite Regional Monitoring",
      tagline: "Thermal Anomaly & Boundary Intelligence",
      description: "Satellites monitor field boundaries across Punjab, Haryana, Bihar, and Uttar Pradesh to detect thermal signatures.",
      icon: <IconSatellite size={32} color="#059669" />,
      metric: "NASA FIRMS Satellite Feeds",
      statusText: "Active Orbit Scanning"
    },
    {
      id: 1,
      title: "Field Risk Assessment",
      tagline: "Gradient Boosting ML Risk Pipeline",
      description: "Evaluates field sowing deadlines, historical burn anomalies, and residue load to predict burning risk before harvest.",
      icon: <IconLeaf size={32} color="#d97706" />,
      metric: "93% ML Risk Identification",
      statusText: "Pre-Harvest Scoring"
    },
    {
      id: 2,
      title: "Biomass Marketplace Match",
      tagline: "Aggregator Sourcing & Commercial Offers",
      description: "High-risk fields are matched with industrial biomass buyers who submit commercial purchase offers (₹/ton) directly to farmers.",
      icon: <IconFactory size={32} color="#2563eb" />,
      metric: "₹2,400 / ton Average Value",
      statusText: "Buyer Opportunity Active"
    },
    {
      id: 3,
      title: "Farmer Consent & Pickup",
      tagline: "Accepted Recovery & Baler Logistics",
      description: "Farmers accept biomass recovery offers. Industrial aggregators dispatch balers to collect stubble directly from fields.",
      icon: <IconTruck size={32} color="#059669" />,
      metric: "486+ Tons Stubble Diverted",
      statusText: "Collection Confirmed"
    },
    {
      id: 4,
      title: "Ground Verification & Clean Air",
      tagline: "Fine Particulate (PM2.5) Air Pollution Prevention",
      description: "If prevention fails, district nodal officers receive real-time alerts on GIS maps, dispatch ground teams, and record outcomes.",
      icon: <IconShield size={32} color="#dc2626" />,
      metric: "18.47 Tons PM2.5 Avoided",
      statusText: "Environmental Impact Tracked"
    }
  ];

  // Auto transition through supply chain stage story
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Top Header Navigation */}
      <header style={styles.navbar}>
        <div style={styles.navInner}>
          <Logo size="md" />
          <div style={styles.navActions}>
            <button style={styles.loginNavBtn} onClick={() => navigate("/login")}>
              <IconUser size={16} /> Portal Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBadge}>
          <IconSatellite size={14} color="#059669" />
          <span>Agricultural Satellite Monitoring & Stubble Burning Prevention Platform</span>
        </div>
        <h1 style={styles.heroTitle}>
          Field-Level Stubble Burning Prevention & Biomass Recovery System
        </h1>
        <p style={styles.heroSub}>
          Connecting satellite thermal detection with industrial biomass buyers to eliminate illegal crop-residue burning across northern Indian agricultural regions.
        </p>

        <div style={styles.heroBtnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Access Portal Login <IconArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Interactive Supply Chain Visual Storytelling Animation */}
      <section style={styles.storySection}>
        <div style={styles.storyHeader}>
          <h2 style={styles.sectionTitle}>Satellite-to-Ground Intervention Workflow</h2>
          <p style={styles.sectionSub}>How CropChar transforms stubble disposal pressure into clean bio-energy supply chains</p>
        </div>

        {/* Stage Slider Nav */}
        <div style={styles.stageNav}>
          {stages.map((st, idx) => (
            <button
              key={st.id}
              style={{
                ...styles.stageNavBtn,
                borderColor: activeStage === idx ? "#059669" : "#e2e8f0",
                background: activeStage === idx ? "#ecfdf5" : "#ffffff",
                color: activeStage === idx ? "#047857" : "#475569"
              }}
              onClick={() => setActiveStage(idx)}
            >
              <span style={styles.stageNum}>{idx + 1}</span>
              <span style={styles.stageNavLabel}>{st.title}</span>
            </button>
          ))}
        </div>

        {/* Stage Display Card Animation */}
        <div style={styles.stageDisplayCard}>
          <div style={styles.stageVisualSide}>
            <div style={styles.iconCircle}>
              {stages[activeStage].icon}
            </div>
            <div style={styles.stageStatusBadge}>
              <IconCheck size={14} color="#059669" />
              {stages[activeStage].statusText}
            </div>
            <div style={styles.stageMetricBox}>
              <span style={styles.metricLabel}>Platform Impact</span>
              <span style={styles.metricVal}>{stages[activeStage].metric}</span>
            </div>
          </div>

          <div style={styles.stageTextSide}>
            <span style={styles.stageStepTag}>Stage {activeStage + 1} of 5</span>
            <h3 style={styles.stageCardTitle}>{stages[activeStage].title}</h3>
            <h4 style={styles.stageCardTagline}>{stages[activeStage].tagline}</h4>
            <p style={styles.stageCardDesc}>{stages[activeStage].description}</p>

            <div style={styles.stageControls}>
              <button 
                style={styles.prevBtn}
                disabled={activeStage === 0}
                onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
              >
                Previous
              </button>
              <button 
                style={styles.nextBtn}
                disabled={activeStage === stages.length - 1}
                onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Category Cards Overview */}
      <section style={styles.categorySection}>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center", marginBottom: "2rem" }}>
          Three Dedicated Operational Portals
        </h2>

        <div style={styles.categoryGrid}>
          <div style={styles.catCard}>
            <div style={{ ...styles.catIcon, background: "#ecfdf5", color: "#059669" }}>
              <IconLeaf size={24} />
            </div>
            <h3 style={styles.catTitle}>Farmer Portal</h3>
            <p style={styles.catDesc}>
              Simple 5-input field registration with interactive map location picker. Receive commercial biomass purchase offers and track pickup status without technical clutter.
            </p>
          </div>

          <div style={styles.catCard}>
            <div style={{ ...styles.catIcon, background: "#eff6ff", color: "#2563eb" }}>
              <IconFactory size={24} />
            </div>
            <h3 style={styles.catTitle}>Biomass Buyer Portal</h3>
            <p style={styles.catDesc}>
              Industrial biomass procurement portal for discover high-risk residue opportunities, submitting price per ton offers, and managing baler pickup logistics.
            </p>
          </div>

          <div style={styles.catCard}>
            <div style={{ ...styles.catIcon, background: "#fef2f2", color: "#dc2626" }}>
              <IconShield size={24} />
            </div>
            <h3 style={styles.catTitle}>Government Nodal Officer</h3>
            <p style={styles.catDesc}>
              GIS Operations Dashboard with State & District filters across Punjab, Haryana, Bihar, and UP. Inspect active satellite fires, dispatch ground teams, and log outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <Logo size="sm" />
          <p style={styles.footerText}>
            CropChar Platform • Punjab • Haryana • Bihar • Uttar Pradesh
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    display: "flex",
    flexDirection: "column"
  },
  navbar: {
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "1rem 2rem",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  navActions: {
    display: "flex",
    gap: "1rem"
  },
  loginNavBtn: {
    background: "#059669",
    color: "#ffffff",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "0.88rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  heroSection: {
    maxWidth: "900px",
    margin: "4rem auto 2rem auto",
    textAlign: "center",
    padding: "0 1.5rem"
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    color: "#047857",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: "700",
    marginBottom: "1.5rem"
  },
  heroTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "2.6rem",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1.2",
    marginBottom: "1.2rem",
    letterSpacing: "-0.5px"
  },
  heroSub: {
    fontSize: "1.1rem",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "2.5rem",
    maxWidth: "780px",
    margin: "0 auto 2.5rem auto"
  },
  heroBtnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem"
  },
  primaryBtn: {
    background: "#059669",
    color: "#ffffff",
    border: "none",
    padding: "0.9rem 2rem",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 14px rgba(5, 150, 105, 0.25)"
  },
  storySection: {
    maxWidth: "1100px",
    margin: "3rem auto",
    padding: "0 1.5rem",
    width: "100%"
  },
  storyHeader: {
    textAlign: "center",
    marginBottom: "2rem"
  },
  sectionTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#0f172a"
  },
  sectionSub: {
    fontSize: "0.95rem",
    color: "#64748b",
    marginTop: "4px"
  },
  stageNav: {
    display: "flex",
    gap: "0.8rem",
    overflowX: "auto",
    paddingBottom: "1rem",
    marginBottom: "1.5rem"
  },
  stageNavBtn: {
    flex: 1,
    minWidth: "180px",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    border: "1px solid",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
    transition: "all 0.2s ease"
  },
  stageNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#059669",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  stageNavLabel: {
    fontSize: "0.82rem",
    fontWeight: "700",
    lineHeight: "1.2"
  },
  stageDisplayCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "2.5rem",
    display: "grid",
    gridTemplateColumns: "1fr 1.8fr",
    gap: "2.5rem",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)"
  },
  stageVisualSide: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  stageStatusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#ecfdf5",
    color: "#047857",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.78rem",
    fontWeight: "700",
    marginBottom: "1.5rem"
  },
  stageMetricBox: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1rem",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  metricLabel: {
    fontSize: "0.75rem",
    color: "#64748b",
    fontWeight: "600"
  },
  metricVal: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#0f172a",
    marginTop: "2px"
  },
  stageTextSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  stageStepTag: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#059669",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  stageCardTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#0f172a",
    margin: "4px 0"
  },
  stageCardTagline: {
    fontSize: "0.95rem",
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: "1rem"
  },
  stageCardDesc: {
    fontSize: "0.98rem",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "2rem"
  },
  stageControls: {
    display: "flex",
    gap: "1rem"
  },
  prevBtn: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#475569",
    fontWeight: "600",
    fontSize: "0.88rem",
    cursor: "pointer"
  },
  nextBtn: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    background: "#059669",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "0.88rem",
    cursor: "pointer"
  },
  categorySection: {
    maxWidth: "1100px",
    margin: "3rem auto 5rem auto",
    padding: "0 1.5rem",
    width: "100%"
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem"
  },
  catCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column"
  },
  catIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.2rem"
  },
  catTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "0.6rem"
  },
  catDesc: {
    fontSize: "0.9rem",
    color: "#64748b",
    lineHeight: "1.5"
  },
  footer: {
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    padding: "1.5rem 2rem",
    marginTop: "auto"
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem"
  },
  footerText: {
    fontSize: "0.82rem",
    color: "#64748b"
  }
};
