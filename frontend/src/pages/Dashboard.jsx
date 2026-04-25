import { useEffect, useState } from "react";
import API from "../services/api";
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
  const [applications, setApplications] =
    useState([]);

  const [open, setOpen] =
    useState(true);

  useEffect(() => {
    fetchDashboard();

    const interval =
      setInterval(() => {
        fetchDashboard();
      }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await API.get(
            "/dashboard"
          );

        if (
          res.data.success
        ) {
          const sorted =
            res.data.applications.sort(
              (
                a,
                b
              ) =>
                new Date(
                  b.createdAt
                ) -
                new Date(
                  a.createdAt
                )
            );

          setApplications(
            sorted
          );
        }
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const total =
    applications.length;

  const approved =
    applications.filter(
      (
        item
      ) =>
        item.prediction ===
        "Approved"
    ).length;

  const rejected =
    applications.filter(
      (
        item
      ) =>
        item.prediction ===
        "Rejected"
    ).length;

  const lowRisk =
    applications.filter(
      (
        item
      ) =>
        item.probability <=
        0.3
    ).length;

  const mediumRisk =
    applications.filter(
      (
        item
      ) =>
        item.probability >
          0.3 &&
        item.probability <=
          0.7
    ).length;

  const highRisk =
    applications.filter(
      (
        item
      ) =>
        item.probability >
        0.7
    ).length;

  const pieData = [
    {
      name: "Low",
      value: lowRisk
    },
    {
      name: "Medium",
      value: mediumRisk
    },
    {
      name: "High",
      value: highRisk
    }
  ];

  const poor =
    applications.filter(
      (
        item
      ) =>
        item.formData
          ?.cibil_score <
        550
    ).length;

  const average =
    applications.filter(
      (
        item
      ) =>
        item.formData
          ?.cibil_score >=
          550 &&
        item.formData
          ?.cibil_score <
          700
    ).length;

  const good =
    applications.filter(
      (
        item
      ) =>
        item.formData
          ?.cibil_score >=
          700 &&
        item.formData
          ?.cibil_score <
          800
    ).length;

  const excellent =
    applications.filter(
      (
        item
      ) =>
        item.formData
          ?.cibil_score >=
        800
    ).length;

  const cibilData = [
    {
      name: "Poor",
      value: poor
    },
    {
      name: "Average",
      value: average
    },
    {
      name: "Good",
      value: good
    },
    {
      name: "Excellent",
      value: excellent
    }
  ];

  return (
    <div style={styles.layout}>
      <Sidebar
        open={open}
        setOpen={
          setOpen
        }
      />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <div
            style={
              styles.headerRow
            }
          >
            <div>
              <h1
                style={
                  styles.heading
                }
              >
                Dashboard
                Overview
              </h1>

              <p
                style={
                  styles.sub
                }
              >
                Real-time
                loan
                monitoring
                system
              </p>
            </div>
          </div>

          {/* KPI Cards */}
          <div
            style={
              styles.cards
            }
          >
            <Card
              title="Total Applications"
              value={total}
              color="#3b82f6"
            />

            <Card
              title="Approved Loans"
              value={
                approved
              }
              color="#22c55e"
            />

            <Card
              title="Rejected Loans"
              value={
                rejected
              }
              color="#ef4444"
            />

            <Card
              title="Approval Rate"
              value={`${total
                ? Math.round(
                    (approved /
                      total) *
                      100
                  )
                : 0}%`}
              color="#f59e0b"
            />
          </div>

          {/* Charts */}
          <div
            style={
              styles.grid
            }
          >
            <div
              style={
                styles.chartCard
              }
            >
              <h2
                style={
                  styles.chartTitle
                }
              >
                Risk Distribution
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                  <Pie
                    data={
                      pieData
                    }
                    dataKey="value"
                    innerRadius={
                      60
                    }
                    outerRadius={
                      110
                    }
                    paddingAngle={
                      4
                    }
                    label
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div
              style={
                styles.chartCard
              }
            >
              <h2
                style={
                  styles.chartTitle
                }
              >
                CIBIL Score
                Analysis
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart
                  data={
                    cibilData
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[
                      8,
                      8,
                      0,
                      0
                    ]}
                    barSize={
                      48
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div
            style={
              styles.tableCard
            }
          >
            <div
              style={
                styles.tableTop
              }
            >
              <h2
                style={
                  styles.chartTitle
                }
              >
                Recent
                Applications
              </h2>

              <span
                style={
                  styles.badge
                }
              >
                {applications.length}{" "}
                Records
              </span>
            </div>

            <div
              style={
                styles.tableWrapper
              }
            >
              <table
                style={
                  styles.table
                }
              >
                <thead>
                  <tr>
                    <th
                      style={
                        styles.th
                      }
                    >
                      ID
                    </th>
                    <th
                      style={
                        styles.th
                      }
                    >
                      Date
                    </th>
                    <th
                      style={
                        styles.th
                      }
                    >
                      Income
                    </th>
                    <th
                      style={
                        styles.th
                      }
                    >
                      Loan
                    </th>
                    <th
                      style={
                        styles.th
                      }
                    >
                      CIBIL
                    </th>
                    <th
                      style={
                        styles.th
                      }
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications
                    .slice(
                      0,
                      10
                    )
                    .map(
                      (
                        item
                      ) => (
                        <tr
                          key={
                            item._id
                          }
                          style={
                            styles.row
                          }
                        >
                          <td
                            style={
                              styles.td
                            }
                          >
                            {
                              item.applicationId
                            }
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            {
                              item.date
                            }
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            ₹
                            {Number(
                              item
                                .formData
                                ?.income_annum
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            ₹
                            {Number(
                              item
                                .formData
                                ?.loan_amount
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            {
                              item
                                .formData
                                ?.cibil_score
                            }
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            <span
                              style={{
                                ...styles.status,
                                background:
                                  item.prediction ===
                                  "Approved"
                                    ? "#dcfce7"
                                    : "#fee2e2",
                                color:
                                  item.prediction ===
                                  "Approved"
                                    ? "#15803d"
                                    : "#dc2626"
                              }}
                            >
                              {
                                item.prediction
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )}
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
    <div style={styles.card}>
      <p
        style={
          styles.cardTitle
        }
      >
        {title}
      </p>

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
    padding: "24px 28px"
  },

  headerRow: {
    marginBottom:
      "24px"
  },

  heading: {
    fontSize: "52px",
    fontWeight: "800",
    color: "white",
    margin: 0
  },

  sub: {
    color:
      "rgba(255,255,255,0.75)",
    fontSize: "18px",
    marginTop: "6px"
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "18px",
    marginBottom:
      "28px"
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "24px",
    borderRadius:
      "20px",
    boxShadow:
      "0 12px 24px rgba(0,0,0,0.14)"
  },

  cardTitle: {
    color: "white",
    fontSize: "16px"
  },

  cardValue: {
    fontSize: "38px",
    fontWeight: "800",
    marginTop: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "22px",
    marginBottom:
      "28px"
  },

  chartCard: {
    background:
      "white",
    borderRadius:
      "24px",
    padding: "24px",
    boxShadow:
      "0 14px 30px rgba(0,0,0,0.10)"
  },

  chartTitle: {
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "12px"
  },

  tableCard: {
    background:
      "white",
    borderRadius:
      "24px",
    padding: "24px",
    boxShadow:
      "0 14px 30px rgba(0,0,0,0.10)"
  },

  tableTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    marginBottom:
      "14px"
  },

  badge: {
    background:
      "#eff6ff",
    color: "#1d4ed8",
    padding:
      "8px 12px",
    borderRadius:
      "999px",
    fontSize: "13px",
    fontWeight: "700"
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
    textAlign: "left",
    padding: "14px",
    background:
      "#f8fafc",
    color: "#1e3a8a",
    fontWeight: "700"
  },

  td: {
    padding: "14px",
    borderBottom:
      "1px solid #f1f5f9"
  },

  row: {
    transition:
      "0.3s"
  },

  status: {
    padding:
      "6px 12px",
    borderRadius:
      "999px",
    fontWeight: "700",
    fontSize: "13px"
  }
};

export default Dashboard;