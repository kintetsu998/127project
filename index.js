

// index.js
var express = require('express');
var app = express();
var path = require('path');

app.use(require('body-parser')());
app.use(require('method-override')());

// view engine setup
app.set('views', path.join(__dirname, '.tmp/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));
app.use(require(__dirname + '/config/router')(express.Router()));

var server = app.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

