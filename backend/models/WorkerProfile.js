// models/WorkerProfile.js
const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  experience: Number,
  availability: { type: Boolean, default: true },
  hourlyRate: Number,
  location: String,
  rating: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
});

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
