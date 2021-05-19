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