const { Pool } = require('pg')

async function get_imageAndThumbs (contextType, contextId, granularityType) {
  const pool = new Pool()
  
  let query = ``

  var res = await pool.query(query)
  let geoJSON

  if (res.rowCount > 0)
    geoJSON = res.rows[0]
  await pool.end()

  return geoJSON
}

module.exports = get_imageAndThumbs