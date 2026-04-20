const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  loginAttempts: {
    type: Number,
    default: 0
  },

  lockUntil: {
    type: Date,
    default: null
  },

  role: {
    type: String,
    default: "officer"
  },

  provider: {
    type: String,
    default: "local"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);