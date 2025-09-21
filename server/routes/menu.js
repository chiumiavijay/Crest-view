const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
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

// @route   GET /api/admin/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/menu/:id
// @desc    Get a single menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/menu/:id
// @desc    Update a menu item
// @access  Private (Admin)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description } = req.body;

    const oldItem = await MenuItem.findById(id);
    if (!oldItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let imagePath = oldItem.image;

    if (req.file) {
      if (oldItem.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', oldItem.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = req.file.filename;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        description,
        image: imagePath,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route to seed data for testing
router.post('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const items = [
      { name: 'Margherita Pizza', category: 'Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12, image: 'https://images.unsplash.com/photo-1601924582975-1c10f7b74df3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Spaghetti Bolognese', category: 'Spaghetti', description: 'Classic Italian pasta with rich meat sauce.', price: 14, image: 'https://images.unsplash.com/photo-1603073430316-b63da042b41b?auto=format&fit=crop&w=800&q=80' },
    ];
    await MenuItem.insertMany(items);
    res.json({ message: 'Menu items seeded successfully' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;