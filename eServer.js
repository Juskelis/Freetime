/*
var http = require('http');
var fs = require('fs');
var url = require('url');

var message = [
	'Server Running.'
];

http.createServer( function (req, res) {
	res.setHeader('Content-Type', "text/html");
	res.writeHead(200);

	var filename = url.parse(req.url).pathname.slice(1);
	
	if (filename === '') {
		filename = 'index.html';
	}
	
	console.log('filename: ' + filename);
	
	fs.readFile(filename, 'utf8', function (err, data) {
	  if (err) {
		return console.log(err);
	  }
	  res.end(data);
	});
	
}).listen(8080);
*/

var express = require('express');
var fs = require("fs");
var app = express();

//serve json content for the app from the "events" directory in the app dir

app.use('/events/:ename', function(req, res) {
	var filename = './eventSources/' + req.param('ename') + '.json';
	
	fs.readFile(filename, function(err, data) {
		if(err) {
			return;
		}
		ChangeCalendar(JSON.parse(data));
	});
	
	res.send();
});

app.param('ename', function(req, res, next, value) {
	console.log('The param value is: ' + value);
	next();
});

app.use(express.static('./'));
app.listen(80);