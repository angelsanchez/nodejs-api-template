var log = require('./util/log').logger,
	express = require('express'),
	expressLogger = require('./util/log').expressLogger,
	bodyParser = require('body-parser'),
	path = require('path'),
	fs = require('fs');

//
// App
//
var app = express();
app.use(expressLogger);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//
// Routers
//
fs.readdirSync('./routers').forEach(function (file) {
	if (~file.indexOf('.js')) {
		require('./routers/' + file)(app);
		log.info('Router ' + file + ' loaded');
	}
});

module.exports = app;
