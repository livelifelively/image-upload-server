const bodyParser = require('koa-bodyparser')

module.exports = {
  register (app) {
    app.use(bodyParser())
  }
}
