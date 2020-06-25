// loads env variables from .env file to process.env
require('dotenv').config();

const Koa = require('koa')
const cors = require('@koa/cors')

const app = new Koa()
app.use(cors())

require('./middlewares').register(app)
require('./init').register(app)
require('./middlewares/base-middleware').register(app)

require('./modules/image-upload').register(app)

app.listen(process.env.APP_PORT, () => {
  console.info({ message: `Application Started on port ${process.env.APP_PORT}` })
})
