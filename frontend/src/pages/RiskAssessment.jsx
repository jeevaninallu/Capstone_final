// RiskAssessment.jsx

import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function RiskAssessment() {
  const [open, setOpen] = useState(true);

  const [formData, setFormData] = useState({
    no_of_dependents: "",
    education: "0",
    self_employed: "0",
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await API.post(
        "/predict",
        formData
      );

      const data = response.data.data;

      setResult({
        status: data.prediction,
        probability: data.probability
      });
    } catch (error) {
      alert("Prediction API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar open={open} setOpen={setOpen} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>
            New Risk Assessment
          </h1>

          <p style={styles.sub}>
            Enter applicant details for AI-powered loan prediction
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={styles.card}>
            <div style={styles.grid}>
              <Input
                label="Dependents"
                name="no_of_dependents"
                value={formData.no_of_dependents}
                onChange={handleChange}
              />

              <Select
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                options={[
                  { value: "0", text: "Graduate" },
                  { value: "1", text: "Not Graduate" }
                ]}
              />

              <Select
                label="Self Employed"
                name="self_employed"
                value={formData.self_employed}
                onChange={handleChange}
                options={[
                  { value: "0", text: "No" },
                  { value: "1", text: "Yes" }
                ]}
              />

              <Input
                label="Annual Income"
                name="income_annum"
                value={formData.income_annum}
                onChange={handleChange}
              />

              <Input
                label="Loan Amount"
                name="loan_amount"
                value={formData.loan_amount}
                onChange={handleChange}
              />

              <Input
                label="Loan Term"
                name="loan_term"
                value={formData.loan_term}
                onChange={handleChange}
              />

              <Input
                label="CIBIL Score"
                name="cibil_score"
                value={formData.cibil_score}
                onChange={handleChange}
              />

              <Input
                label="Residential Assets"
                name="residential_assets_value"
                value={formData.residential_assets_value}
                onChange={handleChange}
              />

              <Input
                label="Commercial Assets"
                name="commercial_assets_value"
                value={formData.commercial_assets_value}
                onChange={handleChange}
              />

              <Input
                label="Luxury Assets"
                name="luxury_assets_value"
                value={formData.luxury_assets_value}
                onChange={handleChange}
              />

              <Input
                label="Bank Assets"
                name="bank_asset_value"
                value={formData.bank_asset_value}
                onChange={handleChange}
              />
            </div>

            <button type="submit" style={styles.button}>
              {loading ? "Predicting..." : "Predict Risk"}
            </button>
          </form>

          {/* RESULT */}
          {result && (
            <div style={styles.resultBox}>
              <h2 style={styles.resultHeading}>
                Prediction Result
              </h2>

              <div style={styles.resultGrid}>
                <ResultCard
                  title="Loan Status"
                  value={result.status}
                  color={
                    result.status === "Approved"
                      ? "#16a34a"
                      : "#ef4444"
                  }
                />

                <ResultCard
                  title="Risk Probability"
                  value={`${(
                    result.probability * 100
                  ).toFixed(2)}%`}
                  color="#2563eb"
                />

                <ResultCard
                  title="Risk Level"
                  value={
                    result.probability < 0.35
                      ? "Low"
                      : result.probability < 0.65
                      ? "Medium"
                      : "High"
                  }
                  color={
                    result.probability < 0.35
                      ? "#16a34a"
                      : result.probability < 0.65
                      ? "#f59e0b"
                      : "#ef4444"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange
}) {
  return (
    <div>
      <label style={styles.label}>
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required
        style={styles.input}
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options
}) {
  return (
    <div>
      <label style={styles.label}>
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      >
        {options.map((item, index) => (
          <option
            key={index}
            value={item.value}
          >
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({
  title,
  value,
  color
}) {
  return (
    <div style={styles.resultCard}>
      <p style={styles.resultLabel}>
        {title}
      </p>

      <h2 style={{ color }}>
        {value}
      </h2>
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
    marginBottom: "28px",
    fontSize: "18px"
  },

  card: {
    background:
      "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "24px",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#1e3a8a"
  },

  input: {
    width: "100%",
    padding: "13px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none"
  },

  button: {
    marginTop: "28px",
    width: "100%",
    padding: "15px",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "28px",
    background:
      "rgba(255,255,255,0.96)",
    padding: "28px",
    borderRadius: "24px",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.08)"
  },

  resultHeading: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827"
  },

  resultGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px"
  },

  resultCard: {
    background: "#eff6ff",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "center"
  },

  resultLabel: {
    color: "#64748b",
    marginBottom: "10px",
    fontWeight: "600"
  }
};

export default RiskAssessment;