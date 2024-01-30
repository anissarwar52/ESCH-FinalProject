const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../../../db/conn');
const Shopkeeper = require('../../model/ShopLogin/shopSchema');

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@(yahoo|gmail)\.(com|net|org)$/i;

router.post('/shopkeeper/register', async (req,res) => {
  const {name, email, shop, password} = req.body;

  if (!name || !email || !shop || !password){
      return res.status(422).json({error: "Please fill the field properties"});
  }
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email address" });
  }
  
  try{
  const userExist = await Shopkeeper.findOne({email:email});

  if (userExist) {
      return res.status(422).json({error: "Email already Exist" });
  }else{
      const shopkeeper = new Shopkeeper({name, email, shop, password});
  await shopkeeper.save();


  res.status(201).json({message:"user registered successfully"});
  }


} catch(err) { 
  console.log(err); 
}

});


// Login RouteshopLogin

router.post("/shopkeeper/signin",async (req,res) =>{
  try{
      let token;
      const {email,password} = req.body;
      
      if(!email || !password){
          return res.status(400).json({error:"Please Fill The Data"})
      }
      
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const shopLogin = await Shopkeeper.findOne({email:email});

      if (shopLogin){
          const isMatch = await bcrypt.compare(password, shopLogin.password);

         token = await shopLogin.generateAuthToken();
          console.log(token);

          res.cookie("jwtoken", token,{
              expires: new Date(Date.now()+25892000000),
              httpOnly:true
          });

          if(!isMatch){
              res.status(400).json({error:"Invalid Credentials pass"});
          }else{
              res.json({message: "Shopkeeper Signin Successfully"});
          }
       }
       
       else{
              res.status(400).json({error: "Invalid Credentials "});
          }  
     


  } catch (err){
      console.log(err);
  }
});

router.get('/shopkeeper/logout', (req, res) => {
  res.clearCookie('jwtoken',{path:'/'});
  res.json({ message: 'Logout successful' });
  res.status(200).send("User Logout")
});


module.exports = router;
