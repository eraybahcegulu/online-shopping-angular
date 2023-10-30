const Product = require('../models/product');
const ProductType = require('../models/productType');

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
    const { name, type, description, price, quantity } = req.body;
  
    try {
      const newProduct = new Product({ name, type, description, price, quantity });
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
    const { name, type, description, price, quantity } = req.body;
  
    try {
      const existingProduct = await Product.findById(productId);
  
      if (!existingProduct) {
        return res.status(400).json({ message: 'Product not found.' });
      }
  
      existingProduct.name = name;
      existingProduct.type = type;
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

  async function addProductType(req, res) {
    const { type } = req.body;
  
    try {
      const newProductType = new ProductType({ type });
      const savedProductType = await newProductType.save();
  
      if (savedProductType) {
        res.status(200).json({ message: 'Product Type added successfully.' });
      }
    } catch (error) {
      console.error('Error adding product type', error);
      res.status(500).json({ message: 'Error adding product type', error: error.message });
    }
  }

  async function getProductTypes(req, res) {
    try {
      const productTypes = await ProductType.find();
      res.json(productTypes);
    } catch (error) {
      console.error('Error getting product types', error);
      res.status(500).json({ status: 500, message: 'Error getting product types', error: error.message });
    }
  }

  
  async function deleteProductType(req, res) {
    const productTypeId = req.params.productTypeId;
    
    try {
      const existingProductType = await ProductType.findById(productTypeId);
      
      if (!existingProductType) {
        return res.status(400).json({ message: 'Product type not found.' });
      }
  
      await ProductType.deleteOne({ _id: productTypeId });
      return res.status(200).json({ message: 'Product type deleted successfully.' });
    } catch (error) {
      console.error('Error deleting product type', error);
      res.status(500).json({ message: 'Error deleting product type', error: error.message });
    }
  }

  async function updateProductType(req, res) {
    const productTypeId = req.params.productTypeId;
    const { type } = req.body;
  
    try {
      const existingProductType = await ProductType.findById(productTypeId);
  
      if (!existingProductType) {
        return res.status(400).json({ message: 'Product not found.' });
      }
  
      existingProductType.type = type;


      const updatedProductType = await existingProductType.save();
  
      if (updatedProductType) {
        return res.status(200).json({ message: 'Product type updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating product type', error);
      res.status(500).json({ message: 'Error updating product type', error: error.message });
    }
  }

  async function addedCart(req, res) {
    const productId = req.params.productId;
  
    try {
      const existingProduct = await Product.findById(productId);
      
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      
      if (existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
        await existingProduct.save();
      }
  
      return res.status(200).json({ message: 'Product quantity decremented successfully.' });
    } catch (error) {
      console.error('Error decrementing product quantity', error);
      res.status(500).json({ message: 'Error decrementing product quantity', error: error.message });
    }
  }

  
module.exports = { getProducts, addProduct, deleteProduct, updateProduct, addProductType, getProductTypes, deleteProductType , updateProductType, addedCart };