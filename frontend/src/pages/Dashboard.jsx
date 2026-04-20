// Dashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      if (res.data.success) {
        const sorted = res.data.applications.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setApplications(sorted);
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

  const lowRisk = applications.filter(
    (item) => item.probability <= 0.3
  ).length;

  const mediumRisk = applications.filter(
    (item) =>
      item.probability > 0.3 &&
      item.probability <= 0.7
  ).length;

  const highRisk = applications.filter(
    (item) => item.probability > 0.7
  ).length;

  const pieData = [
    { name: "Low", value: lowRisk },
    { name: "Medium", value: mediumRisk },
    { name: "High", value: highRisk }
  ];

  const poor = applications.filter(
    (item) => item.formData?.cibil_score < 550
  ).length;

  const average = applications.filter(
    (item) =>
      item.formData?.cibil_score >= 550 &&
      item.formData?.cibil_score < 700
  ).length;

  const good = applications.filter(
    (item) =>
      item.formData?.cibil_score >= 700 &&
      item.formData?.cibil_score < 800
  ).length;

  const excellent = applications.filter(
    (item) =>
      item.formData?.cibil_score >= 800
  ).length;

  const cibilData = [
    { name: "Poor", value: poor },
    { name: "Average", value: average },
    { name: "Good", value: good },
    { name: "Excellent", value: excellent }
  ];

  return (
    <div style={styles.layout}>
      <Sidebar open={open} setOpen={setOpen} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Dashboard Overview
          </h1>

          <p style={styles.sub}>
            Real-time loan monitoring system
          </p>

          {/* Cards */}
          <div style={styles.cards}>
            <Card
              title="Total Applications"
              value={total}
              color="#3b82f6"
            />

            <Card
              title="Approved Loans"
              value={approved}
              color="#22c55e"
            />

            <Card
              title="Rejected Loans"
              value={rejected}
              color="#ef4444"
            />
          </div>

          {/* Charts */}
          <div style={styles.grid}>
            {/* Pie */}
            <div style={styles.chartCard}>
              <h2 style={styles.chartTitle}>
                Risk Distribution
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={115}
                    label
                    isAnimationActive
                    animationDuration={1500}
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div style={styles.chartCard}>
              <h2 style={styles.chartTitle}>
                CIBIL Score Analysis
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={cibilData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                    barSize={55}
                    isAnimationActive
                    animationDuration={1600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div style={styles.tableCard}>
            <h2 style={styles.chartTitle}>
              Recent Applications
            </h2>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Income</th>
                    <th style={styles.th}>Loan</th>
                    <th style={styles.th}>CIBIL</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {applications
                    .slice(0, 10)
                    .map((item) => (
                      <tr
                        key={item._id}
                        style={styles.row}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "#f8fafc")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "white")
                        }
                      >
                        <td style={styles.td}>
                          {item.applicationId}
                        </td>

                        <td style={styles.td}>
                          {item.date}
                        </td>

                        <td style={styles.td}>
                          ₹
                          {Number(
                            item.formData?.income_annum
                          ).toLocaleString("en-IN")}
                        </td>

                        <td style={styles.td}>
                          ₹
                          {Number(
                            item.formData?.loan_amount
                          ).toLocaleString("en-IN")}
                        </td>

                        <td style={styles.td}>
                          {
                            item.formData?.cibil_score
                          }
                        </td>

                        <td
                          style={{
                            ...styles.td,
                            fontWeight: "700",
                            color:
                              item.prediction ===
                              "Approved"
                                ? "#16a34a"
                                : "#dc2626"
                          }}
                        >
                          {item.prediction}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color
}) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 10px 20px rgba(0,0,0,0.15)";
      }}
    >
      <p style={styles.cardTitle}>{title}</p>

      <h1
        style={{
          ...styles.cardValue,
          color
        }}
      >
        {value}
      </h1>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)"
  },

  main: {
    flex: 1
  },

  content: {
    padding: "22px 30px"
  },

  heading: {
    fontSize: "38px",
    fontWeight: "800",
    color: "white"
  },

  sub: {
    color: "rgba(255,255,255,0.75)",
    marginBottom: "24px"
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "20px",
    marginBottom: "28px"
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "24px",
    borderRadius: "18px",
    color: "white",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow:
      "0 10px 20px rgba(0,0,0,0.15)"
  },

  cardTitle: {
    fontSize: "16px"
  },

  cardValue: {
    fontSize: "34px",
    fontWeight: "800",
    marginTop: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "25px",
    marginBottom: "28px"
  },

  chartCard: {
    background: "#f8fbff",
    padding: "22px",
    borderRadius: "22px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.10)"
  },

  chartTitle: {
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  tableCard: {
    background: "white",
    padding: "25px",
    borderRadius: "22px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.10)"
  },

  tableWrapper: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse"
  },

  th: {
    padding: "14px",
    background: "#eff6ff",
    color: "#1e3a8a",
    textAlign: "left"
  },

  td: {
    padding: "14px",
    borderBottom:
      "1px solid #f1f5f9"
  },

  row: {
    transition: "0.3s"
  }
};

export default Dashboard;