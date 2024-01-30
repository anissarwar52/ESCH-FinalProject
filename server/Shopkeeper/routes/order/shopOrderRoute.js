const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ShopkeeperOrder = require('../../model/order/ShopkeeperOrder');
const authenticate = require("../../../Distributor/middleware/authenticate")
const Product = require('../../../Admin/model/Products/productSchema')
const Sell = require('../../../SoleDistributor/model/Sell/sellSchema')

router.post('/shopkeeper/placeOrder', async (req, res) => {
      const { shop, orderItems } = req.body;
  
      // Validate if the required fields are present
      if (!shop || !orderItems || orderItems.length === 0) {
        return res.status(400).json({ error: 'Invalid request. Please provide shop and orderItems.' });
      }
      const newOrder = new ShopkeeperOrder({shop, orderItems, Date: new Date(),status: 'pending', });
        
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      await newOrder.save();
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error placing order:', error); // Log the error
      res.status(500).json({ message: 'Error placing order' });
    }
  });
  
    // Route to fetch all orders
// Route to fetch pending orders
  router.get('/shopkeeper/orders', async (req, res) => {
    try {
        const pendingOrders = await ShopkeeperOrder.find({ status: 'pending' })
       .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 })
  
        // Map the pending orders to include product titles and user email and name
        const pendingOrdersWithProductTitles = pendingOrders.map((order) => ({
            _id: order._id,
            shop: order.shop,
            Date: order.Date,
            status: order.status,
            orderItems: order.orderItems.map((item) => ({
              product: {
                title: item.product.title,
                imageUrl: item.product.imageUrl,
              },
                quantity: item.quantity,
                total: item.total,
            })),
        }));
  
        res.json(pendingOrdersWithProductTitles);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        res.status(500).json({ message: 'Error fetching pending orders' });
    }
  });
  

  // Route to fetch accepted and rejected orders
router.get('/shopkeeper/orders/history', async (req, res) => {
  try {
      const historyOrders = await ShopkeeperOrder.find({ status: { $in: ['accepted', 'rejected'] }})
        .populate({
            path: 'orderItems.product',
            model: 'Products',
            select: 'title imageUrl', // Specify the fields you want to select
          })
          .sort({ Date: -1 })

      // Map the history orders to include product titles and user email and name
      const historyOrdersWithProductTitles = historyOrders.map((order) => ({
        _id: order._id,
          shop: order.shop,
          Date: order.Date,
          status: order.status,
          orderItems: order.orderItems.map((item) => ({
            product: {
              title: item.product.title,
              imageUrl: item.product.imageUrl,
            },
              quantity: item.quantity,
              total: item.total,
          })),
      }));

      res.json(historyOrdersWithProductTitles);
  } catch (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ message: 'Error fetching order history' });
  }
});


router.get('/shopkeeper/orders/history/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const historyOrder = await ShopkeeperOrder.findOne({ _id: orderId, status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      });

    if (!historyOrder) {
      return res.status(404).json({ message: 'Order not found in history' });
    }

    // Map the order to include product titles and user email and name
    const historyOrderWithProductTitles = {
      _id: historyOrder._id,
      shop: historyOrder.shop,
      Date: historyOrder.Date,
      status: historyOrder.status,
      orderItems: historyOrder.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    };

    res.json(historyOrderWithProductTitles);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Error fetching order history' });
  }
});
  


/// Specific Sole Distributor new order details
router.get('/shopkeeper/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const pendingOrder = await ShopkeeperOrder.findOne({ _id: orderId, status: 'pending' })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 });

    // Check if there is a pendingOrder
    if (!pendingOrder) {
      return res.status(404).json({ message: 'No pending order found' });
    }

    // Map the pending order to include product titles and user email and name
    const pendingOrderWithProductTitles = {
      _id: pendingOrder._id,
      shop: pendingOrder.shop,
      Date: pendingOrder.Date,
      status: pendingOrder.status,
      orderItems: pendingOrder.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    };

    res.json(pendingOrderWithProductTitles);
  } catch (error) {
    console.error('Error fetching pending order:', error);
    res.status(500).json({ message: 'Error fetching pending order' });
  }
});



  
  

