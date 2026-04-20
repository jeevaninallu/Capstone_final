const User = require("../models/User");
const bcrypt = require("bcryptjs");
const LoginLog = require("../models/LoginLog");


// ===============================
// REGISTER USER
// ===============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already registered"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({
      name,
      email,
      password:
        hashedPassword
    });

    res.status(201).json({
      success: true,
      message:
        "Registration successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};


// ===============================
// LOGIN USER
// ===============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email
      });

    // Email not found
    if (!user) {
      await LoginLog.create({
        email,
        status: "Failed"
      });

      return res.status(400).json({
        success: false,
        message:
          "Email not found"
      });
    }

    // Account locked
    if (
      user.lockUntil &&
      user.lockUntil > Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Account locked for 15 minutes"
      });
    }

    // Password check
    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    // Wrong password
    if (!match) {
      user.loginAttempts += 1;

      const attemptsLeft =
        3 - user.loginAttempts;

      // Lock after 3 attempts
      if (
        user.loginAttempts >= 3
      ) {
        user.lockUntil =
          Date.now() +
          15 *
            60 *
            1000;

        user.loginAttempts = 0;

        await user.save();

        await LoginLog.create({
          email,
          status: "Failed"
        });

        return res.status(400).json({
          success: false,
          message:
            "Account locked for 15 minutes"
        });
      }

      await user.save();

      await LoginLog.create({
        email,
        status: "Failed"
      });

      return res.status(400).json({
        success: false,
        message:
          `Wrong credentials. ${attemptsLeft} attempts left`
      });
    }

    // Successful login
    user.loginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    await LoginLog.create({
      email,
      status: "Success"
    });

    res.json({
      success: true,
      message:
        "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};