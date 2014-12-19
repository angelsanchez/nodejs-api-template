
var express = require('express'),
	bodyParser = require('body-parser'),
	restful = require('node-restful'),
	config = require('config'),
	path = require('path'),
	fs = require('fs'),
	mongoose = restful.mongoose;


var app = express();
app.use( bodyParser.json() );
app.use( express.static(path.join(__dirname, 'public')) );

mongoose.connect( config.get('db.conn') );
mongoose.connection.on('error', console.log);

fs.readdirSync(__dirname + '/schemas').forEach(function (file) {
	if (~file.indexOf('.js')) require(__dirname + '/schemas/' + file);
});

fs.readdirSync(__dirname + '/routers').forEach(function (file) {
	if (~file.indexOf('.js')) require(__dirname + '/routers/' + file)(app);
});

var port = process.env.PORT || 3000;
app.listen( port );
console.log('Server running at port ' + port);
