var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var actions = {
  'GET': function(request, response, pathname) {
     // else {
      // if (archive.isUrlInList(request.url)) {
        httpHelpers.serveArchivedSites(response, request.url, function(content) {
          httpHelpers.sendResponse(response, content, 200);
        });
      // } else {
      // return 404 error
      // }
    // }
  },
  'POST': function(request, response) {

  },
  'OPTIONS': function(request, response) {

  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);


// exports.handleRequest = function (req, res) {

// };
