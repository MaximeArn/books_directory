const winston = require("winston");
const { combine, timestamp, json, colorize, align, printf } = winston.format;

const logger = winston.createLogger({
  // format: combine(
  //   colorize({ all: true }),
  //   timestamp({
  //     format: "YYYY-MM-DD hh:mm:ss.SSS A",
  //   }),
  //   align(),
  //   printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  // ),
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        colorize({ all: true }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
      format: combine(),
    }),
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
    }),
  ],
});

logger.error("This is a critical error ");
logger.warn("this is just a warning message");
logger.info("this is just an informative message ");

module.exports = logger;
