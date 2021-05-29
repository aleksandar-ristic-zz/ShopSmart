const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path');

const errorMiddleware = require('./middleware/errors')

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'api/config/config.env' })

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const payment = require('./routes/payment')
const order = require('./routes/order')

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  })
}

app.use(errorMiddleware);

module.exports = app