var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var actions = {
  'GET': function(request, response, pathname) {
    fs.readFile('./public' + pathname, function (err, data) {
      if (err) throw error;
      var ext = path.extname(pathname);
      var contentType;
      if (ext === '.js') {
        contentType = 'application/javascript';
      } else if (ext === '.css') {
        contentType = 'text/css';
      }

      httpHelpers.serveAssets(response, request.url, function(content) {
        httpHelpers.sendResponse(response, content, 200);
      }, contentType);
    });
  },
  'POST': function(request, response) {

  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(respons);  
  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);

// archive.downloadAll();