const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const respond = require('koa-respond')

const errorHandler = require('./error-handler')
const requestLogger = require('./request-logger')
const structureResponse = require('./structure-response')

// register all middlewares
module.exports = {
  register (app) {
    app
      .use(bodyParser())
      .use(helmet())
      .use(structureResponse())
      .use(requestLogger())
      .use(respond())
      .use(errorHandler())
  }
}
