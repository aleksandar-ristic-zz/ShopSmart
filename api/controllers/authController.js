const User = require('../models/User')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const sendToken = require('../utils/jwtToken')

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const {name, email, password} = req.body;

  const user = await User.create({
    name, 
    email,
    password,
    avatar: {
      public_id: 'avatar/10462857_538075069672009_4999119384748835809_n_vbvixb',
      url: 'https://res.cloudinary.com/ri10a/image/upload/v1621441934/avatar/10462857_538075069672009_4999119384748835809_n_vbvixb.jpg'
    }
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token
  })
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {

  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400))
  }

  //Finding user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  sendToken(user, 200, res);
});

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('There is no user with this email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is \n\n ${resetToken}\n\n If you have not requested this email, then ignore it.`;

  try {
    
    await sendEmail({
      email: user.email,
      subject: 'ShopIt Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`
    });

  } catch(err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500))
  }
});

// Logout user => /api/vi/logout
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out'
  })
});