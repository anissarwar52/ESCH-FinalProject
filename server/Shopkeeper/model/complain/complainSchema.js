const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products', // Reference to the Product model
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Default status is 'Pending'
  }
  
})
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
