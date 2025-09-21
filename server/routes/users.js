// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   GET /api/users
// @desc    Get all users (for admin)
// @access  Public (change to Private if needed)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t return passwords
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/users/:id
// @desc    Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;   // ✅ This is critical
