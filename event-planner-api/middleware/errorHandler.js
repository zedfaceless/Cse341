// middleware/errorHandler.js
function errorHandling(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error'
    // optionally include stack in dev: stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
}

module.exports = errorHandling;
