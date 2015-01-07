var log = require('./util/log').logger,
	restify = require('restify'),
	path = require('path'),
	fs = require('fs');

//
// App
//
var server = restify.createServer({
	name : 'library-example',
	version : '0.0.1',
	log: log
});

server.use(restify.requestLogger());
server.on('after', function (request, response, route, error) {
	request.log.info({ req: request }, 'REQUEST');
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse()); // Sets up all of the default headers

//
// Routers
//
fs.readdirSync('./routers').forEach(function (file) {
	if (~file.indexOf('.js')) {
		require('./routers/' + file)(server);
		log.info('Router ' + file + ' loaded');
	}
});


server.use(restify.serveStatic({
	directory: path.join(__dirname, 'public'),
	default: 'index.html'
}));

module.exports = server;
