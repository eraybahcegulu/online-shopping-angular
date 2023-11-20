const Cart = require('../models/cart');
const Product = require('../models/product');

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

async function getCartProducts(req, res) {
  const customerId = req.params.customerId;
  try {
    const cartProducts = await Cart.find({ customer_id: customerId });
    res.json(cartProducts);
  } catch (error) {
    console.error('Error getting cart products', error);
    res.status(500).json({ message: 'Error getting cart products', error: error.message });
  }
}

async function removeCart(req, res) {
  const { _id, product_id } = req.body;
  
  try {
    const existingCart = await Cart.findById(_id);
    const existingProduct = await Product.findById(product_id);

    if (!existingCart) {
      return res.status(400).json({ message: 'Cart not found.' });
    }

    if (!existingProduct) {
      return res.status(400).json({ message: 'Product not found.' });
    }

    await Cart.deleteOne({ _id: _id });
    existingProduct.quantity += 1;
    await existingProduct.save();

    return res.status(200).json({ message: 'Product added successfully.' });
    
  } catch (error) {
    console.error('Error deleting product', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
}

module.exports = { addCart, getCartTotalItems, getCartProducts , removeCart };