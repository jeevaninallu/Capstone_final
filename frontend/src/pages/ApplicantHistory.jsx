// ApplicantHistory.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ApplicantHistory() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchHistory();

    const interval = setInterval(() => {
      fetchHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get(
        "/dashboard"
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
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await API.delete(
        `/dashboard/${id}`
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
      <Sidebar open={open} setOpen={setOpen} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            Applicant History
          </h1>

          <p style={styles.sub}>
            View all submitted loan applications
          </p>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by Application ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />

          {/* TABLE */}
          <div style={styles.card}>
            <div style={styles.tableWrap}>
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
                    <th style={styles.th}>Action</th>
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
                      <tr
                        key={item._id}
                        style={styles.row}
                      >
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
                          {Number(
                            item.formData
                              ?.income_annum
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td style={styles.td}>
                          ₹
                          {Number(
                            item.formData
                              ?.loan_amount
                          ).toLocaleString(
                            "en-IN"
                          )}
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
    color: "white",
    marginBottom: "8px"
  },

  sub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "18px",
    marginBottom: "22px"
  },

  search: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    marginBottom: "22px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.08)"
  },

  card: {
    background:
      "rgba(255,255,255,0.95)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)"
  },

  tableWrap: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    textAlign: "left",
    padding: "16px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "800",
    borderBottom:
      "1px solid #dbeafe"
  },

  td: {
    padding: "16px",
    borderBottom:
      "1px solid #eef2ff",
    color: "#111827"
  },

  row: {
    transition: "0.3s"
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b",
    fontWeight: "600"
  },

  badge: {
    padding: "7px 14px",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: "700"
  },

  deleteBtn: {
    background:
      "linear-gradient(90deg,#ef4444,#dc2626)",
    color: "white",
    border: "none",
    padding: "9px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  }
};

export default ApplicantHistory;