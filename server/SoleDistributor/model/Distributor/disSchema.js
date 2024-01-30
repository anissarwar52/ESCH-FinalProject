const mongoose = require('mongoose');
const soleDistributor = require("../../model/soleLogin/soleSchema");

const disSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sole Distributors', // Reference to the User model
    required: true,
  },
      imageUrl: {
        type: String,
        required: true
       },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      }

});

const disUsers = mongoose.model('Distributors Users', disSchema);
module.exports = disUsers;