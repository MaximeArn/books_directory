class CustomError extends Error {
  constructor(message, statusCode, requestPayload, stack) {
    super(message);
    this.statusCode = statusCode;
    this.requestPayload = {
      ...requestPayload.route,
      ...requestPayload.body,
      ...requestPayload.params,
    };
    this.stack = stack || new Error().stack; // Obtient la stack d'erreur si non fournie
  }
}

module.exports = CustomError;
