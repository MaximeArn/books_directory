errorsMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(parseErrorMessage(err.message));
};

module.exports = errorsMiddleware;

parseErrorMessage = (message) => `Error : ${message}`;
