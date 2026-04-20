import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function RiskAssessment() {
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
      const response = await axios.post(
        "http://localhost:5000/api/predict",
        formData
      );

      console.log(response.data);

      const resultData = response.data.data;

      setResult({
        status: resultData.prediction,
        probability: resultData.probability
      });
    } catch (error) {
      console.log(error);
      alert("Prediction API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.heading}>New Risk Assessment</h1>

          <p style={styles.sub}>
            Enter applicant loan details for AI-powered prediction
          </p>

          <form onSubmit={handleSubmit} style={styles.card}>
            <div style={styles.grid}>
              <Input label="Dependents" name="no_of_dependents" value={formData.no_of_dependents} onChange={handleChange} />
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

              <Input label="Annual Income" name="income_annum" value={formData.income_annum} onChange={handleChange} />
              <Input label="Loan Amount" name="loan_amount" value={formData.loan_amount} onChange={handleChange} />
              <Input label="Loan Term" name="loan_term" value={formData.loan_term} onChange={handleChange} />
              <Input label="CIBIL Score" name="cibil_score" value={formData.cibil_score} onChange={handleChange} />
              <Input label="Residential Assets" name="residential_assets_value" value={formData.residential_assets_value} onChange={handleChange} />
              <Input label="Commercial Assets" name="commercial_assets_value" value={formData.commercial_assets_value} onChange={handleChange} />
              <Input label="Luxury Assets" name="luxury_assets_value" value={formData.luxury_assets_value} onChange={handleChange} />
              <Input label="Bank Assets" name="bank_asset_value" value={formData.bank_asset_value} onChange={handleChange} />
            </div>

            <button type="submit" style={styles.button}>
              {loading ? "Predicting..." : "Predict Risk"}
            </button>
          </form>

          {result && (
            <div style={styles.resultBox}>
              <h2 style={{ marginBottom: "20px" }}>Prediction Result</h2>

              <div style={styles.resultGrid}>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Loan Status</p>

                  <h2
                    style={{
                      color:
                        result.status === "Approved"
                          ? "#10b981"
                          : "#ef4444"
                    }}
                  >
                    {result.status}
                  </h2>
                </div>

                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Risk Probability</p>

                  <h2 style={{ color: "#2563eb" }}>
                    {(result.probability * 100).toFixed(2)}%
                  </h2>
                </div>

                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Risk Level</p>

                  <h2
                    style={{
                      color:
                        result.probability < 0.35
                          ? "#10b981"
                          : result.probability < 0.65
                          ? "#f59e0b"
                          : "#ef4444"
                    }}
                  >
                    {result.probability < 0.35
                      ? "Low"
                      : result.probability < 0.65
                      ? "Medium"
                      : "High"}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
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

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  layout: { display: "flex", minHeight: "100vh", background: "#f3f4f6" },
  main: { flex: 1 },
  content: { padding: "30px" },
  heading: { marginBottom: "8px" },
  sub: { color: "#6b7280", marginBottom: "22px" },
  card: {
    background: "white",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "18px"
  },
  label: { display: "block", marginBottom: "8px", fontWeight: "600" },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px"
  },
  button: {
    marginTop: "24px",
    width: "100%",
    padding: "14px",
    background: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },
  resultBox: {
    marginTop: "24px",
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px"
  },
  resultCard: {
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center"
  },
  resultLabel: { color: "#6b7280", marginBottom: "10px" }
};

export default RiskAssessment;