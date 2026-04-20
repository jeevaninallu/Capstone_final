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
  CartesianGrid,
  Legend
} from "recharts";

function Dashboard() {
  const [applications, setApplications] = useState([]);

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
    { name: "Low Risk", value: lowRisk },
    { name: "Medium Risk", value: mediumRisk },
    { name: "High Risk", value: highRisk }
  ];

  const barData = [
    {
      name: "Loans",
      Approved: approved,
      Rejected: rejected
    }
  ];

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Dashboard Overview
          </h1>

          <p style={styles.sub}>
            Real-time loan monitoring system
          </p>

          {/* Top Cards */}
          <div style={styles.cards}>
            <Card
              title="Total Applications"
              value={total}
              color="#2563eb"
            />

            <Card
              title="Approved Loans"
              value={approved}
              color="#16a34a"
            />

            <Card
              title="Rejected Loans"
              value={rejected}
              color="#dc2626"
            />
          </div>

          {/* Graph Section */}
          <div style={styles.grid}>
            {/* Pie */}
            <div style={styles.chartCard}>
              <h2 style={styles.chartTitle}>
                Risk Distribution
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
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
                Approval Analysis
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />
                  <YAxis />

                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="Approved"
                    fill="#16a34a"
                  />

                  <Bar
                    dataKey="Rejected"
                    fill="#dc2626"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent 10 Applications */}
          <div style={styles.tableCard}>
            <h2 style={styles.chartTitle}>
              Recent 10 Applications
            </h2>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Income</th>
                  <th style={styles.th}>Loan</th>
                  <th style={styles.th}>CIBIL</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Risk</th>
                </tr>
              </thead>

              <tbody>
                {applications
                  .slice(0, 10)
                  .map((item) => (
                    <tr key={item._id}>
                      <td style={styles.td}>
                        {item.applicationId}
                      </td>

                      <td style={styles.td}>
                        {item.date}
                      </td>

                      <td style={styles.td}>
                        ₹
                        {
                          item.formData
                            ?.income_annum
                        }
                      </td>

                      <td style={styles.td}>
                        ₹
                        {
                          item.formData
                            ?.loan_amount
                        }
                      </td>

                      <td style={styles.td}>
                        {
                          item.formData
                            ?.cibil_score
                        }
                      </td>

                      <td
                        style={{
                          ...styles.td,
                          color:
                            item.prediction ===
                            "Approved"
                              ? "green"
                              : "red",
                          fontWeight: "700"
                        }}
                      >
                        {item.prediction}
                      </td>

                      <td style={styles.td}>
                        {(
                          item.probability *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
    <div style={styles.card}>
      <h3>{title}</h3>

      <h1
        style={{
          color: color,
          marginTop: "12px"
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
    background: "#f3f4f6"
  },

  main: {
    flex: 1
  },

  content: {
    padding: "30px"
  },

  heading: {
    fontSize: "36px",
    fontWeight: "700"
  },

  sub: {
    color: "#6b7280",
    marginBottom: "25px"
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.05)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "25px",
    marginBottom: "30px"
  },

  chartCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.05)"
  },

  chartTitle: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "700"
  },

  tableCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.05)"
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    textAlign: "left"
  },

  th: {
    padding: "14px",
    background: "#f9fafb",
    borderBottom:
      "1px solid #e5e7eb"
  },

  td: {
    padding: "14px",
    borderBottom:
      "1px solid #f3f4f6"
  }
};

export default Dashboard;