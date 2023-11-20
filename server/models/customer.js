const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    default: 'customer',
  },
});

module.exports = mongoose.model('Customer', customerSchema);
