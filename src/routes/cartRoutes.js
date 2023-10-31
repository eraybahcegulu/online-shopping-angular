const express = require('express');
const router = express.Router();
const { addCart , getCartTotalItems , getCartProducts , removeCart} = require('../controllers/cartController');

router.post('/addCart', async (req, res) => {
    addCart(req, res);
});

router.get('/getCartTotalItems/:customerId', async (req, res) => {
    getCartTotalItems(req,res)
    
  });

  router.get('/getCartProducts/:customerId', async (req, res) => {
    getCartProducts(req,res)
    
  });

  router.post('/removeCart', async (req, res) => {
    removeCart(req,res)
    
  });
  
module.exports = router;