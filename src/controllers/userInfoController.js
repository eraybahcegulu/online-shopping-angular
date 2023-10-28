const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const Admin = require('../models/admin');

async function getUserInfo(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const customer = decodedToken.userType === 'customer' ? await Customer.findById(decodedToken.userId) : null;
    const admin = decodedToken.userType === 'admin' ? await Admin.findById(decodedToken.userId) : null;

    if (!customer && !admin) {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    } else {
      const user = customer || admin;
      return res.json({
          email: user.email,
          userType: user.userType,
      });
    }
  } catch (error) {
    console.error('Error getting user info', error);
    res.status(500).json({ status: 500, message: 'Error getting user info', error: error.message });
  }
}

module.exports = { getUserInfo };
