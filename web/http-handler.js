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
    console.log('fired wrong shit');
    httpHelpers.collectData(request, function(urlLink) {
      console.log('urlLInk', urlLink);
      archive.isUrlInList(urlLink, function(data) {
        if (data) {
          httpHelpers.sendResponse(response, data, 302);
        } else {
          archive.addUrlToList(urlLink, function(data) {
            httpHelpers.sendResponse(response, data, 302);
            archive.downloadUrls([urlLink]);
          });
        }
      });
    });
  },
  'OPTIONS': function(request, response) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);