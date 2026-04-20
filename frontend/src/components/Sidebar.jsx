// Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  History,
  ShieldAlert,
  BrainCircuit,
  Settings,
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
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />
    }
  ];

  return (
    <div
      style={{
        ...styles.sidebar,
        width: open ? "260px" : "85px"
      }}
    >
      <div style={styles.top}>
        {open && (
          <h2 style={styles.logo}>
            Loan Default
          </h2>
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
              ? "#dbeafe"
              : "transparent",
            color: isActive
              ? "#2563eb"
              : "#111827"
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
  );
}

const styles = {
  sidebar: {
    minHeight: "100vh",
    background: "white",
    borderRight:
      "1px solid #e5e7eb",
    padding: "20px",
    boxSizing: "border-box",
    transition: "0.3s"
  },

  top: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  logo: {
    color: "#1e3a8a",
    fontSize: "24px"
  },

  toggleBtn: {
    border: "none",
    background: "#eff6ff",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  link: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "13px",
    marginBottom: "10px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s"
  }
};

export default Sidebar;