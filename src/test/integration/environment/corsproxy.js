var httpProxy = require('http-proxy')
var http = require('http')

const proxy = httpProxy.createServer({
  target: `http://${process.env.TARGET_HOST}:${process.env.TARGET_PORT}`,
  secure: false
})

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
  } else {
    proxy.web(req, res)
  }
})

server.listen(process.env.SERVER_PORT)
