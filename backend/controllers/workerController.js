import express from 'express';
import WorkerProfile from '../models/Worker.js';
import User from '../models/User.js';

const router = express.Router();


router.post('/profile', async (req, res) => {
  try {
    const { userId, skills, experience, company, hourlyRate } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    
    let workerProfile = await WorkerProfile.findOne({ userId });

    if (workerProfile) {
     
      workerProfile.skills = skills;
      workerProfile.experience = experience;
      workerProfile.company = company;
      workerProfile.hourlyRate = hourlyRate;
    } else {
      // Create a new profile
      workerProfile = new WorkerProfile({
        userId,
        skills,
        experience,
        company,
        hourlyRate,
      });
    }

    // Save the worker profile
    await workerProfile.save();

    res.status(201).json({ msg: 'Worker profile saved successfully', workerProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.put('/profile/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { skills, experience, company, hourlyRate } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      let workerProfile = await WorkerProfile.findOne({ userId });
  
      if (workerProfile) {
        // Update existing profile
        workerProfile.skills = skills;
        workerProfile.experience = experience;
        workerProfile.company = company;
        workerProfile.hourlyRate = hourlyRate;
      } else {
        // Create a new profile
        workerProfile = new WorkerProfile({
          userId,
          skills,
          experience,
          company,
          hourlyRate,
        });
      }
  
      await workerProfile.save();
  
      res.status(201).json({ msg: 'Worker profile saved successfully', workerProfile });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

// Get worker profile by userId
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find worker profile by userId
    const workerProfile = await WorkerProfile.findOne({ userId }).populate('userId', 'name email');

    if (!workerProfile) {
      return res.status(404).json({ msg: 'Worker profile not found' });
    }

    res.json(workerProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all worker profiles (e.g., for admins or listing)
router.get('/profiles', async (req, res) => {
  try {
    const workerProfiles = await WorkerProfile.find().populate('userId', 'name email');

    res.json(workerProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete worker profile by userId
router.delete('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete the worker profile
    const workerProfile = await WorkerProfile.findOneAndDelete({ userId });

    if (!workerProfile) {
      return res.status(404).json({ msg: 'Worker profile not found' });
    }

    res.json({ msg: 'Worker profile deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

export default router;
