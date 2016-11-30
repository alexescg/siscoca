var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express()

var publicDir = path.join(__dirname, 'public')

app.set('port', process.env.PORT || 4000)
app.use(logger('dev'))
app.use(bodyParser.json()) //parses json, multi-part (file), url-encoded
app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'))
})

app.get('/about', function(req, res) {
  res.sendFile(path.join(publicDir, 'about.html'))
})

var server = http.createServer(app)

server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});
