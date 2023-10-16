const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/OnlineShopping-Angular', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error', err);
});

app.use(cors());
app.use(bodyParser.json());

const Customer = mongoose.model('Customer', {
    email: String,
    password: String,
});


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {

            res.status(400).json({ message: 'Email is already registered.' });
        } else {

            const newCustomer = new Customer({ email, password });
            await newCustomer.save();
            res.status(200).json({ message: 'Registration successful.' });
        }
    } catch (error) {
        console.error('Error saving user to MongoDB', error);
        res.status(500).json({ status: 500, message: 'Registration failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
