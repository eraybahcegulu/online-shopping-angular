const express = require('express');
const router = express.Router();
const { addCart , getCartTotalItems } = require('../controllers/cartController');

router.post('/addCart', async (req, res) => {
    addCart(req, res);
});

router.get('/getCartTotalItems/:customerId', async (req, res) => {
    getCartTotalItems(req,res)
    
  });

module.exports = router;