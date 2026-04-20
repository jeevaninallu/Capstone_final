const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
{
  email: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Success", "Failed"],
    required: true
  },

  ipAddress: {
    type: String,
    default: "localhost"
  },

  loginTime: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true }
);

module.exports = mongoose.model(
  "LoginLog",
  loginLogSchema
);