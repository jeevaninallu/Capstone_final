const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "MongoDB Connected Successfully"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const predictionRoutes = require("./routes/predictionRoutes");

app.use("/api", predictionRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});