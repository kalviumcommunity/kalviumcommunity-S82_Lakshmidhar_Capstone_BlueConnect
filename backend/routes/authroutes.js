const express = require('express');
const router = express.Router();
const User = require('../models/user'); 


router.get('/getUsers', async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/createUser',async(req,res)=>{
  try{
    const {name,email,password,location} = req.body
    if(!name || !email || !password || !location){
         return res.status(404).send("all fields are required")
    }
    const found = await User.findOne({email})
    if(found){
      return res.status(400).json({
      message :  "user already exists"
      })
    }
  const newUser  = new User(req.body)
  await newUser.save()
  res.status(200).json({
    message:"done"
  })
  }
  catch(e){
    console.log(e)
    process.exit(1)
  }

})

module.exports = router;
