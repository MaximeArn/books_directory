const logger = require("./logger");

errorsMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.statusCode || 500).send(`Error : ${err.message}`);
};

module.exports = errorsMiddleware;
