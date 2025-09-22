// =======================
// Import Dependencies
// =======================
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const webpush = require('web-push');

// Import Mongoose Models for real-time updates and API routes
const Booking = require('./models/Booking');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Room = require('./models/Room');
const NotificationSubscription = require('./models/NotificationSubscription');

const app = express();
const server = http.createServer(app);

// =======================
// Socket.io Setup
// =======================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ New client connected via Socket.io");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected from Socket.io");
  });
});

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =======================
// Push Notification Setup (New)
// =======================
webpush.setVapidDetails(
  'mailto:grangertryness@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// =======================
// Database Connection
// =======================
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    createDefaultAdmin();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// =======================
// Default Admin Creation
// =======================
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'grangertryness@gmail.com', role: 'admin' });
    if (!existingAdmin) {
      const admin = new User({
        email: 'grangertryness@gmail.com',
        password: 'chiumiatryness',
        role: 'admin',
      });
      await admin.save();
      console.log('✅ Default admin created: grangertryness@gmail.com / chiumiatryness');
    } else {
      console.log('ℹ️ Default admin already exists');
    }
  } catch (err) {
    console.error('❌ Error creating default admin:', err.message);
  }
};

// =======================
// API Routes
// =======================
// Import the public rooms router
const roomsRouter = require('./routes/rooms');

// Customer-facing routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', roomsRouter); // <-- Add this line to resolve the 404 error

// New: Admin routes
app.use('/api/admin', require('./routes/admin'));

// New: Endpoint to save a user's push notification subscription
app.post('/subscribe', async (req, res) => {
  try {
    const newSubscription = new NotificationSubscription(req.body);
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription saved.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save subscription.' });
  }
});

// =======================
// Real-time Updates with Socket.io & Push Notifications
// =======================
Booking.watch().on("change", async (change) => {
  if (change.operationType === "insert") {
    const newBooking = change.fullDocument;
    io.emit("newBooking", newBooking); // Socket.io notification

    // Push notification logic
    const subscriptions = await NotificationSubscription.find({});
    const payload = JSON.stringify({
      title: 'New Reservation!',
      body: `A new reservation has been made by ${newBooking.name}.`
    });

    subscriptions.forEach(sub => {
      webpush.sendNotification(sub, payload)
        .catch(error => console.error('Push notification failed:', error));
    });
  }
});

// =======================
// Serve React Frontend
// =======================
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Send index.html for all other requests, fixing the PathError
  // The original route 'app.get('*', ...)' caused an error with the path-to-regexp library.
  // Using a named parameter like '/:path*' is the correct way to create a catch-all route.
  app.get('/:path*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// =======================
// Start the Server
// =======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
