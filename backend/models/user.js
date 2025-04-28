const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'worker'], required: true },
  company: { type: String, required: function() { return this.role === 'user'; }, default: '' }, // Company name for employers
  skills: { type: [String], required: function() { return this.role === 'worker'; }, default: [] }, // Skills for workers
  dateJoined: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
