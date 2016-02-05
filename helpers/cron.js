#!/usr/local/bin node

var archive = require('./archive-helpers');

archive.readListOfUrls(function(urls){
  for (var i = 0; i < urls.length; i++) {
    archive.writeDataToFile(urls[i]);
  }
});

