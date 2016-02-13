var http = require('http');
var requestHandler = require('./controller.js')

http.createServer(requestHandler).listen(4000);
