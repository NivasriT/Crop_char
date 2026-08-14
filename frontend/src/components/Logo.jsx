import React, { useState } from "react";
import logoImg from "../assets/logo.png";

export default function Logo({ size = "md", showText = true, light = false }) {
  const [imgError, setImgError] = useState(false);

  const iconSizes = { sm: 32, md: 44, lg: 64 };
  const s = iconSizes[size] || 44;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
      {!imgError ? (
        <img 
          src={logoImg} 
          alt="CropChar Agro-Tech Logo" 
          style={{ width: `${s}px`, height: `${s}px`, objectFit: "contain", borderRadius: "8px" }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{
          width: `${s}px`,
          height: `${s}px`,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          boxShadow: "0 2px 8px rgba(5, 150, 105, 0.25)"
        }}>
          <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      )}

      {showText && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "800",
            fontSize: size === "lg" ? "1.8rem" : size === "md" ? "1.4rem" : "1.1rem",
            letterSpacing: "-0.5px",
            color: light ? "#ffffff" : "#0f172a",
            lineHeight: "1.1"
          }}>
            Crop<span style={{ color: "#059669" }}>Char</span>
          </span>
          <span style={{
            fontSize: size === "lg" ? "0.8rem" : "0.7rem",
            fontWeight: "700",
            color: light ? "#94a3b8" : "#059669",
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}>
            AGRO-TECH
          </span>
        </div>
      )}
    </div>
  );
}
