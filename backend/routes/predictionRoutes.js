const express = require("express");
const router = express.Router();

const { predictLoan } = require("../controllers/predictionController");

router.post("/predict", predictLoan);

module.exports = router;