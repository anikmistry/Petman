const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wasteType: [{ type: String, required: true }],
  quantity: { type: Number, required: true },
  details: { type: String },
  scheduledFor: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending','scheduled','completed','cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Pickup', PickupSchema);
