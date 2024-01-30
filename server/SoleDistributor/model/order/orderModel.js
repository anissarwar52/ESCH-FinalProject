const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sole Distributors', 
        required: true,
      },
    address:{
        type:String,
        required: true
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
      }

})

const Order = new mongoose.model('Order', orderSchema)
module.exports = Order;