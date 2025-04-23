const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET /api/items - Fetches all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ name: 1 }); 
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/items/add - Adds a new item
router.post('/add', async (req, res) => {
  const { item } = req.body;

  if (!item || item.trim().length === 0) {
    return res.status(400).json({ message: 'Item name is required' });
  }

  try {
    const newItem = new Item({ name: item });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Item already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;