const logger = require("./logger");

errorsMiddleware = (err, req, res, next) => {
  // add metadata to the error to easily debug
  const childLogger = logger.child({
    statusCode: err.statusCode,
    requestPayload: {
      body: req.body,
      params: req.params,
      rawHeaders: req.rawHeaders,
      route: req.route,
      originalUrl: req.originalUrl,
    },
    stack: err.stack,
  });
  childLogger.error(err.message);
  res.status(err.statusCode || 500).send(`Error : ${err.message}`);
};

module.exports = errorsMiddleware;
