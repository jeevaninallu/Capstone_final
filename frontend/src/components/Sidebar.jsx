// Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  History,
  ShieldAlert,
  BrainCircuit,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function Sidebar({ open, setOpen }) {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "New Risk Assessment",
      path: "/assessment",
      icon: <FilePlus2 size={18} />
    },
    {
      name: "Applicant History",
      path: "/history",
      icon: <History size={18} />
    },
    {
      name: "Risk Analytics",
      path: "/analytics",
      icon: <ShieldAlert size={18} />
    },
    {
      name: "Model Insights",
      path: "/insights",
      icon: <BrainCircuit size={18} />
    }
  ];

  return (
    <div
      style={{
        ...styles.sidebar,
        width: open ? "260px" : "88px"
      }}
    >
      {/* TOP */}
      <div style={styles.top}>
        {open && (
          <div>
            <h2 style={styles.logo}>
              Loan Default
            </h2>

            <p style={styles.small}>
              AI Prediction
            </p>
          </div>
        )}

        <button
          style={styles.toggleBtn}
          onClick={() =>
            setOpen(!open)
          }
        >
          {open ? (
            <ChevronLeft size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>

      {/* MENU */}
      <div style={styles.menuWrap}>
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.link,
              justifyContent: open
                ? "flex-start"
                : "center",
              background: isActive
                ? "#2563eb"
                : "transparent",
              color: isActive
                ? "white"
                : "#334155"
            })}
          >
            {item.icon}

            {open && (
              <span>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    minHeight: "100vh",
    background:
      "rgba(255,255,255,0.92)",
    backdropFilter: "blur(14px)",
    borderRight:
      "1px solid #dbeafe",
    padding: "18px",
    boxSizing: "border-box",
    transition: "0.3s ease",
    boxShadow:
      "8px 0 24px rgba(37,99,235,0.06)"
  },

  top: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "28px"
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "#1e3a8a"
  },

  small: {
    margin: 0,
    marginTop: "3px",
    fontSize: "12px",
    color: "#64748b"
  },

  toggleBtn: {
    border: "none",
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 8px 18px rgba(37,99,235,0.25)"
  },

  menuWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 14px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.25s ease"
  }
};

export default Sidebar;