import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { IconArrowRight } from "./Icons";

/**
 * IntroSplash Component
 * Minimalist, high-aesthetic splash screen wrapper with seamless background video animation
 * and a clean 'Skip Intro' action that smoothly reveals / transitions to the login screen.
 * 
 * Works seamlessly across initial loads and page refreshes (F5).
 */
export default function IntroSplash({
  videoSrc = "/cropchar-intro.mp4",
  redirectTo,
  onFinish,
  children
}) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // ignore
      }
    }

    setTimeout(() => {
      setShowSplash(false);
      if (onFinish) {
        onFinish();
      } else if (redirectTo) {
        navigate(redirectTo);
      }
    }, 450);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;

      const playVideo = () => {
        video.play().catch((err) => {
          console.log("Autoplay background video notice:", err);
        });
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener("loadeddata", playVideo, { once: true });
        video.addEventListener("canplay", playVideo, { once: true });
      }
    }

    // Safety timeout: auto-transition after 16s if video ends or is interrupted
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 16000);

    // Keyboard shortcut (Escape to skip)
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Underlying app content (rendered beneath so transition is instantaneous and clean) */}
      {children}

      {/* Intro Video Overlay */}
      {showSplash && (
        <div
          style={{
            ...styles.container,
            opacity: isExiting ? 0 : 1,
            transform: isExiting ? "scale(1.02)" : "scale(1)",
            transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
            pointerEvents: isExiting ? "none" : "auto"
          }}
        >
          {/* Seamless Full-Screen Background Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            style={styles.bgVideo}
            playsInline
            autoPlay
            muted
            preload="auto"
            onEnded={handleFinish}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src="/cropchar-intro.mp4.mp4" type="video/mp4" />
          </video>

          {/* Sleek Minimal Top Navbar */}
          <header style={styles.topNav}>
            <div style={styles.brandBox}>
              <Logo size="md" light={false} />
              <span style={styles.platformBadge}>
                Stubble Burning Prevention & Biomass Recovery
              </span>
            </div>

            <button 
              style={styles.skipBtn}
              onClick={handleFinish}
              title="Skip to Login"
            >
              <span>Skip Intro</span>
              <IconArrowRight size={16} />
            </button>
          </header>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    zIndex: 9999,
    overflow: "hidden",
    userSelect: "none"
  },
  bgVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: 1,
    pointerEvents: "none",
    background: "#ffffff"
  },
  topNav: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem 2.5rem",
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)"
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem"
  },
  platformBadge: {
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#059669",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    padding: "4px 12px",
    borderRadius: "20px",
    letterSpacing: "0.2px"
  },
  skipBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "0.55rem 1.15rem",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
    transition: "all 0.2s ease"
  }
};
