const Customer = require('../models/customer');

async function getCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error getting customers', error);
    res.status(500).json({ status: 500, message: 'Error getting customers', error: error.message });
  }
}

async function addCustomer(req, res) {
    const { email, password } = req.body;
    try {
      const existingCustomer = await Customer.findOne({ email });
  
      if (existingCustomer) {
        res.status(400).json({ message: 'Email is already registered.' });
      } else {

        
        const newCustomer = new Customer({ email, password });
        const savedCustomer = await newCustomer.save();
  
        if (savedCustomer) {
          res.status(200).json({ message: 'Customer added successfully.' });
        }
      }
    } catch (error) {
      console.error('Error adding customer', error);
      res.status(500).json({ message: 'Error adding customer', error: error.message });
    }
  }

  async function deleteCustomer(req, res) {
    const customerId = req.params.customerId;
    
    try {
      const existingCustomer = await Customer.findById(customerId);
      
      if (!existingCustomer) {
        return res.status(400).json({ message: 'Customer not found.' });
      }
  
      await Customer.deleteOne({ _id: customerId });
      return res.status(200).json({ message: 'Customer deleted successfully.' });
    } catch (error) {
      console.error('Error deleting customer', error);
      res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
  }

  async function updateCustomer(req, res) {
    const customerId = req.params.customerId;
    const { email, password } = req.body;
  
    try {
      const existingCustomer = await Customer.findById(customerId);
  
      if (!existingCustomer) {
        return res.status(400).json({ message: 'Customer not found.' });
      }
  
      existingCustomer.email = email;
      existingCustomer.password = password;
  
      const updatedCustomer = await existingCustomer.save();
  
      if (updatedCustomer) {
        return res.status(200).json({ message: 'Customer updated successfully.' });
      }
    } catch (error) {
      console.error('Error updating customer', error);
      res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
  }

module.exports = { getCustomers, addCustomer,deleteCustomer, updateCustomer };