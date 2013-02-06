var http = require('http');
var fs = require('fs');

function getmyfileplz(url) {

	var filename = url.substr(url.lastIndexOf('/') + 1, url.length);
	var file = fs.createWriteStream(filename);
	
	http.get(url, function(res) {

		console.log('status code received: ' + res.statusCode);
		
		res.pipe(file);

		res.once('data', function() {
			console.log('beginning download...');
		});

		res.on('end', function() {
			console.log(file.path + ' downloaded!');
		});

	});
}

getmyfileplz('http://twitter.github.com/bootstrap/assets/bootstrap.zip');