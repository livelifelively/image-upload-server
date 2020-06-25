const preSignedURL = require('./pre-signed-url')
const dataUrl = require('./data-url')

async function get_preSignedURL (ctx, next) {
  const fileType = ctx.request.body.fileType
  const uploadKeyPrefix = ctx.request.body.uploadKeyPrefix
  
  const url = await preSignedURL(fileType, uploadKeyPrefix)
  
  ctx.ok(url)
  next()
}

async function save_dataURLImage (ctx, next) {
  const fileType = ctx.request.body.dataUrl
  const uploadKeyPrefix = ctx.request.body.uploadKeyPrefix
  
  const url = await dataUrl(fileType, uploadKeyPrefix)
  
  ctx.ok(url)
  next()
}

module.exports = {
  get_preSignedURL,
  save_dataURLImage
}

