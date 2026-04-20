import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] =
    useState({
      name: "Jeevani",
      email:
        "nallujeevanireddy@gmail.com"
    });

  const [password, setPassword] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

  const [darkMode, setDarkMode] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleProfileChange = (
    e
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value
    });
  };

  const handlePasswordChange = (
    e
  ) => {
    setPassword({
      ...password,
      [e.target.name]:
        e.target.value
    });
  };

  const saveProfile = () => {
    setMessage(
      "Profile updated successfully"
    );
  };

  const updatePassword = () => {
    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      setMessage(
        "Passwords do not match"
      );
      return;
    }

    setMessage(
      "Password updated successfully"
    );

    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Settings
      </h1>

      {message && (
        <div style={styles.alert}>
          {message}
        </div>
      )}

      {/* Profile */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Profile Settings
        </h2>

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={
            handleProfileChange
          }
          placeholder="Name"
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={
            handleProfileChange
          }
          placeholder="Email"
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </div>

      {/* Password */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Change Password
        </h2>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={
            password.oldPassword
          }
          onChange={
            handlePasswordChange
          }
          style={styles.input}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={
            password.newPassword
          }
          onChange={
            handlePasswordChange
          }
          style={styles.input}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={
            password.confirmPassword
          }
          onChange={
            handlePasswordChange
          }
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={
            updatePassword
          }
        >
          Update Password
        </button>
      </div>

      {/* Preferences */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Preferences
        </h2>

        <div
          style={styles.toggleRow}
        >
          <span>
            Dark Mode
          </span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(
                !darkMode
              )
            }
          />
        </div>
      </div>

      {/* Logout */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Account
        </h2>

        <button
          style={
            styles.logoutBtn
          }
          onClick={
            handleLogout
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background:
      "#f3f4f6",
    minHeight: "100vh"
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  alert: {
    background:
      "#d1fae5",
    color: "#065f46",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "600"
  },

  card: {
    background:
      "white",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)"
  },

  heading: {
    fontSize: "24px",
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px"
  },

  button: {
    padding:
      "12px 20px",
    background:
      "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  logoutBtn: {
    padding:
      "12px 20px",
    background:
      "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  toggleRow: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center"
  }
};

export default Settings;