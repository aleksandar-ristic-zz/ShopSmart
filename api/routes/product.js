const express = require('express')
const router = express.Router()

const { 
  getProducts, 
  newProduct, 
  getSingleProduct, 
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductAllReviews,
  deleteReview
} = 
require('../controllers/productController')

const { isAuthUser, authRoles } = require('../middleware/auth')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new')
.post(isAuthUser, authRoles('admin'), newProduct);

router.route('/admin/product/:id')
.put(isAuthUser, authRoles('admin'), updateProduct)
.delete(isAuthUser, authRoles('admin'), deleteProduct);

router.route('/review').put(isAuthUser, createProductReview);
router.route('/reviews').get(isAuthUser, getProductAllReviews);
router.route('/reviews').delete(isAuthUser, deleteReview);

module.exports = router;