const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const authenticate = require("../../middleware/authenticate")
require('../../../db/conn')
const soleDistributor = require("../../model/soleLogin/soleSchema");

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@(yahoo|gmail)\.(com|net|org)$/i;



router.post('/soleDistributor/register',upload.single('image'), async (req,res,next) => {
    console.log(req.file, req.body, 14)
    const {name, email, phone, profession,address,country, password} = req.body;
    const imageUrl = req.file.path;


    if (!name || !email || !phone || !profession || !address || !country || !password || !imageUrl){
        return res.status(422).json({error: "Please fill the field properties"});
    }
   
    if (!emailRegex.test(email)) {
        return res.status(422).json({ error: "Invalid email address" });
      }

    try{
    const userExist = await soleDistributor.findOne({email:email});

    if (userExist) {
        return res.status(422).json({error: "Email already Exist" });
    }else{
        const sole = new soleDistributor({name, email, phone, profession,address,country, password, imageUrl});
    await sole.save();
    res.status(201).json({message:"user registered successfully"});
    }
} catch(err) { 
    console.log(err); 
}

});


router.get('/soleDistributor', async (req, res) => {
  try {
    // Find all users in the database
    const users = await soleDistributor.find();

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Respond with the array of users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Login Route
router.post("/soleDistributor/signin",async (req,res) =>{
    try{
        let token;
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({error:"Please Fill The Data"})
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
          }

        const soleLogin = await soleDistributor.findOne({email:email});
        if (soleLogin){
            const isMatch = await bcrypt.compare(password, soleLogin.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
              }

           token = await soleLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly:true,
                sameSite: "none", // Add this line
                secure: true, 
            });

            return res.json({ message: "Signin successful" });
        } else {
          return res.status(400).json({ error: "Invalid Credentials" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

   //Authenticate home page

router.get('/soleDistributor/profile', authenticate,(req,res)=>{
    res.send(req.rootUser)
  })
  
  //update profile picture
  
  router.put('/soleDistributor/profile/:id', upload.single('image'), authenticate, async (req, res) => {
    try {
      const userId = req.params.id;
      const imageUrl = req.file ? req.file.path : undefined;
      const updatedData = {
        imageUrl: imageUrl, // Update the imageUrl field with the file information
      };
  
      const updatedPic = await soleDistributor.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!updatedPic) {
        return res.status(404).json({ message: 'Picture not found' });
      }
  
      return res.json(updatedPic);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  
  
  // router.get('/soleDistributor/logout', (req, res) => {
  //   res.clearCookie('jwtoken',{path:'/'});
  //   res.json({ message: 'Logout successful' });
  //   res.status(200).send("User Logout")
  // }); 
  router.get('/soleDistributor/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
  });
  


module.exports = router;