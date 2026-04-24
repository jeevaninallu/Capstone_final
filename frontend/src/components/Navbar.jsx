import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const { logout } =
    useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  return (
    <div style={styles.navbar}>
      {/* LEFT */}
      <div>
        <h2 style={styles.title}>
          Welcome Back
        </h2>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <p style={styles.date}>
          {today}
        </p>

        <button
          style={styles.btn}
          onClick={
            handleLogout
          }
        >
          <LogOut
            size={16}
          />
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background:
      "linear-gradient(90deg,#0f172a,#1e3a8a)",
    padding: "18px 28px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.12)"
  },

  title: {
    margin: 0,
    color: "white",
    fontSize: "30px",
    fontWeight: "800"
  },

  subTitle: {
    margin: "4px 0 0 0",
    color:
      "rgba(255,255,255,0.75)",
    fontSize: "14px"
  },

  right: {
    display: "flex",
    alignItems:
      "center",
    gap: "14px"
  },

  date: {
    margin: 0,
    color:
      "rgba(255,255,255,0.75)",
    fontSize: "14px",
    fontWeight: "500"
  },

  btn: {
    background:
      "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems:
      "center",
    gap: "8px",
    transition:
      "0.3s ease"
  }
};

export default Navbar;