import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./controllers/authController.js";

import workerProfileRoutes from "./controllers/workerController.js"; 
import jobRoutes from './controllers/jobController.js';
d8e51fc6b2275a5ab58d3af10769ecbe72f9


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/worker-profile", workerProfileRoutes); 
app.use('/api/jobs', jobRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3516;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
