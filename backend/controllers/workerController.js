import express from 'express';
import WorkerProfile from '../models/worker.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Check if profile exists (Only for workers)
router.get('/status', protect, restrictTo('worker'), async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({ userId: req.user._id });
    res.status(200).json({ exists: !!profile });
  } catch (err) {
    res.status(500).json({ message: 'Error checking profile', error: err.message });
  }
});

// ✅ Create worker profile (Only once)
router.post('/', protect, restrictTo('worker'), async (req, res) => {
  const { skills, experience, company, hourlyRate } = req.body;

  try {
    const existing = await WorkerProfile.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profile = await WorkerProfile.create({
      userId: req.user._id,
      skills,
      experience,
      company,
      hourlyRate,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: 'Error creating profile', error: err.message });
  }
});

// ✅ Get all worker profiles (Public route)
router.get('/', async (req, res) => {
  try {
    const workers = await WorkerProfile.find().populate('userId', 'name email role');
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workers', error: err.message });
  }
});

// ✅ Get single worker profile by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const worker = await WorkerProfile.findById(req.params.id).populate('userId', 'name email role');
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching worker', error: err.message });
  }
});

// ✅ Update profile (Only worker can update their own)
router.put('/', protect, restrictTo('worker'), async (req, res) => {
  const { skills, experience, company, hourlyRate } = req.body;

  try {
    const profile = await WorkerProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update only if provided
    if (skills) profile.skills = skills;
    if (experience) profile.experience = experience;
    if (company) profile.company = company;
    if (hourlyRate) profile.hourlyRate = hourlyRate;

    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile', error: err.message });
  }
});

// ✅ Delete profile (Only worker can delete)
router.delete('/', protect, restrictTo('worker'), async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await profile.remove();
    res.status(200).json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err.message });
  }
});

export default router;
