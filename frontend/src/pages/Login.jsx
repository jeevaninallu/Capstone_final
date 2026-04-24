import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// ✅ ONLY CHANGE THESE IMPORTS AT TOP

import { FcGoogle } from "react-icons/fc";

import {
  Mail,
  Lock,
  Eye,
  ShieldCheck,
  Briefcase,
  FileCheck,
  Users,
  Landmark,
  ClipboardCheck
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(
        "/auth/login",
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

    setLoading(false);
  };

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

        login({
          name:
            result.user.displayName,
          email:
            result.user.email
        });

        navigate(
          "/dashboard"
        );
      } catch {
        setErrorMsg(
          "Google Login Failed"
        );
      }
    };

  return (
    <div style={styles.page}>
      {/* LEFT */}
      <div style={styles.left}>
        <div>
          <div style={styles.logo}>
            <ShieldCheck
              color="white"
              size={28}
            />
          </div>

          <h1 style={styles.brandTitle}>
            Loan Default Prediction
          </h1>

          <p style={styles.brandSub}>
            Smart internal banking
            system for secure loan
            approvals and risk review.
          </p>

          {/* NEW 5 BOXES */}
          <div style={styles.featureBox}>
            <Feature
              icon={
                <Briefcase
                  size={18}
                />
              }
              text="Bank Officer Access"
            />

            <Feature
              icon={
                <FileCheck
                  size={18}
                />
              }
              text="Loan Application Review"
            />

            <Feature
              icon={
                <Users
                  size={18}
                />
              }
              text="Risk Analysis"
            />

            <Feature
              icon={
                <Landmark
                  size={18}
                />
              }
              text="Branch Operations Panel"
            />

            <Feature
              icon={
                <ClipboardCheck
                  size={18}
                />
              }
              text="Approval Workflow System"
            />
          </div>
        </div>

        {/* BOTTOM CARD */}

      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.card}>
    
          <h2 style={styles.loginTitle}>
            Welcome Back
          </h2>

          <p style={styles.loginSub}>
            Access your banking dashboard
          </p>

          {errorMsg && (
            <div
              style={
                styles.error
              }
            >
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
          >
            <div
              style={
                styles.inputBox
              }
            >
              <Mail
                size={18}
                color="#64748b"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />
            </div>

            <div
              style={
                styles.inputBox
              }
            >
              <Lock
                size={18}
                color="#64748b"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />

              <Eye
                size={18}
                color="#64748b"
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
              style={
                styles.loginBtn
              }
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            <button
            type="button"
            style={styles.googleBtn}
            onClick={handleGoogleLogin}
>
            <FcGoogle size={22} />
            Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  text
}) {
  return (
    <div style={styles.feature}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)"
  },

  
left: {
  padding: "60px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
},
  logo: {
    width: "70px",
    height: "70px",
    borderRadius:
      "18px",
    background:
      "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    marginBottom:
      "25px"
  },

  brandTitle: {
  fontSize: "42px",
  fontWeight: "800",
  lineHeight: "1.15"
  },

  brandSub: {
    marginTop: "15px",
    color:
      "rgba(255,255,255,0.75)",
    fontSize: "18px"
  },

  featureBox: {
    display: "grid",
    gap: "14px",
    marginTop: "28px"
  },

  feature: {
    display: "flex",
    gap: "12px",
    alignItems:
      "center",
    background:
      "rgba(255,255,255,0.08)",
    padding: "14px",
    borderRadius:
      "14px",
    fontWeight: "500"
  },


  right: {
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background:
      "rgba(255,255,255,0.96)",
    borderRadius:
      "24px",
    padding: "38px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.25)"
  },

  loginTitle: {
    fontSize: "34px",
    fontWeight: "800"
  },

  loginSub: {
    color: "#64748b",
    marginTop: "8px",
    marginBottom:
      "24px"
  },

  error: {
    background:
      "#fee2e2",
    color:
      "#b91c1c",
    padding: "12px",
    borderRadius:
      "12px",
    marginBottom:
      "15px"
  },

  inputBox: {
    display: "flex",
    alignItems:
      "center",
    gap: "10px",
    border:
      "1px solid #dbe2ea",
    padding: "15px",
    borderRadius:
      "14px",
    marginBottom:
      "16px"
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    background:
      "transparent",
    fontSize: "15px"
  },

  loginBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    transition: "0.3s ease",
    borderRadius:
      "14px",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "6px"
  },

  googleBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #dbe2ea",
    background: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "16px",
    color: "#111827",
    transition: "0.3s"
  }

  };

export default Login;

