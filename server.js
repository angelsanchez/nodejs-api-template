var log = require('./util/log').logger,
	config = require('config'),
	express = require('express'),
	expressLogger = require('./util/log').expressLogger,
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
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

//
// MongoDB
//
var env = process.env.NODE_ENV || 'dev';
if (env === 'dev') {
	log.info('[dev] Setting MongoDB in debug mode');
	mongoose.set('debug', true);
}

log.info('Connecting to MongoDB...');
mongoose.connect(config.get('db.conn'), function (err) {
	if (err) throw err;
	log.info('Connected to MongoDB');

	mongoose.connection.on('error', function (err) {
		log.error(err);
	});

	//
	// Init
	//
	var port = process.env.PORT || 3000;
	app.listen(port);
	log.info('Server running at port ' + port);
});
