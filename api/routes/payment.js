const express = require('express')
const router = express.Router()

const { 
  processPayment,
  sendStripeApi
} = require('../controllers/paymentController')

const { isAuthUser } = require('../middleware/auth')

router.route('/payment/process').post(isAuthUser, processPayment);
router.route('/stripeapi').get(isAuthUser, sendStripeApi);

module.exports = router;