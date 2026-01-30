const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
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

// GET /api/pickups/all - list ALL pickups (Admin)
router.get('/all', auth, admin, async (req, res) => {
  try {
    const pickups = await Pickup.find().populate('user', 'name email phone location').sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/pickups/:id/status - update pickup status (Admin)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status, wasteQuantities } = req.body;
    // user findByIdAndUpdate to bypass validation of other fields (like wasteType enum mismatches)
    const pickup = await Pickup.findByIdAndUpdate(
        req.params.id, 
        { status, wasteQuantities }, 
        { new: true }
    );
    
    if (!pickup) return res.status(404).json({ msg: 'Pickup not found' });

    res.json(pickup);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
