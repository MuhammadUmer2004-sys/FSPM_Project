// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Contains W5HH formatted text
  inScope: { type: String, required: true },
  outOfScope: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  client_id: { type: String, required: true },
  status: { type: String, default: 'open' }
}, { timestamps: true });

// models/Bid.js
const BidSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  developer_id: { type: String, required: true },
  amount: { type: Number, required: true },
  milestones: [{
    name: String,
    amount: Number
  }],
  proposal: { type: String, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true }); // Timestamps act as the Audit Trail

module.exports = {
  Task: mongoose.model('Task', TaskSchema),
  Bid: mongoose.model('Bid', BidSchema)
};
