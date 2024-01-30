const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../../model/order/orderModel');
const Product = require('../../../Admin/model/Products/productSchema'); 
const Sole = require('../../model/soleLogin/soleSchema') 
const Sell = require('../../model/Sell/sellSchema')
const Distributor = require('../../model/Distributor/disSchema')
const Request = require('../../../Distributor/model/request/requestModel')
const authenticate = require('../../middleware/authenticate')
const { startOfDay, subWeeks, startOfWeek } = require('date-fns');




router.post('/soleDistributor/sell-product', authenticate, async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const soleDistributorId = req.userId; // Renamed to soleDistributorId for clarity
    console.log(req.body);

    // Check if the sole distributor exists and is authorized
    const soleDistributor = await Sole.findById(soleDistributorId);

    if (!soleDistributor) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the product exists and has enough quantity in the sole distributor's inventory
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient inventory' });
    }

    // Calculate the total price for the sale
    const total = price * quantity;

    // Find all requests with accepted status and matching the sole distributor's ID
    const acceptedDistributors = await Request.find({
      // userId: userId,
      status: 'accepted'
    }).select('userId');

    console.log('Accepted Distributors:', acceptedDistributors);

    if (acceptedDistributors.length === 0) {
      return res.status(400).json({ message: 'No distributors with accepted requests' });
    }

    // Create sell records for each accepted distributor
    const sellPromises = acceptedDistributors.map(async (acceptedDistributor) => {
      const distributorId = acceptedDistributor.userId; // Use userId as distributorId

      // Create a new sell record
      const sell = new Sell({
        userId: soleDistributorId,
        distributorId,
        product: productId,
        quantity,
        price,
        status: 'pending',
      });

      // Save the sell record
      await sell.save();
    });

    // Wait for all sell records to be created
    await Promise.all(sellPromises);

    // Update the product's quantity in the sole distributor's inventory
    product.quantity -= quantity;
    await product.save();

    // Find the accepted order for the sole distributor
    const order = await Order.findOne({
      userId: soleDistributorId,
      status: 'accepted',
      'orderItems.product': productId,
    });

    if (order) {
      // Update the quantity in the order
      const orderItem = order.orderItems.find((item) => item.product == productId);
      if (orderItem) {
        orderItem.quantity -= quantity;
        await order.save();
      }
    }

    res.json({ message: 'Product sold successfully to accepted distributors' });
  } catch (error) {
    console.error('Error selling product:', error);
    res.status(500).json({ message: 'Error selling product' });
  }
});


router.get('/soleDistributor/sold-products', authenticate, async (req, res) => {
    try {
        const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware

        // Find the products sold by the sole distributor and populate 'product' and 'distributorId' fields
        const soldProducts = await Sell.find({ userId })
            .populate('product') // Populate 'product' field
            .populate('distributorId'); // Populate 'distributorId' field

        // Now, you can use the populated data
        const productsWithDetails = soldProducts.map((soldProduct) => {
            return {
                _id: soldProduct._id,
                product: {
                    title: soldProduct.product.title,
                    description: soldProduct.product.description,
                    imageUrl: soldProduct.product.imageUrl
                },
                quantity: soldProduct.quantity,
                price: soldProduct.price,
                distributorId: {
                    name: soldProduct.distributorId.name,
                    // Add more distributor details here as needed
                },
                date: soldProduct.date,
                status: soldProduct.status,
            };
        });

        res.json(productsWithDetails);
    } catch (error) {
        console.error('Error fetching sold products:', error);
        res.status(500).json({ message: 'Error fetching sold products' });
    }
});





