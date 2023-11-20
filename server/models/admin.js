const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    default: 'admin',
  },
});

module.exports = mongoose.model('Admin', adminSchema);
