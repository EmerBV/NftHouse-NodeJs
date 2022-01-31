
function isAPIRequest (req) {
  return req.originalUrl.startsWith('/api/')
}

function imgRoute (req, image) {
  return `http://${req.get('host')}/img/${image}`
}

module.exports = {
  isAPIRequest,
  imgRoute
}
