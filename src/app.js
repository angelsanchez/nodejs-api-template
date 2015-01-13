var log = require('./util/log'),
  restify = require('restify'),
  path = require('path'),
  config = require('config'),
  fs = require('fs'),
  ROUTES_FOLDER = './routes/',
  server;

//
// App
//
server = restify.createServer({
  name: config.get('app.name'),
  version: config.get('app.version'),
  log: log
});

server.use(restify.requestLogger());
server.on('after', function(request, response, route, error) {
  request.log.info({req: request, res: response, error: error}, 'Request');
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse()); // Sets up all of the default headers

//
// Routers
//
fs.readdirSync(path.join(__dirname, ROUTES_FOLDER)).forEach(function loadRoutes(file) {
  if (~file.indexOf('.js')) {
    require(ROUTES_FOLDER + file)(server);
    log.info('Router ' + file + ' loaded');
  }
});

server.use(restify.serveStatic({
  directory: path.join(__dirname, 'public'),
  default: 'index.html'
}));

module.exports = server;
