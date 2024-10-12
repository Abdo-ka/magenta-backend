// Global Error-Handling Middleware
const errorHandlerMiddelWare = (err, req, res, next) => {
  // Set the default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

module.exports = errorHandlerMiddelWare;
