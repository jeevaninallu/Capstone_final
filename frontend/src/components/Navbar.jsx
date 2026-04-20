import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={{ margin: 0 }}>Dashboard</h2>

      <button style={styles.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    background: "white",
    padding: "18px 25px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  btn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default Navbar;