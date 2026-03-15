const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// Only load dotenv locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Example API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Serve React Frontend (optional)
/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
*/

const Room = require("./models/Room");

// GET all rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find(); // fetch all rooms from MongoDB
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
