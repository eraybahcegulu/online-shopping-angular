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
    const { name, description, price, quantity } = req.body;
  
    try {
      const newProduct = new Product({ name, description, price, quantity });
      const savedProduct = await newProduct.save();
  
      if (savedProduct) {
        res.status(200).json({ message: 'Product added successfully.' });
      }
    } catch (error) {
      console.error('Error adding product', error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  }

  async function deleteProduct(req, res) {
    const productId = req.params.productId;
    
    try {
      const existingProduct = await Product.findById(productId);
      
      if (!existingProduct) {
        return res.status(400).json({ message: 'Product not found.' });
      }
  
      await Product.deleteOne({ _id: productId });
      return res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      console.error('Error deleting product', error);
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  }

  async function updateProduct(req, res) {
    const productId = req.params.productId;
    const { name, description, price, quantity } = req.body;
  
    try {
      const existingProduct = await Product.findById(productId);
  
      if (!existingProduct) {
        return res.status(400).json({ message: 'Product not found.' });
      }
  
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.quantity = quantity;

      const updatedProduct = await existingProduct.save();
  
      if (updatedProduct) {
        return res.status(200).json({ message: 'Product updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating product', error);
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  }
module.exports = { getProducts, addProduct, deleteProduct, updateProduct };