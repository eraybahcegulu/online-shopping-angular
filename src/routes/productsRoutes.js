const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productsController');

router.get('/products', async (req, res) => {
  getProducts(req, res);
});

router.post('/addProduct', async (req, res) => {
  addProduct(req, res);
});

module.exports = router;