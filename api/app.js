const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middleware/errors')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

app.use(errorMiddleware);

module.exports = app