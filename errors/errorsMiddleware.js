const logger = require("./logger");
const CustomError = require("./customError");

errorsMiddleware = (err, req, res, next) => {
  const childLogger = logger.child({
    statusCode: err.statusCode,
    payload: err.requestPayload,
    stack: err.stack,
  });
  childLogger.error(err.message);
  res.status(err.statusCode || 500).send(`Error : ${err.message}`);
};

module.exports = errorsMiddleware;
