
var express = require('express'),
	bodyParser = require('body-parser'),
	restful = require('node-restful'),
	config = require('config'),
	path = require('path'),
	fs = require('fs'),
	mongoose = restful.mongoose,
	logger = require('morgan');


var app = express();
app.use(logger('dev'));
app.use( bodyParser.json() );
app.use( express.static(path.join(__dirname, 'public')) );

mongoose.connect( config.get('db.conn') );
mongoose.connection.on('error', console.log);

var routersPath = path.join(__dirname, '/routers');
fs.readdirSync(routersPath).forEach(function (file) {
	if (~file.indexOf('.js')) require(path.join(routersPath, file))(app);
});

var port = process.env.PORT || 3000;
app.listen( port );
console.log('Server running at port ' + port);
