var http = require('http');
var fs = require('fs');
var path = require('path');

function getmyfileplz(url) {
  
  var file = fs.createWriteStream(path.basename(url));

  http.get(url, function(res) {

    var fileBytes = res.headers['content-length'];
    var downloadedBytes = 0;

    console.log("status code received: " + res.statusCode);

    res.pipe(file);

    res.once('data', function(chunk) {
      console.log(chunk.length);
      console.log('downloading...');
    });

    res.on('data', function(chunk) {
      downloadedBytes += chunk.length;
      var progress = parseInt((downloadedBytes / fileBytes) * 100, 10);
      console.log("progress: " + progress + "%");
    });

    res.on('end', function() {
      console.log(file.path + " downloaded!");
    });

  });
}

getmyfileplz('http://twitter.github.com/bootstrap/assets/bootstrap.zip');