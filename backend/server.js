const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = process.env.Port
app.use(cors())
app.use(express.json())
const userRoutes = require("./routes/authroutes");
const workerRoutes = require("./routes/workerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const db = require('./db/db')
db()



app.use("/api/users", userRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
    
    console.log(`server running at http://localhost:${PORT}`);
  });
  