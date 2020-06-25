const _ = require('lodash')
const Boom = require('@hapi/boom')

function handleError (err, ctx) {
  highlightAndLogError(err)

  if (!Boom.isBoom(err)) {
    err = boomifyErrorResponse(err)
  }

  const errorCode = (err.output && err.output.statusCode) || 500
  const errorOutput = _.cloneDeep(err.output)
  errorOutput.payload = {
    ...errorOutput.payload,
    ...err.payloadAddons
  }
  ctx.send(errorCode, errorOutput)
}

function highlightAndLogError (err, req, res, next) {
  console.log('=============================================================')
  console.log('||                    SYSTEM ERROR !!!!                    ||')
  console.log('=============================================================')
  console.log(err)
  console.log('=============================================================')
  console.log('=============================================================')
}

function boomifyErrorResponse (e) {
  if (e.response && e.response.data && e.response.data.error) {
    const firebaseError = e.response.data.error
    return Boom.boomify(
      new Error(),
      {
        statusCode: firebaseError.code,
        message: firebaseError.message,
        decorate: {
          payloadAddons: {
            errors: firebaseError.errors
          }
        }
      }
    )
  }
  return Boom.boomify(e)
}

module.exports = () => {
  return async function ErrorHandler (ctx, next) {
    try {
      await next()
      if (ctx.status < 200 || ctx.status >= 300) ctx.throw(ctx.status)
    } catch (err) {
      handleError(err, ctx)
    }
  }
}
