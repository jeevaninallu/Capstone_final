const User = require("../models/User");
const bcrypt = require("bcryptjs");
const LoginLog = require("../models/LoginLog");


// ===============================
// REGISTER USER
// ===============================
exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // 🔥 Normalize email
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ===============================
// LOGIN USER
// ===============================
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔥 Normalize email
    email = email.trim().toLowerCase();

    console.log("Login attempt:", email);

    const user = await User.findOne({ email });

    // Debug: check DB content
    console.log("All users in DB:", await User.find());

    // Email not found
    if (!user) {
      await LoginLog.create({
        email,
        status: "Failed"
      });

      return res.status(400).json({
        success: false,
        message: "Email not found"
      });
    }

    console.log("User found:", user.email);

    // Account locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Account locked for 15 minutes"
      });
    }

    // Password check
    const match = await bcrypt.compare(password, user.password);

    // Wrong password
    if (!match) {
      user.loginAttempts += 1;

      const attemptsLeft = 3 - user.loginAttempts;

      // Lock after 3 attempts
      if (user.loginAttempts >= 3) {
        user.lockUntil = Date.now() + 15 * 60 * 1000;
        user.loginAttempts = 0;

        await user.save();

        await LoginLog.create({
          email,
          status: "Failed"
        });

        return res.status(400).json({
          success: false,
          message: "Account locked for 15 minutes"
        });
      }

      await user.save();

      await LoginLog.create({
        email,
        status: "Failed"
      });

      return res.status(400).json({
        success: false,
        message: `Wrong credentials. ${attemptsLeft} attempts left`
      });
    }

    // ✅ Successful login
    user.loginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    await LoginLog.create({
      email,
      status: "Success"
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};