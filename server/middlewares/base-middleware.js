const helmet = require('koa-helmet')
const respond = require('koa-respond')

const errorHandler = require('./error-handler')
const requestLogger = require('./request-logger')
const structureResponse = require('./structure-response')

function register (app) {
  app
    .use(helmet())
    .use(structureResponse())
    .use(requestLogger())
    .use(respond())
    .use(errorHandler())
}

module.exports = {
  register
}
