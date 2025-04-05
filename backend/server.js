const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const PORT = process.env.Port
app.use(cors())
app.use(express.json())
const router = require('./routes/authroutes')
const db = require('./db/db')
db()



app.use("/auth",router)

app.listen(PORT, () => {
    
    console.log(`server running at http://localhost:${PORT}`);
  });
  