const express = require('express');
const router = express.Router();
const Complaint = require('../../model/complain/complainSchema');
const authenticate = require('../../../Distributor/middleware/authenticate')


// Route to add a new complaint
router.post('/shopkeeper/complaints', async (req, res) => {
    try {
      const { title, productId} = req.body;
  
      const complaint = new Complaint({
        title,
        productId
      });
  
      const savedComplaint = await complaint.save();
      res.status(201).json(savedComplaint);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  // ...
  
// Route to view all complaints
router.get('/shopkeeper/complaints', async (req, res) => {
    try {
      const complaints = await Complaint.find().populate({
        path: 'productId',
        select: 'title', // Ensure you select 'title' here
      });
  
      res.json(complaints);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// Route to view all complaints
router.get('/distributor/complaints',authenticate, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate({
        path: 'productId',
        select: 'title', // Ensure you select 'title' here
      });

    res.json(complaints);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Route to resolve or reject complain
router.put('/distributor/complaints/:id', authenticate, async (req, res) => {
    try {
      const { action } = req.body; 
      const complainId = req.params.id;
  
      const complain = await Complaint.findById(complainId);
  
      if (!complain) {
        return res.status(404).json({ error: "complain not found" });
      }
  
      if (action === "resolve") {
        // If you accept the complain, mark the distributor's status as "accepted"
        complain.status = 'resolved';
      } else if (action === "reject") {
        // If you reject the complain, mark the distributor's status as "rejected"
        complain.status = 'rejected';
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }

      await complain.save();

      res.json({ message: `complain has been ${action === "resolve" ? "resolved" : "rejected"}` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  



module.exports = router;
