const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./src/database/db');

const registerCustomer = require('./src/routes/registerRoutes');
const loginUser = require('./src/routes/loginRoutes');
const userRoutes = require('./src/routes/userInfoRoutes');
const productRoutes = require('./src/routes/productsRoutes');
const customersRoutes = require('./src/routes/customersRoutes');

db.connect();
app.use(cors());
app.use(bodyParser.json());

app.use(registerCustomer);

app.use(loginUser);

app.use(userRoutes);

app.use(productRoutes);

app.use(customersRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
