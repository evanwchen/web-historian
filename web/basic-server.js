var http = require("http");
var url = require('url');
var archiveHandler = require("./request-handler");
var staticHandler = require('./static-handler');
var initialize = require("./initialize.js");
var httpHandlers = require('./http-handler');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";

var router = {
  '/': httpHandlers.handleRequest,
  '/index.html': httpHandlers.handleRequest,
  '/styles.css': staticHandler.handleRequest,
  '/favicon.io': staticHandler.handleRequest,
  '/www.google.com': archiveHandler.handleRequest
};

var server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var route = router[pathname];
  if (route) {
    route(request, response, pathname);
  } else {
    httpHelpers.sendResponse(response, '', 404);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

