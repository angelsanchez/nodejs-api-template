
var express = require('express'),
	bodyParser = require('body-parser'),
	restful = require('node-restful'),
	config = require('config'),
	path = require('path'),
	fs = require('fs'),
	mongoose = restful.mongoose,
	expressLogger = require('./util/log').expressLogger,
	log = require('./util/log').logger;

//
// App
//
var app = express();
app.use( expressLogger );
app.use( bodyParser.json() );
app.use( express.static(path.join(__dirname, 'public')) );

//
// MongoDB
//
mongoose.connect( config.get('db.conn') );
mongoose.connection.on('error', console.log);

//
// Routers
//
var routersPath = path.join(__dirname, '/routers');
fs.readdirSync(routersPath).forEach(function (file) {
	if ( ~file.indexOf('.js') ) {
		require(path.join(routersPath, file))(app);
		log.info('Router ' + file + ' loaded');
	}
});

//
// Init
//
var port = process.env.PORT || 3000;
app.listen( port );
log.info('Server running at port ' + port);
