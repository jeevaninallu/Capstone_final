// ModelInsights.jsx

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaBrain,
  FaBullseye,
  FaDatabase,
  FaChartLine,
  FaInfoCircle
} from "react-icons/fa";

function ModelInsights() {
  const [open, setOpen] = useState(true);

  return (
    <div style={styles.layout}>
      <Sidebar open={open} setOpen={setOpen} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          {/* Header */}
          <h1 style={styles.heading}>
            ML Model Insights
          </h1>

          <p style={styles.sub}>
            Random Forest model performance metrics and feature analysis
          </p>

          {/* TOP CARDS */}
          <div style={styles.grid4}>
            <TopCard
              icon={<FaBrain />}
              value="v2.4.1"
              title="Model Version"
              color="#3b82f6"
              status="Production Ready"
            />

            <TopCard
              icon={<FaBullseye />}
              value="95.8%"
              title="Overall Accuracy"
              color="#10b981"
            />

            <TopCard
              icon={<FaDatabase />}
              value="12,547"
              title="Training Samples"
              color="#f59e0b"
            />

            <TopCard
              icon={<FaChartLine />}
              value="1,900"
              title="Test Samples"
              color="#3b82f6"
            />
          </div>

          {/* CONFUSION MATRIX */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              Confusion Matrix
            </h2>

            <div style={styles.matrixGrid}>
              <MatrixBox
                number="847"
                title="True Positive"
                desc="Correctly predicted default"
                bg="#dcfce7"
                border="#10b981"
                color="#065f46"
              />

              <MatrixBox
                number="42"
                title="False Positive"
                desc="Incorrectly predicted default"
                bg="#fee2e2"
                border="#ef4444"
                color="#991b1b"
              />

              <MatrixBox
                number="38"
                title="False Negative"
                desc="Missed actual default"
                bg="#fee2e2"
                border="#ef4444"
                color="#991b1b"
              />

              <MatrixBox
                number="973"
                title="True Negative"
                desc="Correctly predicted no default"
                bg="#dcfce7"
                border="#10b981"
                color="#065f46"
              />
            </div>

            {/* METRICS */}
            <div style={styles.metricsGrid}>
              <Metric value="95.8%" label="Accuracy" />
              <Metric value="95.3%" label="Precision" />
              <Metric value="95.7%" label="Recall" />
            </div>
          </div>

          {/* INFO BOX */}
          <div style={styles.infoBox}>
            <div style={styles.infoIcon}>
              <FaInfoCircle />
            </div>

            <div>
              <h3 style={styles.infoTitle}>
                Model Information
              </h3>

              <p style={styles.infoText}>
                Random Forest Classifier with 100 estimators,
                max depth of 20, trained on 1,900 historical
                loan applications. Last updated:
                February 14, 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* TOP CARD */
function TopCard({
  icon,
  value,
  title,
  color,
  status
}) {
  return (
    <div style={styles.topCard}>
      <div
        style={{
          ...styles.iconBox,
          background: `${color}20`,
          color
        }}
      >
        {icon}
      </div>

      <h2 style={styles.topValue}>
        {value}
      </h2>

      <p style={styles.topTitle}>
        {title}
      </p>

      <div
        style={{
          height: 4,
          background: color,
          borderRadius: 10,
          marginTop: 14
        }}
      />

      {status && (
        <p style={styles.readyText}>
          ✓ {status}
        </p>
      )}
    </div>
  );
}

/* MATRIX BOX */
function MatrixBox({
  number,
  title,
  desc,
  bg,
  border,
  color
}) {
  return (
    <div
      style={{
        ...styles.matrixBox,
        background: bg,
        border: `2px solid ${border}`
      }}
    >
      <h1
        style={{
          ...styles.matrixNumber,
          color
        }}
      >
        {number}
      </h1>

      <h3
        style={{
          marginBottom: 10,
          color
        }}
      >
        {title}
      </h3>

      <p style={styles.matrixDesc}>
        {desc}
      </p>
    </div>
  );
}

/* METRIC */
function Metric({ value, label }) {
  return (
    <div style={styles.metricCard}>
      <h2 style={styles.metricValue}>
        {value}
      </h2>

      <p style={styles.metricLabel}>
        {label}
      </p>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#eff6ff,#dbeafe,#bfdbfe)"
  },

  main: {
    flex: 1
  },

  content: {
    padding: "30px"
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#0f172a"
  },

  sub: {
    color: "#64748b",
    fontSize: "18px",
    marginBottom: "24px"
  },

  grid4: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "18px",
    marginBottom: "24px"
  },

  topCard: {
    background: "rgba(255,255,255,0.95)",
    padding: "24px",
    borderRadius: "22px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06)"
  },

  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "18px"
  },

  topValue: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "6px",
    color: "#0f172a"
  },

  topTitle: {
    color: "#64748b"
  },

  readyText: {
    marginTop: "12px",
    color: "#10b981",
    fontWeight: "600",
    fontSize: "14px"
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    padding: "28px",
    borderRadius: "24px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: "24px"
  },

  sectionTitle: {
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#0f172a"
  },

  matrixGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "18px",
    marginBottom: "24px"
  },

  matrixBox: {
    padding: "32px",
    borderRadius: "20px",
    textAlign: "center"
  },

  matrixNumber: {
    fontSize: "58px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  matrixDesc: {
    color: "#64748b",
    fontSize: "15px"
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px"
  },

  metricCard: {
    background: "#f8fafc",
    padding: "24px",
    borderRadius: "18px",
    textAlign: "center"
  },

  metricValue: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#0f172a"
  },

  metricLabel: {
    color: "#64748b",
    marginTop: "8px"
  },

  infoBox: {
    background: "#dbeafe",
    border: "1px solid #3b82f6",
    padding: "24px",
    borderRadius: "20px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start"
  },

  infoIcon: {
    fontSize: "24px",
    color: "#2563eb",
    marginTop: "4px"
  },

  infoTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#1e3a8a"
  },

  infoText: {
    color: "#475569",
    lineHeight: "1.8"
  }
};

export default ModelInsights;