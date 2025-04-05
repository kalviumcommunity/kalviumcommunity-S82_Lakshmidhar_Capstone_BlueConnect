const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GETAPI
router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (err) {
    console.error( err);
    res.status(500).json({ message: ' error while fetching users' });
  }
});

// POSTAPI
router.post('/createUser', async (req, res) => {
  try {
    let { name, email, password, location } = req.body;


    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const newUser = new User({ name, email, password, location });
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
     
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
