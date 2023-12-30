const winston = require("winston");
const { combine, timestamp, json, colorize, align, printf } = winston.format;
require("winston-daily-rotate-file");

const combinedRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/combined/combined-%DATE%.json",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
});

const errorRotateFileTransport = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "./logs/errors/errors-%DATE%.json",
  datePattern: "DD-MM-YYYY",
  maxFiles: "30d",
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    colorize({ all: true }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
});

const logger = winston.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    consoleTransport,
    combinedRotateFileTransport,
    errorRotateFileTransport,
  ],
});

// logger.error("This is a critical error ");
// logger.warn("this is just a warning message");
// logger.info("this is just an informative message ");

module.exports = logger;
