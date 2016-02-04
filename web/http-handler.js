var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

var actions = {
  'GET': function(request, response, pathname) {
    if (request.url === '/') {
      request.url = '/index.html';
      httpHelpers.serveAssets(response, request.url, function(content) {
        httpHelpers.sendResponse(response, content, 200);
      });
    }
  },
  'POST': function(request, response) {

  },
  'OPTIONS': function(request, response) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);


// exports.handleRequest = function (req, res) {

// };
