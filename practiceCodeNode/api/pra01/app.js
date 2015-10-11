var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"name": "Shuna","occupation": "Backend developer","home": "AZ"}');
}).listen(4000, "127.0.0.1");
console.log('Connect Server ----:-)')
console.log('http://127.0.0.1:4000/   ----:-)');
