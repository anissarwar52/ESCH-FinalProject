const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../../model/order/orderModel');
const Product = require('../../../Admin/model/Products/productSchema'); 
const authenticate = require('../../middleware/authenticate')

router.post('/soleDistributor/placeOrder',authenticate, async (req, res) => {
    const {address, orderItems } = req.body;
    const userId = req.userId; 
    const newOrder = new Order({userId, address, orderItems, Date: new Date(),status: 'pending', });
  
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
router.get('/soleDistributor/orders', authenticate, async (req, res) => {
  try {
      const pendingOrders = await Order.find({ status: 'pending' })
      .populate({
        path: 'userId',
        select: 'email name', // Specify the fields to populate
    }).populate({
      path: 'orderItems.product',
      model: 'Products',
      select: 'title imageUrl', // Specify the fields you want to select
    })
    .sort({ Date: -1 })

      // Map the pending orders to include product titles and user email and name
      const pendingOrdersWithProductTitles = pendingOrders.map((order) => ({
          _id: order._id,
          address: order.address,
          Date: order.Date,
          status: order.status,
          userId: {
              email: order.userId.email,
              name: order.userId.name,
          },
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
router.get('/soleDistributor/orders/history', authenticate, async (req, res) => {
  try {
      const historyOrders = await Order.find({ status: { $in: ['accepted', 'rejected'] }})
          .populate({
              path: 'userId',
              select: 'email name', // Specify the fields to populate
          }).populate({
            path: 'orderItems.product',
            model: 'Products',
            select: 'title imageUrl', // Specify the fields you want to select
          })
          .sort({ Date: -1 })

      // Map the history orders to include product titles and user email and name
      const historyOrdersWithProductTitles = historyOrders.map((order) => ({
          _id: order._id,
          address: order.address,
          Date: order.Date,
          status: order.status,
          userId: {
              email: order.userId.email,
              name: order.userId.name,
          },
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

router.get('/soleDistributor/orders/history/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;
  try {
    const historyOrder = await Order.findOne({ _id: orderId, status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'userId',
        select: 'email name', // Specify the fields to populate
      })
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
      address: historyOrder.address,
      Date: historyOrder.Date,
      status: historyOrder.status,
      userId: {
        email: historyOrder.userId.email,
        name: historyOrder.userId.name,
      },
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
router.get('/soleDistributor/orders/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;
  try {
    const pendingOrder = await Order.findOne({ _id: orderId, status: 'pending' })
      .populate({
        path: 'userId',
        select: 'email name', // Specify the fields to populate
      })
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
      address: pendingOrder.address,
      Date: pendingOrder.Date,
      status: pendingOrder.status,
      userId: {
        email: pendingOrder.userId.email,
        name: pendingOrder.userId.name,
      },
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
router.delete('/soleDistributor/orders/:id',authenticate, async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Error canceling order' });
  }
});

// Admin Routes for managing orders Accept or reject

// Admin Route for managing pending orders
// Admin Routes for managing orders Accept or reject
router.get('/admin/orders', async (req, res) => {
  try {
    // Fetch pending orders first and sort them by Date in descending order
    const pendingOrders = await Order.find({ status: 'pending' })
      .populate({
        path: 'userId',
        model: 'Sole Distributors',
        select: 'name email',
      })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 }); // Sort by Date in descending order

    const ordersWithProductTitles = pendingOrders.map((order) => ({
      _id: order._id,
      address: order.address,
      Date: order.Date,
      status: order.status,
      distributor: {
        name: order.userId.name,
        email: order.userId.email,
      },
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
router.get('/admin/orders/history', async (req, res) => {
  try {
    const historyOrders = await Order.find({ status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'userId',
        model: 'Sole Distributors',
        select: 'name email',
      })
      .populate({
        path: 'orderItems.product',
        model: 'Products',
        select: 'title imageUrl', // Specify the fields you want to select
      })
      .sort({ Date: -1 });

    const ordersWithProductTitles = historyOrders.map((order) => ({
      _id: order._id,
      address: order.address,
      Date: order.Date,
      status: order.status,
      distributor: {
        name: order.userId.name,
        email: order.userId.email,
      },
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
router.get('/admin/orders/history/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const specificOrder = await Order.findOne({ _id: orderId, status: { $in: ['accepted', 'rejected'] } })
      .populate({
        path: 'userId',
        model: 'Sole Distributors',
        select: 'name email',
      })
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
      address: specificOrder.address,
      Date: specificOrder.Date,
      status: specificOrder.status,
      distributor: {
        name: specificOrder.userId.name,
        email: specificOrder.userId.email,
      },
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
router.get('/admin/orders/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const specificOrder = await Order.findById(orderId)
      .populate({
        path: 'userId',
        model: 'Sole Distributors',
        select: 'name email',
      })
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
      address: specificOrder.address,
      Date: specificOrder.Date,
      status: specificOrder.status,
      distributor: {
        name: specificOrder.userId.name,
        email: specificOrder.userId.email,
      },
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
router.put('/admin/orders/:id', async (req, res) => {
    try {
        const { action } = req.body; // Expect 'action' to be 'accept' or 'reject'
        const orderId = req.params.id;

        const order = await Order.findById(orderId);

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

        res.json({ message: `Order has been ${action === "accept" ? "accepted" : "rejected"}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error processing order" });
    }
});


router.get('/soleDistributor/my-products', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the accepted orders for the sole distributor
    const orders = await Order.find({
      userId: userId,
      status: 'accepted'
    }).populate('orderItems.product');

    // Create an inventory to keep track of products
    const inventory = {};

    // Update the inventory based on accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        const { product, quantity } = orderItem;

        // Check if the product is already in the inventory
        if (inventory[product]) {
          // If found, update the quantity
          inventory[product].quantity += quantity;
        } else {
          // If not found, add it to the inventory
          inventory[product] = {
            product,
            quantity,
          };
        }
      });
    });

    // Map the product details to include product titles and _id
    const productsWithTitles = [];

    for (const productInfo of Object.values(inventory)) {
      const product = await Product.findById(productInfo.product);

      if (product) {
        productsWithTitles.push({
          _id: product._id, // Include the _id field
          title: product.title,
          quantity: productInfo.quantity,
          description: product.description,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
        });
      }
    }

    res.json(productsWithTitles);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});


//specific inventory page

// Route to fetch details for a specific product
router.get('/soleDistributor/my-products/:id', authenticate, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      res.json({
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
});





// Route to get products with low stock
router.get('/soleDistributor/low-stock', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the accepted orders for the sole distributor
    const orders = await Order.find({
      userId: userId,
      status: 'accepted',
    }).populate('orderItems.product');

    // Create an inventory to keep track of products
    const inventory = {};

    // Update the inventory based on accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        const { product, quantity } = orderItem;

        // Check if the product is already in the inventory
        if (inventory[product]) {
          // If found, update the quantity
          inventory[product].quantity += quantity;
        } else {
          // If not found, add it to the inventory
          inventory[product] = {
            product,
            quantity,
          };
        }
      });
    });

    // Map the product details to include product titles and image URLs
    const lowStockItems = [];

    for (const productInfo of Object.values(inventory)) {
      const product = await Product.findById(productInfo.product);

      if (product) {
        const item = {
          title: product.title,
          quantity: productInfo.quantity,
          description: product.description,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl, // Include the image URL
        };

        lowStockItems.push(item);
      }
    }

    // Detect products with low stock
    const lowStockNotifications = lowStockItems
      .filter((item) => item.quantity <= 1)
      .map((item) => ({
        title: item.title,
        quantity: item.quantity,
        imageUrl: item.imageUrl, // Include the image URL in low stock items
      }));

    res.json(lowStockNotifications);
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    res.status(500).json({ message: 'Error fetching low stock products' });
  }
});


//Sales

router.get('/admin/sales', async (req, res) => {
  try {
    // Count the number of accepted orders
    const acceptedOrdersCount = await Order.countDocuments({
      status: 'accepted'
    });

    // Send the count as a response
    res.json({ acceptedOrdersCount });
  } catch (error) {
    console.error('Error counting accepted orders:', error);
    res.status(500).json({ message: 'Error counting accepted orders' });
  }
});


// Earnings
router.get('/admin/earnings', async (req, res) => {
  try {

    // Find the accepted orders for the sole distributor
    const orders = await Order.find({
      status: 'accepted'
    });

    let Total = 0;

    // Calculate total earnings by summing up the total prices of all accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        Total += orderItem.total;
      });
    });

    res.json({ Total });
  } catch (error) {
    console.error('Error fetching earnings:', error);
    res.status(500).json({ message: 'Error fetching earnings' });
  }
});


// Define a route to get monthly sales data
router.get('/admin/monthlyEarnings', async (req, res) => {
  try {
    const monthlyEarnings = await Order.aggregate([
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
          Total: { $sum: { $sum: '$orderItems.total' } },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          Total: 1,
        },
      },
    ]);

    // Create an array of all months from January to December
    const allMonths = [
      '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06',
      '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12', '2024-01', '2024-02'
    ];

    // Create a map to store earnings for all months
    const monthlyEarningsMap = new Map();
    for (const month of allMonths) {
      monthlyEarningsMap.set(month, 0);
    }

    // Update the earnings for the months with data
    for (const earningsData of monthlyEarnings) {
      monthlyEarningsMap.set(earningsData.month, earningsData.Total);
    }

    // Convert the map to an array of objects
    const result = Array.from(monthlyEarningsMap, ([month, Total]) => ({ month, Total }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching monthly earnings data:', error);
    res.status(500).json({ message: 'Error fetching monthly earnings data' });
  }
});


// Earnings for today
router.get('/admin/todayEarnings', async (req, res) => {
  try {
    // Find the accepted orders for the sole distributor that have today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to start of the next day

    const orders = await Order.find({
      status: 'accepted',
      Date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    let todayEarnings = 0;

    // Calculate total earnings by summing up the total prices of all accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        todayEarnings += orderItem.total;
      });
    });

    res.json({ todayEarnings });
  } catch (error) {
    console.error('Error fetching today earnings:', error);
    res.status(500).json({ message: 'Error fetching today earnings' });
  }
});

// Earnings for last week
router.get('/admin/lastWeekEarnings', async (req, res) => {
  try {
    // Find the accepted orders for the sole distributor in the last week
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      status: 'accepted',
      Date: {
        $gte: lastWeekStart,
      },
    });

    let lastWeekEarnings = 0;

    // Calculate total earnings by summing up the total prices of all accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        lastWeekEarnings += orderItem.total;
      });
    });

    res.json({ lastWeekEarnings });
  } catch (error) {
    console.error('Error fetching last week earnings:', error);
    res.status(500).json({ message: 'Error fetching last week earnings' });
  }
});

// Earnings for last month
router.get('/admin/lastMonthEarnings', async (req, res) => {
  try {
    // Find the accepted orders for the sole distributor in the last month
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      status: 'accepted',
      Date: {
        $gte: lastMonthStart,
      },
    });

    let lastMonthEarnings = 0;

    // Calculate total earnings by summing up the total prices of all accepted orders
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        lastMonthEarnings += orderItem.total;
      });
    });

    res.json({ lastMonthEarnings });
  } catch (error) {
    console.error('Error fetching last month earnings:', error);
    res.status(500).json({ message: 'Error fetching last month earnings' });
  }
});



const linearRegression = (x, y) => {
  const n = x.length;

  // Calculate the means of x and y
  const xMean = x.reduce((acc, val) => acc + val, 0) / n;
  const yMean = y.reduce((acc, val) => acc + val, 0) / n;

  // Calculate the slope (b1) and y-intercept (b0) using the least squares method
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += (x[i] - xMean) ** 2;
  }

  const b1 = numerator / denominator;
  const b0 = yMean - b1 * xMean;

  return { b0, b1 };
};

router.get('/admin/predictNextMonthEarnings', async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Fetch earnings data for the previous 11 months
    const prev11MonthsData = await Order.aggregate([
      {
        $match: {
          status: 'accepted',
          'Date': {
            $lt: currentDate, // Use the current date
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$Date' },
          },
          Total: { $sum: { $sum: '$orderItems.total' } },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          Total: 1,
        },
      },
    ]);

    // Separate months and earnings into arrays
    const months = prev11MonthsData.map((data) => parseInt(data.month.split('-')[1])); // Extract month part and convert to integer
    const earnings = prev11MonthsData.map((data) => data.Total);

    // Use linear regression to predict the next month
    const { b0, b1 } = linearRegression(months, earnings);

    // Predict the earnings for the next month
    const nextMonthIndex = months.length + 1;
    const predictedNextMonth = Math.round(b0 + b1 * nextMonthIndex);

    // Format the response
    const response = [{ month: '2024-01', Total: predictedNextMonth }];

    // Send the predicted earnings for the next month
    res.json(response);
  } catch (error) {
    console.error('Error predicting next month earnings:', error);
    res.status(500).json({ message: 'Error predicting next month earnings' });
  }
});





module.exports = router;











module.exports = router;
