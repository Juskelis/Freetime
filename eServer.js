var url = require('url');
var express = require('express');

var app = express();

app.use('/eventSources', express.static('./eventSources'));

app.use(express.static('./apps'));

app.listen(80);