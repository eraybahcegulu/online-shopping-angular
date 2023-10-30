const Cart = require('../models/cart');

async function addCart(req, res) {
  const { customer_id, product_id, product_name, product_type, product_description, product_price } = req.body;

  try {
    const newCart = new Cart({ customer_id, product_id, product_name, product_type, product_description, product_price });
    const savedCart = await newCart.save();

    if (savedCart) {
      res.status(200).json({ message: 'Product added to cart successfully.' });
    }
  } catch (error) {
    console.error('Error adding product to cart', error);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
}

async function getCartTotalItems(req, res) {
  const customerId = req.params.customerId;
  try {
    const carts = await Cart.find({ customer_id: customerId });
    const totalItems = carts.length;
    res.json(totalItems);
  } catch (error) {
    console.error('Error getting cart total items', error);
    res.status(500).json({ message: 'Error getting cart total items', error: error.message });
  }
}

module.exports = { addCart, getCartTotalItems };