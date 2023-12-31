const winston = require("winston");
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");
const { combine, timestamp, json, colorize, align, printf } = winston.format;
require("winston-daily-rotate-file");
require("dotenv").config();

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

const combinedRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/combined/combined-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
  format: json(),
});

const errorRotateFileTransport = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "./logs/errors/errors-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "30d",
  format: json(),
});

const uncaughtExceptionTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/uncaughtExceptions/exceptions-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "30d",
  format: json(),
});

const uncaughtRejectionTransport = new winston.transports.DailyRotateFile({
  level: "error",
  filename: "./logs/uncaughtRejections/rejections-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "30d",
  format: json(),
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss A",
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
    new LogtailTransport(logtail),
  ],
  exceptionHandlers: [uncaughtExceptionTransport, consoleTransport],
  rejectionHandlers: [uncaughtRejectionTransport, consoleTransport],
});

module.exports = logger;
