import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  Mail,
  Lock,
  Eye,
  ShieldCheck
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

    setErrorMsg("");
  };

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =
        await axios.post(
          "http://localhost:5000/api/auth/login",
          form
        );

      if (res.data.success) {
        login(res.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  // Google Login
  const handleGoogleLogin =
    async () => {
      try {
        const provider =
          new GoogleAuthProvider();

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;

        login({
          name:
            user.displayName,
          email:
            user.email
        });

        navigate(
          "/dashboard"
        );
      } catch (error) {
        setErrorMsg(
          "Google Login Failed"
        );
      }
    };

  return (
    <div style={styles.page}>
      <div style={styles.topSection}>
        <div style={styles.logoBox}>
          <ShieldCheck
            size={28}
            color="white"
          />
        </div>

        <h1 style={styles.mainTitle}>
          Loan Default Prediction
        </h1>

        <p style={styles.subTitle}>
          Secure Authentication System
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.loginTitle}>
          Login
        </h2>

        <p style={styles.loginSub}>
          Enter your credentials
        </p>

        {errorMsg && (
          <div style={styles.errorBox}>
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >
          <label style={styles.label}>
            Email
          </label>

          <div style={styles.inputBox}>
            <Mail
              size={18}
              color="#6b7280"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={
                handleChange
              }
              style={
                styles.input
              }
            />
          </div>

          <label style={styles.label}>
            Password
          </label>

          <div style={styles.inputBox}>
            <Lock
              size={18}
              color="#6b7280"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={
                handleChange
              }
              style={
                styles.input
              }
            />

            <Eye
              size={18}
              color="#6b7280"
              style={{
                cursor:
                  "pointer"
              }}
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />
          </div>

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

          <button
            type="button"
            style={
              styles.googleBtn
            }
            onClick={
              handleGoogleLogin
            }
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },

  topSection: {
    textAlign: "center",
    marginBottom: "20px"
  },

  logoBox: {
    width: "65px",
    height: "65px",
    borderRadius: "16px",
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin:
      "0 auto 14px auto"
  },

  mainTitle: {
    fontSize: "34px",
    fontWeight: "700"
  },

  subTitle: {
    color: "#6b7280"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "white",
    borderRadius: "18px",
    padding: "30px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"
  },

  loginTitle: {
    fontSize: "30px",
    marginBottom: "8px"
  },

  loginSub: {
    color: "#6b7280",
    marginBottom: "20px"
  },

  errorBox: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    fontWeight: "600",
    textAlign: "center"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "14px",
    fontWeight: "600"
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border:
      "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "12px"
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%"
  },

  button: {
    width: "100%",
    marginTop: "22px",
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background: "#1e3a8a",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  googleBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "13px",
    borderRadius: "12px",
    border:
      "1px solid #d1d5db",
    background: "white",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default Login;