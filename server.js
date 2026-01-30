require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pickups', require('./routes/pickups'));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
