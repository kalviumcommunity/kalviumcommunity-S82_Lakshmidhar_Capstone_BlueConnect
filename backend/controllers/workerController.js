import express from 'express';
import Job from '../models/Job.js';
import protect  from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', protect, async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    jobType,
    description,
    requirements,
    contactEmail,
    category,
    budget,
    deadline
  } = req.body;

  try {
    const job = await Job.create({
      user: req.user._id,
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
      contactEmail,
      category,
      budget,
      deadline,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const workers = await WorkerProfile.find().populate('userId', 'name email role');
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workers', error: err.message });
  }
});

// Get single worker profile by ID
router.get('/:id', protect, async (req, res) => {
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


export default router