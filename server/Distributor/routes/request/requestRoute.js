const express = require('express');
const router = express.Router();
const authenticate = require("../../middleware/authenticate")
const Request = require('../../model/request/requestModel')
const Product = require('../../../Admin/model/Products/productSchema')
const Distributor = require('../../model/disLogin/distSchema')
const Sell = require('../../../SoleDistributor/model/Sell/sellSchema')
const Order = require('../../../SoleDistributor/model/order/orderModel')


router.post('/distributor/request/new', authenticate, async (req, res) => {
    try {
      const { experience } = req.body;
      const userId = req.userId; // Extracted from authentication middleware
  
      if (!experience) {
        return res.status(422).json({ message: "Please select Experience" });
      }
  
      // Check if there is an existing request with 'pending' or 'rejected' status
      const existingRequest = await Request.findOne({ userId, status: { $in: ['pending', 'rejected'] }});
  
      if (existingRequest) {
        if (existingRequest.status === 'pending') {
          return res.status(400).json({ error: 'You already have a pending request.' });
        } else if (existingRequest.status === 'rejected') {
          // Define the new request object here to make it accessible in both branches
          const newRequest = new Request({
            userId,
            requestDate: new Date(),
            experience,
            status: 'pending',
          });
  
          // Save the request to the database
          const savedRequest = await newRequest.save();
  
          return res.status(201).json(savedRequest);
        }
      }
  
      // Create a new request with the current date as requestDate
      const newRequest = new Request({
        userId,
        requestDate: new Date(),
        experience,
        status: 'pending',
      });
  
      // Save the request to the database
      const savedRequest = await newRequest.save();
  
      res.status(201).json(savedRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.get('/distributor/request', authenticate, async (req, res) => {

    try {
      const userId = req.userId; 
      const request = await Request.find({ userId }).populate('userId'); 
      if (!request) {
        return res.status(404).json({ error: "Can't find requests" });
      }
      res.json(request);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Assuming you have the necessary imports and middleware (like authentication) in place


//<----------Distributor selling-------------------->


// Create a route for listing products that a distributor can order

router.get('/distributor/products', authenticate, async (req, res) => {
  try {
    const requests = await Sell.find().sort({ date: -1 })
      .populate('product', 'title imageUrl description'); // Populate the 'userId' field 

    if (!requests || requests.length === 0) {
      return res.status(404).json({ error: "No Requests records found" });
    }
    
    res.json(requests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



//buy-history

router.get('/distributor/buy-history', authenticate, async (req, res) => {
  try {
    const distributorId = req.userId;

    const buyHistory = await Sell.find({
      distributorId,
      status: { $in: ['accepted', 'rejected'] } // Filter by 'accepted' or 'rejected' status
    })
    .sort({ date: -1 })
    .populate('product', 'title imageUrl description');

    if (!buyHistory || buyHistory.length === 0) {
      return res.status(404).json({ error: "No buy history records found" });
    }

    res.json(buyHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// buy products

router.get('/distributor/buy-product', authenticate, async (req, res) => {
  try {
    const distributorId = req.userId;

    const pendingProducts = await Sell.find({
      distributorId,
      status: 'pending'
    })
    .sort({ date: -1 })
    .populate('product', 'title imageUrl description');

    if (!pendingProducts || pendingProducts.length === 0) {
      return res.status(404).json({ error: "No pending products found" });
    }

    res.json(pendingProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







// top 2 latest

router.get('/distributor/products/latest', authenticate, async (req, res) => {
  try {
    const latestProducts = await Sell.find()
      .sort({ date: -1 }) // Sort by date in descending order (latest first)
      .limit(3) // Limit to 2 products
      .populate('product', 'title imageUrl description');

    if (!latestProducts || latestProducts.length === 0) {
      return res.status(404).json({ error: "No latest products found" });
    }

    res.json(latestProducts);
  } catch (error) {
    console.error('Error fetching latest products:', error);
    res.status(500).json({ message: 'Error fetching latest products' });
  }
});




//Accept or Reject for distributor to get products

router.put('/distributor/products/:id', authenticate, async (req, res) => {
  try {
    const { action } = req.body; // Expect 'action' to be 'accept' or 'reject'
    const sellId = req.params.id;

    const sell = await Sell.findById(sellId);

    if (!sell) {
      return res.status(404).json({ error: "Sell-info not found" });
    }

    if (action === "accept") {
      // If you accept the request, mark the distributor's status as "accepted"
      sell.status = 'accepted';
    } else if (action === "reject") {
      // If you reject the request, mark the distributor's status as "rejected"
      sell.status = 'rejected';
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    // Save the updated request to change the status
    await sell.save();

    // You can choose to remove the request from the database if needed.
  //   await Request.deleteOne({ _id: sellId });

    res.json({ message: `Sell Request has been ${action === "accept" ? "accepted" : "rejected"}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});






// For Getting all the Sole Distributors selled products data, use router.get
router.get('/distributor/my-products', authenticate, async (req, res) => {
  try {
    const acceptedSells = await Sell.find({ status: "accepted" })
      .populate('product', 'title imageUrl description');

    if (acceptedSells.length === 0) {
      return res.status(404).json({ error: "No Products Sell found" });
    }

    // Create a map to group products by title and sum their quantities
    const productMap = new Map();
    acceptedSells.forEach((sell) => {
      const { _id, title, imageUrl, description } = sell.product;
      if (productMap.has(title)) {
        const existingProduct = productMap.get(title);
        existingProduct.quantity += sell.quantity;
      } else {
        productMap.set(title, { _id, title, imageUrl, description, quantity: sell.quantity });
      }
    });

    // Convert the map values back to an array
    const combinedProducts = Array.from(productMap.values());

    res.json(combinedProducts);
  } catch (err) {
    res.status(500).json({ message: "Can't Find Products Sell" });
  }
});


router.get('/distributor/low-stock', authenticate, async (req, res) => {
  try {
    const acceptedSells = await Sell.find({ status: "accepted" })
      .populate('product', 'title imageUrl description quantity'); // Include 'quantity' field

    if (acceptedSells.length === 0) {
      return res.status(404).json({ error: "No accepted sells found" });
    }

    // Create a map to group products by ID and sum their quantities
    const productMap = new Map();

    acceptedSells.forEach((sell) => {
      const { _id, title, imageUrl, description } = sell.product;
      if (productMap.has(_id)) {
        const existingProduct = productMap.get(_id);
        existingProduct.quantity += sell.quantity;
      } else {
        productMap.set(_id, {
          _id,
          title,
          imageUrl,
          description,
          quantity: sell.quantity
        });
      }
    });

    // Filter products with a quantity of 1 or less
    const lowStockProducts = Array.from(productMap.values())
      .filter(product => product.quantity <= 1);

    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: "Can't Find Low Stock Products" });
  }
});



router.get('/shopkeeper/products-display', async (req, res) => {
  try {
    const acceptedSells = await Sell.find({ status: 'accepted' }).populate('product', 'title imageUrl description');

    if (acceptedSells.length === 0) {
      return res.status(404).json({ error: 'No Products Sell found' });
    }

    // Create a map to group products by ID and sum their quantities
    const productMap = new Map();

    acceptedSells.forEach((sell) => {
      const { _id, title, imageUrl, description } = sell.product;
      if (productMap.has(_id)) {
        const existingProduct = productMap.get(_id);
        existingProduct.quantity += sell.quantity;
      } else {
        productMap.set(_id, {
          _id,
          title,
          imageUrl,
          description,
          quantity: sell.quantity,
          price:sell.price
        });
      }
    });

    // Convert the map values back to an array
    const combinedProducts = Array.from(productMap.values());

    res.json(combinedProducts);
  } catch (err) {
    res.status(500).json({ message: "Can't Find Products Sell" });
  }
});


router.get('/shopkeeper/latestproducts-display', async (req, res) => {
  try {
    const acceptedSells = await Sell.find({ status: 'accepted' })
      .sort({ date: -1 })  // Sort by date in descending order
      .limit(3)  // Limit to three results
      .populate('product', 'title imageUrl description');

    if (acceptedSells.length === 0) {
      return res.status(404).json({ error: 'No Products Sell found' });
    }

    // Create a map to group products by ID and sum their quantities
    const productMap = new Map();

    acceptedSells.forEach((sell) => {
      const { _id, title, imageUrl, description } = sell.product;
      if (productMap.has(_id)) {
        const existingProduct = productMap.get(_id);
        existingProduct.quantity += sell.quantity;
      } else {
        productMap.set(_id, {
          _id,
          title,
          imageUrl,
          description,
          quantity: sell.quantity,
        });
      }
    });

    // Convert the map values back to an array
    const combinedProducts = Array.from(productMap.values());

    res.json(combinedProducts);
  } catch (err) {
    res.status(500).json({ message: "Can't Find Products Sell" });
  }
});



//Top latest product

router.get('/shopkeeper/no1-Latest-Product', async (req, res) => {
  try {
    const acceptedSells = await Sell.find({ status: 'accepted' })
      .sort({ date: -1 })  // Sort by date in descending order
      .limit(1)  // Limit to three results
      .populate('product', 'title imageUrl description');

    if (acceptedSells.length === 0) {
      return res.status(404).json({ error: 'No Products Sell found' });
    }

    // Create a map to group products by ID and sum their quantities
    const productMap = new Map();

    acceptedSells.forEach((sell) => {
      const { _id, title, imageUrl, description } = sell.product;
      if (productMap.has(_id)) {
        const existingProduct = productMap.get(_id);
        existingProduct.quantity += sell.quantity;
      } else {
        productMap.set(_id, {
          _id,
          title,
          imageUrl,
          description,
          quantity: sell.quantity,
        });
      }
    });

    // Convert the map values back to an array
    const combinedProducts = Array.from(productMap.values());

    res.json(combinedProducts);
  } catch (err) {
    res.status(500).json({ message: "Can't Find Products Sell" });
  }
});







  module.exports = router;