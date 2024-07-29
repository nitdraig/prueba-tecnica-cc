const errorMiddleware = (err, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
