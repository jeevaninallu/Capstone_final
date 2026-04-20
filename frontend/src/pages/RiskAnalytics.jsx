import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie
} from "react-icons/fa";

function RiskAnalytics() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      if (res.data.success) {
        setApplications(res.data.applications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const total = applications.length;

  const approved = applications.filter(
    (item) => item.prediction === "Approved"
  ).length;

  const rejected = applications.filter(
    (item) => item.prediction === "Rejected"
  ).length;

  const highRisk = applications.filter(
    (item) => item.probability >= 0.65
  ).length;

  const lowRisk = applications.filter(
    (item) => item.probability < 0.35
  ).length;

  const mediumRisk = applications.filter(
    (item) =>
      item.probability >= 0.35 &&
      item.probability < 0.65
  ).length;

  const approvalRate =
    total > 0
      ? ((approved / total) * 100).toFixed(1)
      : 0;

  const rejectRate =
    total > 0
      ? ((rejected / total) * 100).toFixed(1)
      : 0;

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Risk Analytics
          </h1>

          <p style={styles.sub}>
            Live MongoDB loan analytics dashboard
          </p>

          {/* TOP CARDS */}
          <div style={styles.grid4}>
            <Card
              icon={<FaUsers />}
              title="Total"
              value={total}
              color="#2563eb"
            />

            <Card
              icon={<FaCheckCircle />}
              title="Approved"
              value={`${approvalRate}%`}
              color="#10b981"
            />

            <Card
              icon={<FaTimesCircle />}
              title="Rejected"
              value={`${rejectRate}%`}
              color="#ef4444"
            />

            <Card
              icon={<FaChartPie />}
              title="High Risk"
              value={highRisk}
              color="#f59e0b"
            />
          </div>

          {/* CHARTS */}
          <div style={styles.grid2}>
            {/* Risk Distribution */}
            <div style={styles.box}>
              <h3 style={styles.boxTitle}>
                Risk Distribution
              </h3>

              <div style={styles.chartWrap}>
                <div style={styles.yaxis}>
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <div style={styles.bars}>
                  <Bar
                    h={`${(lowRisk /
                      total) *
                      100 || 0}%`}
                    color="#10b981"
                    label="Low"
                    value={lowRisk}
                  />

                  <Bar
                    h={`${(mediumRisk /
                      total) *
                      100 || 0}%`}
                    color="#f59e0b"
                    label="Medium"
                    value={mediumRisk}
                  />

                  <Bar
                    h={`${(highRisk /
                      total) *
                      100 || 0}%`}
                    color="#ef4444"
                    label="High"
                    value={highRisk}
                  />
                </div>
              </div>
            </div>

            {/* Result Summary */}
            <div style={styles.box}>
              <h3 style={styles.boxTitle}>
                Approval Summary
              </h3>

              <div style={styles.chartWrap}>
                <div style={styles.yaxis}>
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <div style={styles.bars}>
                  <Bar
                    h={`${approvalRate}%`}
                    color="#10b981"
                    label="Approved"
                    value={approved}
                  />

                  <Bar
                    h={`${rejectRate}%`}
                    color="#ef4444"
                    label="Rejected"
                    value={rejected}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div style={styles.tableBox}>
            <h3 style={styles.boxTitle}>
              AI Insights
            </h3>

            <table style={styles.table}>
              <tbody>
                <tr>
                  <td>Total Applications</td>
                  <td>{total}</td>
                </tr>

                <tr>
                  <td>Approved Loans</td>
                  <td>{approved}</td>
                </tr>

                <tr>
                  <td>Rejected Loans</td>
                  <td>{rejected}</td>
                </tr>

                <tr>
                  <td>High Risk Cases</td>
                  <td>{highRisk}</td>
                </tr>

                <tr>
                  <td>Approval Rate</td>
                  <td>{approvalRate}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CARD */
function Card({
  icon,
  title,
  value,
  color
}) {
  return (
    <div style={styles.card}>
      <div
        style={{
          fontSize: 20,
          color
        }}
      >
        {icon}
      </div>

      <h2 style={styles.value}>
        {value}
      </h2>

      <p>{title}</p>

      <div
        style={{
          height: 4,
          background: color,
          marginTop: 10,
          borderRadius: 10
        }}
      />
    </div>
  );
}

/* BAR */
function Bar({
  h,
  color,
  label,
  value
}) {
  return (
    <div style={styles.barItem}>
      <div style={styles.barBg}>
        <div
          style={{
            ...styles.barFill,
            height: h,
            background: color
          }}
        />
      </div>

      <small>{value}</small>
      <span>{label}</span>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6"
  },

  main: {
    flex: 1
  },

  content: {
    padding: 25
  },

  heading: {
    fontSize: 30,
    fontWeight: "700"
  },

  sub: {
    color: "#6b7280",
    marginBottom: 20
  },

  grid4: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: 16,
    marginBottom: 20
  },

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(420px,1fr))",
    gap: 16,
    marginBottom: 20
  },

  card: {
    background: "#fff",
    padding: 18,
    borderRadius: 14,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)"
  },

  value: {
    fontSize: 30,
    margin: "10px 0"
  },

  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)"
  },

  boxTitle: {
    marginBottom: 15
  },

  chartWrap: {
    display: "flex",
    gap: 12
  },

  yaxis: {
    display: "flex",
    flexDirection: "column",
    justifyContent:
      "space-between",
    height: 220,
    fontSize: 12,
    color: "#6b7280"
  },

  bars: {
    flex: 1,
    display: "flex",
    alignItems: "end",
    justifyContent:
      "space-around",
    height: 220,
    borderLeft:
      "1px solid #d1d5db",
    borderBottom:
      "1px solid #d1d5db",
    padding: "0 10px"
  },

  barItem: {
    textAlign: "center",
    width: 70
  },

  barBg: {
    height: 180,
    width: 40,
    background: "#e5e7eb",
    margin: "auto",
    display: "flex",
    alignItems: "end",
    borderRadius: 8,
    overflow: "hidden"
  },

  barFill: {
    width: "100%"
  },

  tableBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};

export default RiskAnalytics;