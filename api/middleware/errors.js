const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log(err)

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err }

    error.message = err.message;

    // Wrong mongoose Object ID Error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)
      .map(val => val.message);
        error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    }

    // Handling wrong JWT err
    if (err.name === 'JsonWebTokenError') {
      const message = `JSON Web Token is invalid. Try again`
        error = new ErrorHandler(message, 400);
    }

    // Handling expired JWT err
    if (err.name === 'TokenExpiredError') {
      const message = `JSON Web Token is expired. Try again`
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
}