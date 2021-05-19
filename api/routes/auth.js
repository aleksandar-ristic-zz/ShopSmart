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
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
} = 
require('../controllers/authController')

const { isAuthUser, authRoles } = require('../middleware/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthUser, updatePassword);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthUser, getUserProfile);
router.route('/me/update').put(isAuthUser, updateProfile);

router.route('/admin/users').get(isAuthUser, authRoles('admin'), allUsers);
router.route('/admin/user/:id')
  .get(isAuthUser, authRoles('admin'), getUserDetails)
  .put(isAuthUser, authRoles('admin'), updateUser)
  .delete(isAuthUser, authRoles('admin'), deleteUser)


module.exports = router;