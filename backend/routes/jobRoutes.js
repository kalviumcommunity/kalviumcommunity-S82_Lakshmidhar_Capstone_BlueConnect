const express = require("express");
const router = express.Router();
const JobRequest = require("../models/JobRequest");

router.get("/", async (req, res) => {
  const jobs = await JobRequest.find().populate("userId workerId", "name email");
  res.json(jobs);
});

router.post("/", async (req, res) => {
  const newJob = new JobRequest(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

router.put("/:id", async (req, res) => {
  const updated = await JobRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await JobRequest.findByIdAndDelete(req.params.id);
  res.json({ message: "Job request deleted" });
});

module.exports = router;
