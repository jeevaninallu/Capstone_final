const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= ROUTES =================

// Test Route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB Running (HTTP inside Docker)");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "MongoDB Connected Successfully"
  });
});

// Import Routes
const predictionRoutes = require("./routes/predictionRoutes");
app.use("/api", predictionRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/auth", require("./routes/authRoutes"));

// ================= SERVER =================
const PORT = 5001;

// IMPORTANT: 0.0.0.0 for Docker
app.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP Server running on port ${PORT}`);
});