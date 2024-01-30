const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sole Distributors', // Reference to the sole distributor model
    required: true,
  },
  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'distributors', // Reference to the distributor model
   
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products', // Reference to the product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending', // Set the default status to 'pending'
  }
});

const Sell = mongoose.model('Sell', sellSchema);
module.exports = Sell;
