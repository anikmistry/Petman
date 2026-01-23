const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Pickup = require('../models/Pickup');

// POST /api/pickups - create a pickup (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const { wasteType, quantity, address, phone, details, scheduledFor } = req.body;
    const pickup = new Pickup({
      user: req.user.id,
      wasteType,
      quantity,
      address,
      phone,
      details,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
    });
    await pickup.save();
    res.status(201).json(pickup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/pickups - list user's pickups
router.get('/', auth, async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
