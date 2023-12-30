const logger = require("./logger");

errorsMiddleware = (err, req, res, next) => {
  logger.error(err.message, {
    statusCode: err.statusCode,
    requestPayload: {
      body: req.body,
      params: req.params,
      rawHeaders: req.rawHeaders,
      route: req.route,
      originalUrl: req.originalUrl,
    },
  });
  res.status(err.statusCode || 500).send(`Error : ${err.message}`);
};

module.exports = errorsMiddleware;
