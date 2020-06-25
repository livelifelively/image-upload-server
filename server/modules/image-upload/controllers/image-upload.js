const preSignedURL = require('./pre-signed-url')
const dataUrl = require('./data-url')

/**
 * Get presigned url from aws s3
 * @param {Object} ctx 
 * @param {Function} next 
 */
async function get_preSignedURL (ctx, next) {
  const fileType = ctx.request.body.fileType
  const uploadKeyPrefix = ctx.request.body.uploadKeyPrefix
  
  const url = await preSignedURL(fileType, uploadKeyPrefix)
  
  ctx.ok(url)

  next()
}

/**
 * Save File as data url to s3
 * @param {*} ctx 
 * @param {*} next 
 */
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

