const aws = require('aws-sdk')

/**
 * Configuration for connection to AWS
 */
module.exports = () => {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  })
}
