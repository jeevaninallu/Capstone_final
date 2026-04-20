import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "New Risk Assessment", path: "/assessment" },
    { name: "Applicant History", path: "/history" },
    { name: "Risk Analytics", path: "/analytics" },
    { name: "Model Insights", path: "/insights" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Loan Default</h2>

      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? "#dbeafe" : "transparent",
            color: isActive ? "#1d4ed8" : "#111827"
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background: "white",
    borderRight: "1px solid #e5e7eb",
    padding: "20px",
    boxSizing: "border-box"
  },

  logo: {
    marginBottom: "25px",
    color: "#1e3a8a"
  },

  link: {
    display: "block",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Sidebar;