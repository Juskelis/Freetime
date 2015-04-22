var express = require('express');
var url = require('url')
var app = express();

//serve static content for the app from the 'pages' directory in the app dir
app.use('/images', express.static('./img'));

app.use()

app.use(express.static('./pages'));
app.listen(80);