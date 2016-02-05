// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// The test for the downloadUrls helper might fail incorrectly if downloads take a long time. 
// If this happens to you, just increase the timeout in the test to a longer wait time

// The tests expect your server to handle and return incoming JSON data, but the browsers native 
// form handling will use form-encoding instead of JSON. You can either use jQuery to send JSON 
// from the client, or modify the tests to send form-encoded data

var http = require('http-request');
var request = require('request');

exports.fetcher = function(url, callback) {
  console.log('url',url);
  http.get(url, function(error, response, body) {
    if (error) console.log("it is an error");
    console.log('url',url);
    console.log('response',response);

    callback(response.buffer.toString() );
  });
};