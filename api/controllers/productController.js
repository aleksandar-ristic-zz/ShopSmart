const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const product = require('../models/product');

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors( async (req, res, next) => {

  req.body.user = req.body.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});

// Get all products => /api/v1/products?keyword=query
exports.getProducts = catchAsyncErrors( async (req, res, next) => {

  const resPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
  
  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query;

  return res.status(201).json({
    success: true,
    resPerPage,
    productsCount,
    filteredProductsCount,
    products
  });
});

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors( async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});

// Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  });
});

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
  
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  await product.remove();

  res.status(200).json({
    sucess: true,
    message: 'Product is deleted'
  });
});

//* Review routes

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors( async(req, res, next) => {

  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });

  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});

// Get product reviews => /api/v1/reviews
exports.getProductAllReviews = catchAsyncErrors( async(req, res, next) => {

  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});

// Delete product review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(review => 
    review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  const ratings = product.reviews.reduce((acc, item) => 
    item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, { 
      reviews, 
      ratings, 
      numOfReviews
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  )

  res.status(200).json({
    success: true,
  })
});