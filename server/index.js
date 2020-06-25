// loads env variables from .env file to process.env
require('dotenv').config();
const logger = require('./services/logger')

const Koa = require('koa')
const cors = require('@koa/cors')

const app = new Koa()
app.use(cors())

// register middlewar
require('./middlewares').register(app)

// configurations
require('./init').register(app)

// register image upload module
require('./modules/image-upload').register(app)

// listen at APP_PORT
app.listen(process.env.APP_PORT, () => {
  logger.info({ message: `Application Started on port ${process.env.APP_PORT}` })
})
