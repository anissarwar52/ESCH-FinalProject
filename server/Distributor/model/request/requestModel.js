const mongoose = require('mongoose');
const Distributor = require('../disLogin/distSchema')

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'distributors', 
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // Set the default status to 'pending'
  }



});

// requestSchema.index({ userId: 1, date: 1 }, { unique: true }); 

const Request = mongoose.model('request', requestSchema);

module.exports = Request;
