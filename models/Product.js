const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: {
    type: Date,
    default: null,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;