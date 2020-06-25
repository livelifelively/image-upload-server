const router = require('./router')

module.exports = {
  register (app) {
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
