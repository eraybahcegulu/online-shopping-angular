const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/OnlineShopping-Angular', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error', err);
});

app.use(cors());
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    default: 'customer',
  },
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});


const Customer = mongoose.model('Customer', userSchema);
const Admin = mongoose.model('Admin', userSchema);
const Product = mongoose.model('Product', productSchema);


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {

            res.status(400).json({ message: 'Email is already registered.' });
        } else {

            const newCustomer = new Customer({ email, password });
            const registeredCustomer = await newCustomer.save();
            if(registeredCustomer)
            {
                res.status(200).json({ message: 'Registration successful.' });
            }
        }
    } catch (error) {
        console.error('Error saving user to MongoDB', error);
        res.status(500).json({ status: 500, message: 'Registration failed' });
    }
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email, password });

        if (customer) {
            const token = jwt.sign({ userId: customer._id, userType: customer.userType }, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Login successful.', token: token });
        } else {
            const admin = await Admin.findOne({ email, password });

            if (admin) {
                const token = jwt.sign({ userId: admin._id, userType: admin.userType }, process.env.JWT_SECRET);
                res.status(200).json({ message: 'Login successful.', token: token });
            } else {
                res.status(401).json({ message: 'Invalid email or password.' });
            }
        }
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ status: 500, message: 'Login failed.' });
    }
});

app.get('/user-info', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const customer = decodedToken.userType === 'customer' ? await Customer.findById(decodedToken.userId) : null;
      const admin = decodedToken.userType === 'admin' ? await Admin.findById(decodedToken.userId) : null;

      if (!customer && !admin) {
        res.status(404).json({ status: 404, message: 'User not found.' });
    } else {
        const user = customer || admin;
        res.json({
            email: user.email,
            userType: user.userType,
        });
    }
    } catch (error) {
      console.error('Error getting user info', error);
      res.status(500).json({ status: 500, message: 'Error getting user info', error: error.message });
    }
  });


  app.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      console.error('Error getting customers', error);
      res.status(500).json({ status: 500, message: 'Error getting customers', error: error.message });
    }
  });

  app.post('/addCustomer', async (req, res) => {
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
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
