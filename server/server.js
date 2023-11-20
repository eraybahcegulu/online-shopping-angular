const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./database/db');
db.connect();

app.use(cors());
app.use(bodyParser.json());

const routes = [
  require('./routes/registerRoutes'),
  require('./routes/loginRoutes'),
  require('./routes/userInfoRoutes'),
  require('./routes/productsRoutes'),
  require('./routes/customersRoutes'),
  require('./routes/cartRoutes'),
];

routes.forEach(route => app.use(route));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});