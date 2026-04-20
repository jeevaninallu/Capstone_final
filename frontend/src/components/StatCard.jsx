function StatCard({ title, value, color }) {
  return (
    <div style={styles.card}>
      <div
        style={{
          ...styles.icon,
          background: color + "20",
          color: color
        }}
      >
        ●
      </div>

      <h2 style={styles.value}>{value}</h2>
      <p style={styles.title}>{title}</p>

      <div
        style={{
          ...styles.line,
          background: color
        }}
      />
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
    position: "relative"
  },

  icon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginBottom: "16px"
  },

  value: {
    margin: 0,
    fontSize: "34px",
    color: "#111827"
  },

  title: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "15px"
  },

  line: {
    marginTop: "18px",
    height: "4px",
    borderRadius: "10px",
    width: "100%"
  }
};

export default StatCard;