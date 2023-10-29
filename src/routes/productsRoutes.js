const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/productsController');

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

module.exports = router;