const express = require('express')
const router = express.Router()

const { 
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  logoutUser,
  getUserProfile,
  updateProfile
} = 
require('../controllers/authController')

const { isAuthUser } = require('../middleware/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthUser, updatePassword);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthUser, getUserProfile);
router.route('/me/update').put(isAuthUser, updateProfile);

module.exports = router;