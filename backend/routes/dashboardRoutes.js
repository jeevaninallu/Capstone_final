const express = require("express");
const router = express.Router();

const {
  getDashboardData,
  deleteApplication
} = require("../controllers/dashboardController");

router.get("/", getDashboardData);
router.delete("/:id", deleteApplication);

module.exports = router;