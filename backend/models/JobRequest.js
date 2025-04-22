// models/JobRequest.js
const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: String,
  description: String,
  status: { type: String, enum: ["pending", "accepted", "completed", "cancelled"], default: "pending" },
  scheduledDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobRequest", jobRequestSchema);