// Cancel Order
router.delete('/shopkeeper/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await ShopkeeperOrder.findOneAndDelete({ _id: orderId });
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Error canceling order' });
  }
});


// Distributor Routes for seeing new orders that are currently in pending state
router.get('/distributor/orders',authenticate, async (req, res) => {
  try {
    // Fetch pending orders first and sort them by Date in descending order
    const pendingOrders = await ShopkeeperOrder.find({ status: 'pending' })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 }); // Sort by Date in descending order

    const ordersWithProductTitles = pendingOrders.map((order) => ({
      _id: order._id,
      shop: order.shop,
      Date: order.Date,
      status: order.status,
      orderItems: order.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    }));

    res.json(ordersWithProductTitles);
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({ message: 'Error fetching pending orders' });
  }
});



// Admin Route for viewing order history (accepted or rejected orders)
router.get('/distributor/orders/history', authenticate,  async (req, res) => {
  try {
    const historyOrders = await ShopkeeperOrder.find({ status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 });

    const ordersWithProductTitles = historyOrders.map((order) => ({
      _id: order._id,
      shop: order.shop,
      Date: order.Date,
      status: order.status,
      orderItems: order.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    }));

    res.json(ordersWithProductTitles);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Error fetching order history' });
  }
});

// specific order history

// Admin Route for getting a specific order from history by ID
router.get('/distributor/orders/history/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;

  try {
    const specificOrder = await ShopkeeperOrder.findOne({ _id: orderId, status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      });

    if (!specificOrder) {
      return res.status(404).json({ message: 'Order not found in history' });
    }

    const orderDetails = {
      _id: specificOrder._id,
      shop: specificOrder.shop,
      Date: specificOrder.Date,
      status: specificOrder.status,
      orderItems: specificOrder.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    };

    res.json(orderDetails);
  } catch (error) {
    console.error('Error fetching specific order from history:', error);
    res.status(500).json({ message: 'Error fetching specific order from history' });
  }
});


//specific new order
// Admin Route for getting a specific order by ID
router.get('/distributor/orders/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;

  try {
    const specificOrder = await ShopkeeperOrder.findById(orderId)
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      });

    if (!specificOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderDetails = {
      _id: specificOrder._id,
      shop: specificOrder.shop,
      Date: specificOrder.Date,
      status: specificOrder.status,
      orderItems: specificOrder.orderItems.map((item) => ({
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
        },
        quantity: item.quantity,
        total: item.total,
      })),
    };

    res.json(orderDetails);
  } catch (error) {
    console.error('Error fetching specific order:', error);
    res.status(500).json({ message: 'Error fetching specific order' });
  }
});


