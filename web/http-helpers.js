var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFile(archive.paths.siteAssets + asset, function(err, data){
    if (err) throw err;
    callback(data);
  });

};

exports.serveArchivedSites = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFile(archive.paths.archivedSites + asset, function(err, data){
    if (err) throw err;
    callback(data);
  });

};

exports.sendResponse = function(response, data, statusCode, contentType) {
  statusCode = statusCode || 200;
  headers['Content-Type'] = contentType || headers['Content-Type'];
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.makeActionHandler = function(actionMap) {
  return function(request, response, pathname) {
    var action = actionMap[request.method];

    if (action) {
      action(request, response, pathname);
    } else {
      exports.sendResponse(response, '', 404);
    }
  };
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data.slice(4));
  });
};


// As you progress, keep thinking about what helper functions you can put here!
