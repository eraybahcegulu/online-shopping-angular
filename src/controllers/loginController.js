const Customer = require('../models/customer');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUser(email, password);

    if (user) {
      const token = generateToken(user);
      return res.status(200).json({ message: 'Login successful.', token: token });
    }

    return res.status(401).json({ message: 'Invalid email or password.' });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ status: 500, message: 'Login failed.' });
  }
}

async function findUser(email, password) {
  const customer = await Customer.findOne({ email, password });
  if (customer) {
    return { _id: customer._id, userType: customer.userType };
  }

  const admin = await Admin.findOne({ email, password });
  if (admin) {
    return { _id: admin._id, userType: admin.userType };
  }

  return null;
}

function generateToken(user) {
  return jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
}

module.exports = { loginUser };
