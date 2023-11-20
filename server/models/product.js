const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model('Product', productSchema);
