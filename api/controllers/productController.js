const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

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

  const resPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

  const products = await apiFeatures.query;

  return res.status(201).json({
    success: true,
    count: products.length,
    productCount,
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