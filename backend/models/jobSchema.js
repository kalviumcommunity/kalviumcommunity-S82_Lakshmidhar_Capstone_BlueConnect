const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: Number, required: true },
  postedDate: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
  category: { type: String, enum: ['Technical', 'Non-Technical'], required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who applied
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the employer who posted the job
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
