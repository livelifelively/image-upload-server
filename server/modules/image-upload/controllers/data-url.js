const uuid = require('uuid')
const mime = require('mime-types')
const AWS = require('aws-sdk')

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const client = new AWS.S3()

module.exports = (dataUrl, uploadKeyPrefix) => {
  uploadKeyPrefix = uploadKeyPrefix ? uploadKeyPrefix : ''

  const params = buildUploadParams({
    Body: extractDataFromUrl(dataUrl),
    ContentType: extractContentTypeFromUrl(dataUrl)
  }, uploadKeyPrefix
  )

  // logger.verbose({ message: 'Uploading dataUrl to S3', params })

  return client
    .putObject(params)
    .promise()
    .then(() => {
      const data = { url: getUploadedUrl(params) }
      // logger.verbose({ message: 'Successfully uploaded to S3', data })
      return data
    })
    .catch(error => {
      console.log(error)
      // logger.error({ message: 'Error from S3', data: error.message })
      // throw new UploadError(error)
    })
}

function buildUploadParams (data, uploadKeyPrefix = '') {
  return Object.assign(
    {},
    {
      ACL: 'public-read',
      Bucket: BUCKET_NAME,
      Key: `${uploadKeyPrefix}${randomName()}.${getFileExtension(data.ContentType)}`
    },
    data
  )
}

function getUploadedUrl (params) {
  return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`
}

function extractDataFromUrl (dataUrl) {
  return Buffer.from(dataUrl.split(';base64,').pop(), 'base64')
}

function extractContentTypeFromUrl (dataUrl) {
  return dataUrl
    .split(';base64,')
    .shift()
    .replace('data:', '')
}

function getFileExtension (type) {
  return mime.extension(type)
}

function randomName () {
  return uuid.v4()
}