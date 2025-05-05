import express from "express";
import Job from "../models/Job.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE job (Employer only)
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Only employers can post jobs." });
    }

    const { title, description, location, salary } = req.body;

    const job = new Job({
      title,
      description,
      location,
      salary,
      company: req.user.company,
      postedBy: req.user._id,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (err) {
    res.status(500).json({ message: "Job creation failed", error: err.message });
  }
});

// READ all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name company");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Fetching jobs failed", error: err.message });
  }
});

// READ single job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name company");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Fetching job failed", error: err.message });
  }
});

// UPDATE job (Employer only)
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, location, salary } = req.body;

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Job update failed", error: err.message });
  }
});

// DELETE job (Employer only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Job deletion failed", error: err.message });
  }
});

export default router;
