const Product = require('../models/product');

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ status: 500, message: 'Error getting products', error: error.message });
  }
}

async function addProduct(req, res) {
    const { name, description, price } = req.body;
  
    try {
      const newProduct = new Product({ name, description, price });
      const savedProduct = await newProduct.save();
  
      if (savedProduct) {
        res.status(200).json({ message: 'Product added successfully.' });
      }
    } catch (error) {
      console.error('Error adding product', error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  }
module.exports = { getProducts, addProduct };
