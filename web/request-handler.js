var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var actions = {
  'GET': function(request, response, pathname) {
    if (request.url === '/') {
      request.url = '/index.html';
      httpHelpers.serveAssets(response, request.url, function(content) {
        httpHelpers.sendResponse(response, content, 200);
      });
    }
    // response.writeHead(200, httpHelpers.headers);
    // var data = fs.readFileSync(archive.paths.siteAssets);
    // response.end(JSON.stringify(data));
  },
  'POST': function(request, response) {

  },
  'OPTIONS': function(request, response) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);


// exports.handleRequest = function (req, res) {

// };
