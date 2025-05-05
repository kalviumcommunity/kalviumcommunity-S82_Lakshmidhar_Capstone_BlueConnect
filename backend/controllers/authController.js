import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// ------------------ Signup ------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, extraFields } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["user", "worker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role type." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "worker" && Array.isArray(extraFields?.skills)) {
      userData.skills = extraFields.skills.map((s) => (typeof s === 'string' ? s : s.value));
    }

    if (role === "user" && extraFields?.company) {
      userData.company = extraFields.company;
    }

    const user = new User(userData);
    await user.save();

    // Return token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// ------------------ Login ------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;
