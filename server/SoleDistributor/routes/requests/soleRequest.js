const express = require('express');
const router = express.Router();
const authenticate = require("../../middleware/authenticate")
const Request = require("../../../Distributor/model/request/requestModel")

router.get('/soleDistributor/view-requests',authenticate, async (req, res) => {
    try {
      const requests = await Request.find()
        .populate('userId', 'imageUrl name email phone city address'); // Populate the 'userId' field 
  
      if (!requests || requests.length === 0) {
        return res.status(404).json({ error: "No Requests records found" });
      }
      
      res.json(requests);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  // Accept or reject

// Accept or reject
router.put('/soleDistributor/view-requests/:id', authenticate, async (req, res) => {
    try {
      const { action } = req.body; // Expect 'action' to be 'accept' or 'reject'
      const requestId = req.params.id;
  
      const request = await Request.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
  
      if (action === "accept") {
        // If you accept the request, mark the distributor's status as "accepted"
        request.status = 'accepted';
      } else if (action === "reject") {
        // If you reject the request, mark the distributor's status as "rejected"
        request.status = 'rejected';
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }
  
      // Save the updated request to change the status
      await request.save();
  
      // You can choose to remove the request from the database if needed.
    //   await Request.deleteOne({ _id: requestId });
  
      res.json({ message: `Request has been ${action === "accept" ? "accepted" : "rejected"}` });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

  // For Getting all the Sole Distributors data, use router.get
  router.get('/soleDistributor/distributors', authenticate, async (req, res) => {
    try {
      const acceptedDistributors = await Request.find({ status: "accepted" })
        .populate('userId', 'imageUrl name email phone city address');
      
      const rejectedDistributors = await Request.find({ status: "rejected" })
        .populate('userId', 'imageUrl name email phone city address');
  
      const pendingDistributors = await Request.find({ status: "pending" })
        .populate('userId', 'imageUrl name email phone city address');
  
      const allDistributors = acceptedDistributors.concat(rejectedDistributors, pendingDistributors);
  
      if (allDistributors.length === 0) {
        return res.status(404).json({ error: "No Distributors found" });
      }
  
      res.json(allDistributors);
    } catch (err) {
      res.status(500).json({ message: "Can't Find Distributors" });
    }
  });
  
  



  module.exports = router;