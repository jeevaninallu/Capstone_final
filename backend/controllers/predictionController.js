const axios = require("axios");
const Application = require("../models/Application");

// ===============================
// PREDICT LOAN + SAVE RECORD
// ===============================
exports.predictLoan = async (req, res) => {
  try {
    const formData = req.body;

    // Send data to Flask ML Service
    const response = await axios.post(
      "http://ml_service:8000/predict",
      formData
    );

    const result = response.data;

    // If ML service failed
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Prediction Failed"
      });
    }

    // Save prediction to MongoDB
    const newApp = new Application({
      applicationId: "APP-" + Date.now(),
      date: new Date().toLocaleString(),

      formData: formData,

      prediction: result.prediction,
      probability: result.risk_probability,

      riskLevel: result.risk_level,
      confidence: result.confidence_score
    });

    await newApp.save();

    // Return response
    res.json({
      success: true,
      message: "Prediction Completed Successfully",

      data: {
        applicationId: newApp.applicationId,
        prediction: result.prediction,
        probability: result.risk_probability,
        approval_probability: result.approval_probability,
        confidence_score: result.confidence_score,
        risk_level: result.risk_level
      }
    });

  } catch (error) {
    console.log("Prediction Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Prediction Server Error"
    });
  }
};
