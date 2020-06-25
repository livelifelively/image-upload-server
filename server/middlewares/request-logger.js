const logger = require('../services/logger')

module.exports = () => {
  return async function requestLogger (ctx, next) {
    logger.info({
      message: 'Request Received',
      method: ctx.method,
      url: ctx.url,
      timestamp: new Date()
    })
    const startTime = new Date()
    await next()
    const endTime = new Date()
    logger.info({
      message: 'Response Sent',
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      timeTaken: `${endTime - startTime}ms`
    })
  }
}
