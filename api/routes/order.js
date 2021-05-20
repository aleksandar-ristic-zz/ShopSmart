const express = require('express')
const router = express.Router()

const { 
  newOrder, 
  getSingleOrder, 
  myOrders
} = require('../controllers/orderController')

const { isAuthUser, authRoles } = require('../middleware/auth')

router.route('/order/new').post(isAuthUser, newOrder);
router.route('/order/:id').get(isAuthUser, getSingleOrder);
router.route('/orders/me').get(isAuthUser, myOrders);


module.exports = router;