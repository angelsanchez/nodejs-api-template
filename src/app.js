var log = require('./util/log'),
	restify = require('restify'),
	path = require('path'),
	config = require('config'),
	fs = require('fs'),
	routers_path = path.resolve(process.cwd(), 'src/routers');

//
// App
//
var server = restify.createServer({
	name : config.get('app.name'),
	version : config.get('app.version'),
	log: log
});

server.use(restify.requestLogger());
server.on('after', function (request, response, route, error) {
	request.log.info({ req: request, res: response, error: error }, 'Request');
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse()); // Sets up all of the default headers

//
// Routers
//
fs.readdirSync(routers_path).forEach(function (file) {
	if (~file.indexOf('.js')) {
		require(path.resolve(routers_path, file))(server);
		log.info('Router ' + file + ' loaded');
	}
});


server.use(restify.serveStatic({
	directory: path.join(__dirname, 'public'),
	default: 'index.html'
}));

module.exports = server;