// Accept or reject
// Accept or reject
router.put('/distributor/orders/:id', authenticate, async (req, res) => {
  try {
    const { action } = req.body; // Expect 'action' to be 'accept' or 'reject'
    const orderId = req.params.id;

    const order = await ShopkeeperOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (action === "accept") {
      // Check if the order is already accepted or rejected
      if (order.status === 'accepted' || order.status === 'rejected') {
        return res.status(400).json({ error: "Order has already been processed" });
      }

      // Check product quantities
      for (const orderItem of order.orderItems) {
        const { product, quantity } = orderItem;

        const productDoc = await Product.findById(product);

        // Ensure there is enough stock
        if (!productDoc || productDoc.quantity < quantity) {
          return res.status(400).json({ message: `Insufficient stock for product ${productDoc ? productDoc.title : 'unknown'}` });
        }

        // Subtract ordered quantity from product's quantity
        productDoc.quantity -= quantity;
        await productDoc.save();
      }

      // If all checks pass, mark the order as "accepted"
      order.status = 'accepted';
    } else if (action === "reject") {
      if (order.status === 'accepted' || order.status === 'rejected') {
        return res.status(400).json({ error: "Order has already been processed" });
      }
      // Mark the order as "rejected"
      order.status = 'rejected';
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    // Save the updated order to change the status
    await order.save();

    // Update the distributor's product quantities based on the accepted order
    if (action === "accept") {
      for (const orderItem of order.orderItems) {
        const { product, quantity } = orderItem;

        const distributorProduct = await Sell.findOne({ product, status: "accepted" });

        if (distributorProduct) {
          distributorProduct.quantity -= quantity;
          await distributorProduct.save();
        }
      }
    }

    res.json({ message: `Order has been ${action === "accept" ? "accepted" : "rejected"}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing order" });
  }
});





router.get('/shopkeeper/buyed-products', async (req, res) => {
  try {
    const acceptedOrders = await ShopkeeperOrder.find({ status: 'accepted' })
      .populate({
        path: 'orderItems.product',
        model: 'Products', // Adjust the model name as needed
        select: 'title imageUrl', // Specify the fields you want to select
      });

    const buyedProducts = [];

    acceptedOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const product = item.product;
        buyedProducts.push({
          orderId: order._id,
          title: product.title,
          imageUrl: product.imageUrl,
          quantity: item.quantity,
          total: item.total,
          date: order.date,
        });
      });
    });

    res.json(buyedProducts);
  } catch (error) {
    console.error('Error fetching buyed products:', error);
    res.status(500).json({ message: 'Error fetching buyed products' });
  }
});

//Sales

router.get('/distributor/sales', async (req, res) => {
  try {
    // Count the number of accepted orders
    const acceptedOrdersCount = await ShopkeeperOrder.countDocuments({
      status: 'accepted'
    });

    // Send the count as a response
    res.json({ acceptedOrdersCount });
  } catch (error) {
    console.error('Error counting accepted orders:', error);
    res.status(500).json({ message: 'Error counting accepted orders' });
  }
});


router.get('/distributor/monthlySales', authenticate, async (req, res) => {
  try {
    const monthlySales = await ShopkeeperOrder.aggregate([
      {
        $match: {
          status: 'accepted',
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$Date' }, // Extract year and month
          },
          Sales: { $sum: 1 },
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

    const monthlySalesMap = new Map();
    for (const month of allMonths) {
      monthlySalesMap.set(month, 0);
    }


    for (const salesData of monthlySales) {
      monthlySalesMap.set(salesData.month, salesData.Sales);
    }

    // Convert the map to an array of objects
    const result = Array.from(monthlySalesMap, ([month, Sales]) => ({ month, Sales }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching monthly earnings data:', error);
    res.status(500).json({ message: 'Error fetching monthly earnings data' });
  }
});


router.get('/distributor/todaySales', authenticate, async (req, res) => {
  try {
    
    // Get the start and end of the current day in the sole distributor's timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to start of the next day


    // Find the sales for today with status 'accepted'
    const todaySales = await ShopkeeperOrder.countDocuments({
      status: 'accepted',
      Date: { $gte: today, $lt: tomorrow },
    });

    res.json({ todaySales });
  } catch (error) {
    console.error('Error fetching today\'s sales data:', error);
    res.status(500).json({ message: 'Error fetching today\'s sales data' });
  }
});


router.get('/distributor/lastWeekSales', authenticate, async (req, res) => {
  try {
   
    // Get the start and end of the last week in the sole distributor's timezone
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    // Find the sales for last week with status 'accepted'
    const lastWeekSales = await ShopkeeperOrder.countDocuments({
      status: 'accepted',
      Date: { $gte: lastWeekStart, $lt: today },
    });

    res.json({ lastWeekSales });
  } catch (error) {
    console.error('Error fetching last week\'s sales data:', error);
    res.status(500).json({ message: 'Error fetching last week\'s sales data' });
  }
});


router.get('/distributor/lastMonthSales', authenticate, async (req, res) => {
  try {

    // Get the start and end of the last month in the sole distributor's timezone
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setHours(0, 0, 0, 0);

    const currentMonthStart = new Date();
    currentMonthStart.setHours(0, 0, 0, 0);


    // Find the sales for last month with status 'accepted'
    const lastMonthSales = await ShopkeeperOrder.countDocuments({
      status: 'accepted',
      Date: { $gte: lastMonthStart, $lt: currentMonthStart },
    });

    res.json({ lastMonthSales });
  } catch (error) {
    console.error('Error fetching last month\'s sales data:', error);
    res.status(500).json({ message: 'Error fetching last month\'s sales data' });
  }
});




module.exports = router;
