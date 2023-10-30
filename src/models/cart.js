const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customer_id: String,
  product_id: String,
  product_name: String,
  product_type: String,
  product_description: String,
  product_price: Number,
});

module.exports = mongoose.model('Cart', cartSchema);