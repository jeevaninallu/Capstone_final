const axios = require("axios");
const Application = require("../models/Application");

exports.predictLoan = async (req, res) => {
  try {
    const formData = req.body;

    // Send to Flask ML API
    const response = await axios.post(
      "http://ml_service:8000/predict",
      formData
    );

    const result = response.data;

    // Save in MongoDB
    const newApp = new Application({
      applicationId: "APP-" + Date.now(),
      date: new Date().toLocaleString(),
      formData,
      prediction: result.prediction,
      probability: result.risk_probability
    });

    await newApp.save();

    res.json({
      success: true,
      message: "Saved Successfully",
      data: newApp
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Prediction Error"
    });
  }
};