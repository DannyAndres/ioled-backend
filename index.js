var app = require('./app')

const App = (req, res) => {
  if(!req.url) {
    req.url = '/'
    req.path = '/'
  }
  return app(req,res)
}

module.exports = {
  App
}