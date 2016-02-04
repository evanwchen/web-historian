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
  'POST': function(request, response, pathname) {    
    httpHelpers.collectData(request, function(urlLink) {
      archive.isUrlInList(urlLink, function(data) {
        if (data) {
          httpHelpers.serveArchivedSites(response, "/" + urlLink, function(content) {
            httpHelpers.sendResponse(response, content, 302);
          });
        } else {
          archive.addUrlToList(urlLink, function(data) {
            httpHelpers.serveAssets(response, '/loading.html', function(content) {            
              archive.downloadUrls([urlLink]);
              httpHelpers.sendResponse(response, content, 302);
            });
          });
        }
      });
    });
  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response);  
  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);