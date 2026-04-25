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

  const [errorMsg, setErrorMsg] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [isMobile,
    setIsMobile] = useState(
      window.innerWidth < 900
    );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 900
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

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

    if (
      !form.email ||
      !form.password
    ) {
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
      {/* LEFT SIDE */}
      {!isMobile && (
        <div style={styles.left}>
          <div>
            <div style={styles.logo}>
              <ShieldCheck
                size={30}
                color="white"
              />
            </div>

            <h1 style={styles.brandTitle}>
              Loan Default Prediction
            </h1>

            <p style={styles.brandSub}>
              Banking platform for
              secure approvals,
              default risk review,
              and officer workflow.
            </p>

            <div
              style={
                styles.featureBox
              }
            >
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

            <p style={styles.footer}>
              © 2026 Secure Banking
              Portal
            </p>
          </div>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.loginTitle}>
            Hi, Welcome Back
          </h2>

          <p style={styles.loginSub}>
            Access your banking
            dashboard
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
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={{
                  cursor:
                    "pointer"
                }}
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

            <p
              style={
                styles.securityText
              }
            >
              Secure employee access
              portal
            </p>

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
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    gap: "10px"
                  }}
                >
                  <Loader2
                    size={18}
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
              <FcGoogle
                size={22}
              />
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
    borderRadius:
      "20px",
    background:
      "rgba(255,255,255,0.15)",
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    marginBottom:
      "24px"
  },

  brandTitle: {
    fontSize: "44px",
    fontWeight: "800",
    lineHeight: "1.15"
  },

  brandSub: {
    marginTop: "15px",
    fontSize: "18px",
    lineHeight: "1.6",
    color:
      "rgba(255,255,255,0.78)"
  },

  featureBox: {
    display: "grid",
    gap: "14px",
    marginTop: "28px"
  },

  feature: {
    display: "flex",
    alignItems:
      "center",
    gap: "12px",
    padding: "15px",
    borderRadius:
      "14px",
    background:
      "rgba(255,255,255,0.08)",
    fontWeight: "500",
    transition:
      "all 0.3s ease"
  },

  footer: {
    marginTop: "28px",
    fontSize: "14px",
    color:
      "rgba(255,255,255,0.6)"
  },

  right: {
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    padding: "30px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background:
      "linear-gradient(180deg,#ffffff,#f8fafc)",
    borderRadius:
      "24px",
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
      "14px"
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
      "16px",
    transition:
      "all 0.3s ease"
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    background:
      "transparent"
  },

  securityText: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom:
      "18px"
  },

  loginBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius:
      "14px",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition:
      "all 0.3s ease"
  },

  googleBtn: {
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    borderRadius:
      "14px",
    border:
      "1px solid #dbe2ea",
    background:
      "white",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    gap: "12px",
    fontSize: "16px",
    transition:
      "all 0.3s ease"
  }
};

export default Login;