const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct, getProductTypes, addProductType, deleteProductType, updateProductType, addedCart } = require('../controllers/productsController');

router.get('/products', async (req, res) => {
  getProducts(req, res);
});

router.post('/addProduct', async (req, res) => {
  addProduct(req, res);
});

router.delete('/deleteProduct/:productId', async (req, res) => {
  deleteProduct(req, res);
});

router.put('/updateProduct/:productId', async (req, res) => {
  updateProduct(req, res);
});

router.get('/productTypes', async (req, res) => {
  getProductTypes(req, res);
});

router.post('/addProductType', async (req, res) => {
  addProductType(req, res);
});

router.delete('/deleteProductType/:productTypeId', async (req, res) => {
  deleteProductType(req, res);
});

router.put('/updateProductType/:productTypeId', async (req, res) => {
  updateProductType(req, res);
});

router.delete('/addedCart/:productId', async (req, res) => {
  addedCart(req, res);
});

module.exports = router;