import React from "react";

export default function MainPage({ setPage }) {
  const styles = {
    container: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    hero: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "80px 20px",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "20px",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    heroSubtitle: {
      fontSize: "24px",
      marginBottom: "40px",
      opacity: 0.95,
    },
    heroButton: {
      backgroundColor: "white",
      color: "#667eea",
      padding: "18px 48px",
      fontSize: "20px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      marginTop: "20px",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "60px 20px",
    },
    section: {
      marginBottom: "80px",
    },
    sectionTitle: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "30px",
      textAlign: "center",
    },
    description: {
      fontSize: "18px",
      lineHeight: "1.8",
      color: "#4b5563",
      marginBottom: "30px",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 30px",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      marginTop: "50px",
    },
    featureCard: {
      backgroundColor: "white",
      padding: "40px 30px",
      borderRadius: "16px",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    featureIcon: {
      fontSize: "48px",
      marginBottom: "20px",
    },
    featureTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "15px",
    },
    featureDescription: {
      fontSize: "16px",
      color: "#6b7280",
      lineHeight: "1.6",
    },
    ctaSection: {
      backgroundColor: "#667eea",
      color: "white",
      padding: "80px 20px",
      textAlign: "center",
      borderRadius: "20px",
      margin: "0 20px 60px",
    },
    ctaTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    ctaText: {
      fontSize: "20px",
      marginBottom: "40px",
      opacity: 0.95,
    },
    ctaButton: {
      backgroundColor: "white",
      color: "#667eea",
      padding: "20px 60px",
      fontSize: "22px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    infoBox: {
      backgroundColor: "#eff6ff",
      border: "2px solid #3b82f6",
      borderRadius: "12px",
      padding: "30px",
      marginTop: "40px",
      textAlign: "center",
    },
    infoTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1e40af",
      marginBottom: "15px",
    },
    infoText: {
      fontSize: "16px",
      color: "#1e40af",
      lineHeight: "1.6",
    },
    footer: {
      backgroundColor: "#1f2937",
      color: "#d1d5db",
      padding: "40px 20px",
      textAlign: "center",
    },
    footerText: {
      fontSize: "14px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>정릉3동 시간은행</h1>
        <p style={styles.heroSubtitle}>시간으로 나누는 따뜻한 이웃 공동체</p>
        <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}>
          서로의 시간과 재능을 나누고, 도움을 주고받는
          <br />
          새로운 품앗이 활동에 참여해보세요
        </p>
        <button
          style={styles.heroButton}
          onClick={() => {
            setPage(1);
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          📝 설문조사 참여하기
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>정릉3동 시간은행 축제부스</p>
        <p style={styles.footerText}>문의: 정릉3동 주민센터</p>
        <p style={{ ...styles.footerText, marginTop: "20px", opacity: 0.7 }}>
          © 2025 레아비전. All rights reserved.
        </p>
      </div>
    </div>
  );
}
