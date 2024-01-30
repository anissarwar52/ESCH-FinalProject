const mongoose = require('mongoose');

const shopkeeperOrderSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: Number,
      total: Number, 
    },
  ],
  Date: {
    type: Date,
    default: Date.now, // Automatically sets the current date
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

const ShopkeeperOrder = mongoose.model('ShopkeeperOrder', shopkeeperOrderSchema);

module.exports = ShopkeeperOrder;
