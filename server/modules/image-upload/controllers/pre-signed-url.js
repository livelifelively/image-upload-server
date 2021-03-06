const uuid = require('uuid')
const mime = require('mime-types')
const AWS = require('aws-sdk')

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const client = new AWS.S3()
const logger = require('../../../services/logger')

/**
 * Presigned Url
 * @param {String} fileType
 * @param {String} hostname
 * @param {String} uploadKeyPrefix
 * @returns {Object} presignedUrl
 */
module.exports = async (fileType, hostname, uploadKeyPrefix) => {
  uploadKeyPrefix = uploadKeyPrefix ? uploadKeyPrefix : ''
  const params = {
    Bucket: BUCKET_NAME,
    // time to expire in seconds.
    Expires: 60 * 5,
    Fields: {
      key: `${uploadKeyPrefix}${hostname}__${randomName()}.${getFileExtension(fileType)}`
    },
    Conditions: [
      { acl: 'public-read' },
      { 'Content-Type': fileType }
    ]
  }

  try {
    const preSignedUrl = client.createPresignedPost(params)
    logger.verbose({ message: 'SUCCESS Fetched pre-signed upload url from S3', url: { params: params, preSignedUrl } })
    return preSignedUrl
  } catch (err) {
    logger.verbose({
      message: 'FAILED Fetching pre-signed upload url from S3',
      err
    })
  }
}

function getFileExtension (type) {
  return mime.extension(type)
}

function randomName () {
  return uuid.v4()
}
