class CustomError extends Error {
  constructor(message, statusCode, req, stack) {
    super(message);
    this.statusCode = statusCode;
    this.req = req;
    this.stack = stack || new Error().stack; // Obtient la stack d'erreur si non fournie
  }
}
module.exports = CustomError;
