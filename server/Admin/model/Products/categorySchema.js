const mongoose = require('mongoose');
const Products = require('./productSchema')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // enum: ['Mobile Phones', 'Tablets', 'TVs', 'Computers', 'Watches']
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]

});

const Category = module.exports = mongoose.model('Category', categorySchema);
module.exports = Category;
