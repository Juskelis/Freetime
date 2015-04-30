
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


var express = require('express');

function loadEventsFromServer(url) {
	url = 'eventSources/' + url;
	var xmlhttp = new XMLHttpRequest();
	var events;
	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var events = JSON.parse(xmlhttp.responseText);
			AddToCalendar(events);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}