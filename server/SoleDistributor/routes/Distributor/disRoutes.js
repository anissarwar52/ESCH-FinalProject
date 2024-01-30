const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('../../../db/conn');
const disSchema = require('../../model/Distributor/disSchema')
const authenticate = require('../../middleware/authenticate')
const Request = require('../../../Distributor/model/request/requestModel')


//For Adding the distributor we will use router.post
router.post('/soleDistributor/users/new',authenticate, upload.single('image'), async (req,res)=>{

  console.log(req.file, req.body, 14)
  const {name, email, phone, address,city} = req.body;
  const userId = req.userId; 
  const imageUrl = req.file.path;

  if (!name || !email || !phone || !address || !city || !imageUrl){
      return res.status(422).json({error: "Please fill the field properties"});
  }
  const sole = new disSchema({userId, name, email, phone, address,city,imageUrl});
  try{
      const saved = await sole.save();
      res.status(201).json({message:"New Distributor Added successfully"});
  }
  catch(err){
      res.status(400).json({ message: err.message });
  }
  
});

//For Getting the all Sole Distributors data we will use router.get
router.get('/soleDistributor/users',authenticate,async(req,res)=>{
    try{
      const userId = req.userId;
    const dis = await disSchema.find({ userId });
    res.json(dis);
    
    } catch(err){
      res.status(500).json({message:"Cant Find Distributors"})
    }
  })

  //For Getting Specific Distributor's data 
  router.get('/soleDistributor/users/:id', authenticate, async (req, res) => {
    try {
      const userId = req.userId;
      const dis = await disSchema.findOne({ _id: req.params.id, userId: userId }); // Corrected userId reference
      if (!dis) {
        return res.status(404).json({ message: "Distributor not found" });
      }
      res.json(dis);
    } catch (err) {
      res.status(500).json({ message: "Can't Find Distributor" });
    }
  });
  

  //For Updating Specific Distributor's data with put method
router.put('/soleDistributor/users/:id', authenticate, upload.single('image'), async (req, res) => {
  console.log(req.file, req.body, 42);
  const { name, email, phone, address,city } = req.body;
  const imageUrl = req.file.path;
  const userId = req.userId; 

  if (!name || !email || !phone || !address || !city || !imageUrl) {
      return res.status(422).json({ message: 'Please fill all the fields' });
  }

  try {

      const soleId = req.params.id;
      const existingSole = await disSchema.findById(soleId);

      if (!existingSole) {
          return res.status(404).json({ message: 'Sole not found' });
      }
      existingSole.userId = userId;
      existingSole.name = name;
      existingSole.email = email;
      existingSole.phone = phone;
      existingSole.address = address;
      existingSole.address = address;
      existingSole.city = city;
      existingSole.imageUrl = imageUrl;

      await existingSole.save();

      res.status(200).json({ message: 'Sole updated successfully' });
  } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
  }
})

  //For Deleting Specific Distributor's data with delete method
router.delete('/soleDistributor/users/:id', authenticate, async (req, res) => {
    try {
      const userId = req.userId;
      const dis = await disSchema.findOneAndDelete(
        { _id: req.params.id, userId: userId},
        req.body
      );
      if (!dis) {
        return res.status(404).json({ message: "Distributor not found" });
      }
      res.json(dis);
    } catch (err) {
      res.status(500).json({ message: "Can't Delete Distributor" });
    }
  })



module.exports = router;