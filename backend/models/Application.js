const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicationId: String,
  date: String,
  formData: Object,
  prediction: String,
  probability: Number
});

module.exports = mongoose.model("Application", applicationSchema);