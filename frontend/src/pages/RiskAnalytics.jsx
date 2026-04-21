// RiskAnalytics.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function RiskAnalytics() {
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(
        "/dashboard"
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

  const approvalRate =
    total > 0
      ? ((approved / total) * 100).toFixed(1)
      : 0;

  const rejectRate =
    total > 0
      ? ((rejected / total) * 100).toFixed(1)
      : 0;

  // DAILY TREND CHART
  const trendMap = {};

  applications.forEach((item) => {
    const date =
      item.date?.split(",")[0] || "Today";

    trendMap[date] = (trendMap[date] || 0) + 1;
  });

  const trendData = Object.keys(trendMap).map(
    (key) => ({
      date: key,
      applications: trendMap[key]
    })
  );

  // DONUT CHART
  const donutData = [
    {
      name: "Approved",
      value: approved
    },
    {
      name: "Rejected",
      value: rejected
    }
  ];

  return (
    <div style={styles.layout}>
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Risk Analytics
          </h1>

          <p style={styles.sub}>
            Live AI loan analytics dashboard
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
              color="#16a34a"
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
            {/* LINE CHART */}
            <div style={styles.box}>
              <h3 style={styles.boxTitle}>
                Daily Application Trend
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart
                  data={trendData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#2563eb"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      fill: "#2563eb"
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* DONUT */}
            <div style={styles.box}>
              <h3 style={styles.boxTitle}>
                Approval Ratio
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    label
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* INSIGHTS */}
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
          fontSize: 22,
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
          marginTop: 10,
          borderRadius: 20,
          background: color
        }}
      />
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
    padding: "30px"
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "white"
  },

  sub: {
    color:
      "rgba(255,255,255,0.9)",
    fontSize: "18px",
    marginBottom: "24px"
  },

  grid4: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    marginBottom: "24px"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(420px,1fr))",
    gap: "20px",
    marginBottom: "24px"
  },

  card: {
    background:
      "rgba(255,255,255,0.95)",
    padding: "22px",
    borderRadius: "22px",
    boxShadow:
      "0 12px 28px rgba(0,0,0,0.08)"
  },

  value: {
    fontSize: "34px",
    margin: "10px 0",
    fontWeight: "800"
  },

  box: {
    background:
      "rgba(255,255,255,0.95)",
    padding: "24px",
    borderRadius: "24px",
    boxShadow:
      "0 12px 28px rgba(0,0,0,0.08)"
  },

  boxTitle: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "16px"
  },

  tableBox: {
    background:
      "rgba(255,255,255,0.95)",
    padding: "24px",
    borderRadius: "24px",
    boxShadow:
      "0 12px 28px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    lineHeight: "2.4"
  }
};

export default RiskAnalytics;