// Import your necessary modules and models here
router.get('/soleDistributor/sold-products/:id', authenticate, async (req, res) => {
    try {
        const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware

        // Find the product sold by the sole distributor with the specified _id and userId and populate 'product' and 'distributorId' fields
        const soldProduct = await Sell.findOne({ _id: req.params.id, userId: userId })
            .populate('product') // Populate 'product' field
            .populate('distributorId'); // Populate 'distributorId' field

        if (!soldProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Now, you can use the populated data
        const productWithDetails = {
            _id: soldProduct._id,
            product: {
                title: soldProduct.product.title,
                description: soldProduct.product.description,
                imageUrl: soldProduct.product.imageUrl
            },
            quantity: soldProduct.quantity,
            price: soldProduct.price,
            distributorId: {
                name: soldProduct.distributorId.name,
                // Add more distributor details here as needed
            },
            date: soldProduct.date,
            status: soldProduct.status,
        };

        res.json(productWithDetails);
    } catch (error) {
        console.error('Error fetching sold product:', error);
        res.status(500).json({ message: 'Error fetching sold product' });
    }
});



// Define a route to get monthly sales data for a sole distributor
router.get('/soleDistributor/monthlySales', authenticate, async (req, res) => {
    try {
      const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware
  
      // Aggregate to get monthly sales data for accepted sells
      const monthlySales = await Sell.aggregate([
        {
          $match: {
            userId: userId,
            status: 'accepted',
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$date' }, // Extract year and month
            },
            Sales: { $sum: 1 }, // Count of accepted sells
          },
        },
        {
          $project: {
            _id: 0,
            month: '$_id',
            Sales: 1,
          },
        },
      ]);
  
      // Create an array of all months from January to December
      const allMonths = [
        '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06',
        '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12', '2024-01', '2024-02'
      ];
  
      // Create a map to store sales for all months
      const monthlySalesMap = new Map();
      for (const month of allMonths) {
        monthlySalesMap.set(month, 0);
      }
  
      // Update the sales for the months with data
      for (const salesData of monthlySales) {
        monthlySalesMap.set(salesData.month, salesData.Sales);
      }
  
      // Convert the map to an array of objects
      const result = Array.from(monthlySalesMap, ([month, Sales]) => ({ month, Sales }));
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching monthly sales data:', error);
      res.status(500).json({ message: 'Error fetching monthly sales data' });
    }
  });


  // Define a route to get today's sales data for a sole distributor
router.get('/soleDistributor/todaySales', authenticate, async (req, res) => {
  try {
    const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware

    // Get the start and end of the current day in the sole distributor's timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to start of the next day


    // Find the sales for today with status 'accepted'
    const todaySales = await Sell.countDocuments({
      userId: userId,
      status: 'accepted',
      date: { $gte: today, $lt: tomorrow },
    });

    res.json({ todaySales });
  } catch (error) {
    console.error('Error fetching today\'s sales data:', error);
    res.status(500).json({ message: 'Error fetching today\'s sales data' });
  }
});


 // Define a route to get last week's sales data for a sole distributor
// Define a route to get last week's sales data for a sole distributor
// Define a route to get last week's sales data for a sole distributor
// Define a route to get last week's sales data for a sole distributor
router.get('/soleDistributor/lastWeekSales', authenticate, async (req, res) => {
    try {
      const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware
  
      // Get the start and end of the last week in the sole distributor's timezone
      const lastWeekStart = new Date();
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);
      lastWeekStart.setHours(0, 0, 0, 0);
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
  
      // Find the sales for last week with status 'accepted'
      const lastWeekSales = await Sell.countDocuments({
        userId: userId,
        status: 'accepted',
        date: { $gte: lastWeekStart, $lt: today },
      });
  
      res.json({ lastWeekSales });
    } catch (error) {
      console.error('Error fetching last week\'s sales data:', error);
      res.status(500).json({ message: 'Error fetching last week\'s sales data' });
    }
  });
  
// Define a route to get last month's sales data for a sole distributor
router.get('/soleDistributor/lastMonthSales', authenticate, async (req, res) => {
    try {
      const userId = req.userId; // Get the ID of the sole distributor from the authentication middleware
  
      // Get the start and end of the last month in the sole distributor's timezone
      const lastMonthStart = new Date();
      lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
      lastMonthStart.setHours(0, 0, 0, 0);
  
      const currentMonthStart = new Date();
      currentMonthStart.setHours(0, 0, 0, 0);
  
  
      // Find the sales for last month with status 'accepted'
      const lastMonthSales = await Sell.countDocuments({
        userId: userId,
        status: 'accepted',
        date: { $gte: lastMonthStart, $lt: currentMonthStart },
      });
  
      res.json({ lastMonthSales });
    } catch (error) {
      console.error('Error fetching last month\'s sales data:', error);
      res.status(500).json({ message: 'Error fetching last month\'s sales data' });
    }
  });
  



  


  
module.exports = router;
