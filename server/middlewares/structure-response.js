function getStructuredResponse (toSend, status) {
  return {
    payload: toSend,
    statusCode: status,
    message: 'SUCCESS'
  }
}

module.exports = () => {
  return async function ErrorHandler (ctx, next) {
    await next()
    if (ctx.status >= 200 && ctx.status < 300) {
      ctx.body = getStructuredResponse(ctx.body, ctx.status)
    }
  }
}
