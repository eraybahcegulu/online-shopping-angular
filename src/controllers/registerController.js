const Customer = require('../models/customer');

async function registerCustomer(req, res) {
  const { email, password } = req.body;

  try {
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const newCustomer = new Customer({ email, password });
    const registeredCustomer = await newCustomer.save();

    if (registeredCustomer) {
      return res.status(200).json({ message: 'Registration successful.' });
    }
  } catch (error) {
    console.error('Error saving user to MongoDB', error);
    res.status(500).json({ status: 500, message: 'Registration failed' });
  }
}

module.exports = { registerCustomer };
