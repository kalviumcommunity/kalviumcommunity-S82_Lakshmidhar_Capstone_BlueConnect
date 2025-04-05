const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// Get Api used
router.get('/getUsers', async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
