require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Task, Bid } = require('./models');

const app = express();

// Allow both local dev and Vercel production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL // Set this on Render dashboard
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());

// ----------------------------------------------------
// MONGODB CONNECTION
// Replace process.env.MONGO_URI with your Atlas URI
// Example: mongodb+srv://admin:<password>@cluster.mongodb.net/freelance-flow
// ----------------------------------------------------
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// --- API ENDPOINTS ---

// 1. Get all open tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'open' }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Post a new W5HH Task (Client)
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Submit a Milestone-Based Bid (Developer)
app.post('/api/bids', async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.status(201).json(newBid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Get Bids for a Specific Task (Audit Trail sorted by timestamp)
app.get('/api/tasks/:taskId/bids', async (req, res) => {
  try {
    const bids = await Bid.find({ task_id: req.params.taskId }).sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
module.exports = app;
