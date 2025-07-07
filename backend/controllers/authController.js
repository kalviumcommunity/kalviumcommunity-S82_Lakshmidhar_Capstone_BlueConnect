import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, extraFields } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "worker" && Array.isArray(extraFields?.skills)) {
      newUserData.skills = extraFields.skills.map((s) => s.value || s);
    }

    if (role === "user" && extraFields?.company) {
      newUserData.company = extraFields.company;
    }

    const newUser = new User(newUserData);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
