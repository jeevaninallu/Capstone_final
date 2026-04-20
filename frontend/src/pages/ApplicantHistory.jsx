// ApplicantHistory.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ApplicantHistory() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();

    const interval = setInterval(() => {
      fetchHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      if (res.data.success) {
        const sorted =
          res.data.applications.sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          );

        setApplications(sorted);
      }
    } catch (error) {
      console.log("History Error:", error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/dashboard/${id}`
      );

      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = applications.filter((item) =>
    item.applicationId
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Applicant History
          </h1>

          <p style={styles.sub}>
            View all submitted loan
            applications
          </p>

          <input
            type="text"
            placeholder="Search by Application ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />

          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>
                    Date
                  </th>
                  <th style={styles.th}>
                    Income
                  </th>
                  <th style={styles.th}>
                    Loan
                  </th>
                  <th style={styles.th}>
                    CIBIL
                  </th>
                  <th style={styles.th}>
                    Status
                  </th>
                  <th style={styles.th}>
                    Risk
                  </th>
                  <th style={styles.th}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      style={styles.empty}
                    >
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id}>
                      <td style={styles.td}>
                        {
                          item.applicationId
                        }
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

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            background:
                              item.prediction ===
                              "Approved"
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              item.prediction ===
                              "Approved"
                                ? "#166534"
                                : "#991b1b"
                          }}
                        >
                          {
                            item.prediction
                          }
                        </span>
                      </td>

                      <td style={styles.td}>
                        {(
                          item.probability *
                          100
                        ).toFixed(2)}
                        %
                      </td>

                      <td style={styles.td}>
                        <button
                          style={
                            styles.deleteBtn
                          }
                          onClick={() =>
                            deleteRecord(
                              item._id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    fontWeight: "700",
    marginBottom: "8px"
  },

  sub: {
    color: "#6b7280",
    marginBottom: "20px"
  },

  search: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    marginBottom: "20px",
    fontSize: "15px"
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "20px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.05)",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    textAlign: "left",
    padding: "14px",
    background: "#f9fafb",
    borderBottom:
      "1px solid #e5e7eb",
    fontWeight: "700"
  },

  td: {
    padding: "14px",
    borderBottom:
      "1px solid #f3f4f6"
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#6b7280"
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default ApplicantHistory;