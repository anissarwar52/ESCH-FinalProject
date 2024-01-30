const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('../../../db/conn');
const soleSchema = require('../../model/SoleDistributor/soleSchema')


//For Adding the product we will use router.post
router.post('/admin/users/new',upload.single('image'), async (req,res)=>{
    console.log(req.file, req.body, 14)
    const {name, email, phone, profession,address,country} = req.body;
    const imageUrl = req.file.path;

    if (!name || !email || !phone || !profession || !address || !country || !imageUrl){
        return res.status(422).json({error: "Please fill the field properties"});
    }
    const sole = new soleSchema({name, email, phone, profession,address,country,imageUrl});
    try{
        const saved = await sole.save();
        res.status(201).json({message:"New Sole Distributor Added successfully"});
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
    
});

//For Getting the all Sole Distributors data we will use router.get
router.get('/admin/users',async(req,res)=>{
    try{
    const sole = await soleSchema.find();
    res.json(sole);
    } catch(err){
      res.status(500).json({message:"Cant Find Sole Distributors"})
    }
  })

  //For Getting sole's data 
router.get('/admin/users/:id', async (req, res) => {
    try {
      const sole = await soleSchema.findOne({ _id: req.params.id });
      if (!sole) {
        return res.status(404).json({ message: "Sole Distributor not found" });
      }
      res.json(sole);
    } catch (err) {
      res.status(500).json({ message: "Can't Sole Distributor" });
    }
  });

  // For Updating Specific product's data with put method
router.put('/admin/users/:id', upload.single('image'), async (req, res) => {
  console.log(req.file, req.body, 42);

  const { name, email, phone, profession, address, country } = req.body;
  let imageUrl = '';

  // Check if the image file is provided
  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!name || !email || !phone || !profession || !address || !country) {
    return res.status(422).json({ message: 'Please fill all the fields' });
  }

  try {
    const soleId = req.params.id;
    const existingSole = await soleSchema.findById(soleId);

    if (!existingSole) {
      return res.status(404).json({ message: 'Sole not found' });
    }

    existingSole.name = name;
    existingSole.email = email;
    existingSole.phone = phone;
    existingSole.address = address;
    existingSole.profession = profession;
    existingSole.address = address;
    existingSole.country = country;

    // Update imageUrl only if an image file is provided
    if (imageUrl) {
      existingSole.imageUrl = imageUrl;
    }

    await existingSole.save();

    res.status(200).json({ message: 'Sole updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


  //For Deleting Specific product's data with delete method
router.delete('/admin/users/:id', async (req, res) => {
    try {
      const sole = await soleSchema.findOneAndDelete(
        { _id: req.params.id },
        req.body
      );
      if (!sole) {
        return res.status(404).json({ message: "Sole Distributor not found" });
      }
      res.json(sole);
    } catch (err) {
      res.status(500).json({ message: "Can't Delete Sole Distributor" });
    }
  })



module.exports = router;