const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this uploads folder exists in your backend root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// =======================
//   PUBLIC ROUTES
// =======================

// @route   GET /api/rooms
// @desc    Get all available rooms for the client
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get a single room by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
//   ADMIN ROUTES
// =======================

// @route   POST /api/admin/rooms
// @desc    Add a new room
// @access  Admin
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const newRoom = new Room({
    name,
    description,
    price,
    image,
    isAvailable: true // Rooms are available by default
  });

  try {
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/admin/rooms
// @desc    Get all rooms (including unavailable) for admin dashboard
// @access  Admin
router.get('/admin/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/admin/rooms/:id
// @desc    Get a single room for editing
// @access  Admin
router.get('/admin/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/admin/rooms/:id
// @desc    Update a room
// @access  Admin
router.put('/admin/rooms/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const oldRoom = await Room.findById(id);
    if (!oldRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    let imagePath = oldRoom.image;
    if (req.file) {
      if (oldRoom.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', oldRoom.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = req.file.filename;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image: imagePath,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/admin/rooms/:id
// @desc    Delete a room
// @access  Admin
router.delete('/admin/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    // Optional: Delete the image file from the server
    if (room.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', room.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;