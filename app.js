var http = require('http');
var fs = require('fs');
 
function getmyfileplz(url) {
 
  var filename = url.substr(url.lastIndexOf('/') + 1, url.length);
  var file = fs.createWriteStream(filename);
 
 
  http.get(url, function(res) {
 
    var fileBytes = res.headers['content-length'];
    var downloadedBytes = 0;
 
    console.log("status code received: " + res.statusCode);
 
    res.pipe(file);
 
    res.once('data', function() {
      console.log('downloading...');
    });
 
    res.on('data', function(chunk) {
      downloadedBytes += chunk.length;
      var progress = (downloadedBytes / fileBytes) * 100;
      console.log("progress: " + parseInt(progress, 10) + "%");
    });
 
    res.on('end', function() {
      console.log(file.path + " downloaded!");
    });
 
  });
}
 
getmyfileplz('http://twitter.github.com/bootstrap/assets/bootstrap.zip');