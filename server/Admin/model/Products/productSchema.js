const mongoose = require('mongoose');
const Category = require('../../model/Products/categorySchema')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference categories
        ref: 'Category', // Reference the 'Category' model
        required: true,
    },
    imageUrl:{
      type:String,
      required: true
  },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Set the default value to 1
      },
      soleDistributor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sole Distributors' },


});

const Products = mongoose.model('Products', productSchema);
module.exports = Products;