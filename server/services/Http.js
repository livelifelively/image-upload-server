const Axios = require('axios')
const QS = require('querystring')

module.exports = {
  async postFormUrlEncoded (url, data) {
    const response = await Axios.post(
      url,
      QS.stringify(data),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )
    return response
  },

  async get (url, data) {
    const response = await Axios.get(
      url + '?' + QS.stringify(data)
    )
    return response
  }
}
