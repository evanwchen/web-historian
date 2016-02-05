var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var actions = {
  'GET': function(request, response, pathname) {
    archive.isUrlArchived(pathname, function(data) {
      if (data) {
        httpHelpers.serveArchivedSites(response, request.url, function(content) {
          httpHelpers.sendResponse(response, content, 200);      
        });
      } else {
        httpHelpers.sendResponse(response, '', 404);
      }
    });
  },
  'POST': function(request, response, pathname) {    
  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response);  
  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);

// archive.downloadAll();