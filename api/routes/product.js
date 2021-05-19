const express = require('express')
const router = express.Router()

const { 
  getProducts, 
  newProduct, 
  getSingleProduct, 
  updateProduct,
  deleteProduct
} = 
require('../controllers/productController')

const { isAuthUser } = require('../middleware/auth')

router.route('/products').get(isAuthUser, getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id')
.put(updateProduct)
.delete(deleteProduct);

module.exports = router;