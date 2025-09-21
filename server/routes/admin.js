const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MenuItem = require('../models/MenuItem');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const NotificationSubscription = require('../models/NotificationSubscription'); // Import this model
const webpush = require('web-push'); // Import the web-push library

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// === MENU ROUTES ===
// @route   POST /api/admin/menu
// @desc    Add a new menu item
router.post('/menu', upload.single('image'), async (req, res) => {
    try {
        const { name, category, description, price } = req.body;
        const image = req.file ? path.basename(req.file.path) : null;

        const newMenuItem = new MenuItem({ name, category, description, price, image });
        const menuItem = await newMenuItem.save();
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/admin/menu
// @desc    Get all menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/admin/menu/:id
// @desc    Get a single menu item by ID
router.get('/menu/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/admin/menu/:id
// @desc    Update a menu item
router.put('/menu/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description } = req.body;

        const oldItem = await MenuItem.findById(id);
        if (!oldItem) return res.status(404).json({ message: 'Menu item not found' });

        let imagePath = oldItem.image;
        if (req.file) {
            if (oldItem.image) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', oldItem.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imagePath = path.basename(req.file.path);
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            { name, category, price, description, image: imagePath },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/admin/menu/:id
// @desc    Delete a menu item
router.delete('/menu/:id', async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Menu item not found' });

        if (item.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', item.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === ROOM ROUTES ===
// @route   POST /api/admin/rooms
// @desc    Add a new guesthouse room
router.post('/rooms', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? path.basename(req.file.path) : null;

        const newRoom = new Room({ name, description, price, image });
        const room = await newRoom.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/admin/rooms
// @desc    Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/admin/rooms/:id
// @desc    Get a single room by ID
router.get('/rooms/:id', async (req, res) => {
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
router.put('/rooms/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const oldRoom = await Room.findById(id);
        if (!oldRoom) return res.status(404).json({ message: 'Room not found' });

        let imagePath = oldRoom.image;
        if (req.file) {
            if (oldRoom.image) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', oldRoom.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imagePath = path.basename(req.file.path);
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { name, description, price, image: imagePath },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/admin/rooms/:id
// @desc    Delete a room
router.delete('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        if (room.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', room.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === BOOKING ROUTES ===
// @route   GET /api/admin/bookings
// @desc    Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update a booking status and send a push notification if confirmed
router.put('/bookings/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Send a push notification if the status is "confirmed"
        if (status === 'confirmed') {
            const subscriptions = await NotificationSubscription.find({});
            const payload = JSON.stringify({
                title: 'Reservation Confirmed!',
                body: `Your reservation for a ${booking.bookingType} has been confirmed.`,
            });
            subscriptions.forEach(sub => {
                webpush.sendNotification(sub, payload).catch(error =>
                    console.error('Push notification failed:', error)
                );
            });
        }

        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;