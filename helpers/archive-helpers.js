var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// should read urls from sites.txt
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) throw err;
    var result = data.toString().split('\n');
    callback(result);
  });

};

// should check if a url is in the list
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls){
    var result = urls.indexOf(url) !== -1;
    callback(result);
  });
};

// should add a url to the list
exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url+ "\n", function(err, data) {
    if(err) throw err;
    callback(data);
  });
};

// should check if a url is archived
exports.isUrlArchived = function(url, callback) {
  //take the url and figure out the path of the hypothetical file
  fs.readFile(exports.paths.archivedSites + url, function (err, data) {
    if(err) console.log("URL is not Archived.");
    callback(data);
  }); 
};

// should download all pending urls in the list
exports.downloadUrls = function(urls) {
  urls.forEach(function(url){
    fs.writeFile(exports.paths.archivedSites + "/" + url, '', function(err) {
      if(err) throw err;
    });
  });
};









