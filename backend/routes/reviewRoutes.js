const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.find().populate("workerId userId", "name email");
  res.json(reviews);
});

router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
});

router.put("/:id", async (req, res) => {
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

module.exports = router;
