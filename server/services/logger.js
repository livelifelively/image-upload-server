const winston = require('winston')

module.exports = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
      )
    })
  ]
})
