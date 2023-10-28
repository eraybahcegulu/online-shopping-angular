const express = require('express');
const router = express.Router();
const { getCustomers, addCustomer, deleteCustomer } = require('../controllers/customersController');

router.get('/customers', async (req, res) => {
  getCustomers(req, res);
});

router.post('/addCustomer', async (req, res) => {
  addCustomer(req, res);
});

router.delete('/deleteCustomer/:customerId', async (req, res) => {
  deleteCustomer(req, res);
});

module.exports = router;