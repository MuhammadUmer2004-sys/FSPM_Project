require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Task, Bid } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// MONGODB CONNECTION
// Replace process.env.MONGO_URI with your Atlas URI
// Example: mongodb+srv://admin:<password>@cluster.mongodb.net/freelance-flow
// ----------------------------------------------------
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/freelance-flow')
  .then(() => console.log('✅ Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
