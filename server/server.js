// server.js

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// =======================
// Database Connection
// =======================
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

// =======================
// API Routes (example)
// =======================
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Import other routes if you have them
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// =======================
// Serve React Frontend (commented out for now)
// =======================
// Uncomment this block when your client/build exists
/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Middleware fallback for React Router
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
*/

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.
