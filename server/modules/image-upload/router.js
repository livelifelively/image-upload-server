const Router = require('koa-router')
const router = new Router()
const { ImageUpload } = require('./controllers')

router.post(
  '/upload/image/pre-signed-url', 
  ImageUpload.get_preSignedURL
)

router.post(
  '/upload/image/data-url', 
  ImageUpload.save_dataURLImage
)

module.exports = router
