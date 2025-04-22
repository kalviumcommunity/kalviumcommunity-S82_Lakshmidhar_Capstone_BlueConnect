const express = require("express");
const router = express.Router();
const WorkerProfile = require("../models/WorkerProfile");

router.get("/", async (req, res) => {
  const workers = await WorkerProfile.find().populate("userId", "name email");
  res.json(workers);
});

router.post("/", async (req, res) => {
  const newWorker = new WorkerProfile(req.body);
  await newWorker.save();
  res.status(201).json(newWorker);
});

router.put("/:id", async (req, res) => {
  const updated = await WorkerProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await WorkerProfile.findByIdAndDelete(req.params.id);
  res.json({ message: "Worker profile deleted" });
});

module.exports = router;
