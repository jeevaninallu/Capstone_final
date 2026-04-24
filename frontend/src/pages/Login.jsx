import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Briefcase,
  FileCheck,
  Users,
  Landmark,
  ClipboardCheck,
  Loader2
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 900
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

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

    if (!form.email || !form.password) {
      setErrorMsg(
        "Please fill all fields"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      if (res.data.success) {
        login(res.data.user);

        if (remember) {
          localStorage.setItem(
            "savedEmail",
            form.email
          );
        }

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
    <div
      style={{
        ...styles.page,
        gridTemplateColumns:
          isMobile
            ? "1fr"
            : "1fr 1fr"
      }}
    >
      {/* LEFT */}
      {!isMobile && (
        <div style={styles.left}>
          <div>
            <div style={styles.logo}>
              <ShieldCheck
                color="white"
                size={30}
              />
            </div>

            <h1 style={styles.brandTitle}>
              Loan Default Prediction
            </h1>

            <p style={styles.brandSub}>
              AI-powered internal
              banking platform for
              secure approvals,
              default risk review,
              and officer workflow.
            </p>

            <div style={styles.featureBox}>
              <Feature
                icon={
                  <Briefcase size={18} />
                }
                text="Bank Officer Access"
              />

              <Feature
                icon={
                  <FileCheck size={18} />
                }
                text="Loan Application Review"
              />

              <Feature
                icon={
                  <Users size={18} />
                }
                text="Risk Analysis"
              />

              <Feature
                icon={
                  <Landmark size={18} />
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

            <div style={styles.footer}>
              © 2026 Secure Banking
              Portal
            </div>
          </div>
        </div>
      )}

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.loginTitle}>
            Welcome Back
          </h2>

          <p style={styles.loginSub}>
            Access your banking
            dashboard
          </p>

          {errorMsg && (
            <div style={styles.error}>
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
          >
            {/* EMAIL */}
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

            {/* PASSWORD */}
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

              <div
                style={{
                  cursor:
                    "pointer"
                }}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    color="#64748b"
                  />
                ) : (
                  <Eye
                    size={18}
                    color="#64748b"
                  />
                )}
              </div>
            </div>

            {/* OPTIONS */}
            <div
              style={
                styles.optionsRow
              }
            >
              <label
                style={
                  styles.checkboxRow
                }
              >
                <input
                  type="checkbox"
                  checked={
                    remember
                  }
                  onChange={() =>
                    setRemember(
                      !remember
                    )
                  }
                />
                Remember me
              </label>

              <span
                style={
                  styles.forgot
                }
              >
                Forgot Password?
              </span>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              style={
                styles.loginBtn
              }
            >
              {loading ? (
                <span
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    justifyContent:
                      "center"
                  }}
                >
                  <Loader2
                    size={18}
                    className="spin"
                  />
                  Signing In...
                </span>
              ) : (
                "Login"
              )}
            </button>

            {/* GOOGLE */}
            <button
              type="button"
              style={
                styles.googleBtn
              }
              onClick={
                handleGoogleLogin
              }
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
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)"
  },

  left: {
    padding: "60px",
    color: "white",
    display: "flex",
    alignItems: "center"
  },

  logo: {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.15)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    marginBottom: "24px"
  },

  brandTitle: {
    fontSize: "44px",
    fontWeight: "800",
    lineHeight: "1.15"
  },

  brandSub: {
    marginTop: "15px",
    color:
      "rgba(255,255,255,0.78)",
    fontSize: "18px",
    lineHeight: "1.6"
  },

  featureBox: {
    display: "grid",
    gap: "14px",
    marginTop: "28px"
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    borderRadius: "14px",
    background:
      "rgba(255,255,255,0.08)",
    fontWeight: "500",
    transition: "0.3s"
  },

  footer: {
    marginTop: "30px",
    color:
      "rgba(255,255,255,0.6)",
    fontSize: "14px"
  },

  right: {
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    padding: "30px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background:
      "rgba(255,255,255,0.97)",
    borderRadius: "24px",
    padding: "38px",
    boxShadow:
      "0 25px 60px rgba(0,0,0,0.25)"
  },

  loginTitle: {
    fontSize: "34px",
    fontWeight: "800"
  },

  loginSub: {
    color: "#64748b",
    marginTop: "8px",
    marginBottom: "24px"
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "14px"
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border:
      "1px solid #dbe2ea",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "16px",
    transition: "0.3s"
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    background:
      "transparent"
  },

  optionsRow: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "18px",
    fontSize: "14px"
  },

  checkboxRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    color: "#475569"
  },

  forgot: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600"
  },

  loginBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  },

  googleBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border:
      "1px solid #dbe2ea",
    background: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "12px",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px"
  }
};

export default Login;