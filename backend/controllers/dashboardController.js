const Application = require("../models/Application");

// GET Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1
    });

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE Application
const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardData,
  deleteApplication
};