const express = require('express');
const router = express.Router();
const { registerCustomer } = require('../controllers/registerController');

router.post('/register', async (req, res) => {
  registerCustomer(req, res);
});

module.exports = router;