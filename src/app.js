var log = require('./util/log'),
  restify = require('restify'),
  path = require('path'),
  config = require('config'),
  fs = require('fs'),
  ROUTES_FOLDER = './routes/',
  app;

//
// App
//
app = restify.createServer({
  name: config.get('app.name'),
  version: config.get('app.version'),
  log: log
});

app.use(restify.requestLogger());
app.on('after', function(request, response, route, error) {
  request.log.info({req: request, res: response, error: error}, 'Request');
});

app.use(restify.queryParser());
app.use(restify.bodyParser());
app.use(restify.fullResponse()); // Sets up all of the default headers

//
// Routers
//
fs.readdirSync(path.join(__dirname, ROUTES_FOLDER)).forEach(function loadRoutes(file) {
  if (~file.indexOf('.js')) {
    require(ROUTES_FOLDER + file)(app);
    log.info('Router ' + file + ' loaded');
  }
});

app.use(restify.serveStatic({
  directory: path.join(__dirname, 'public'),
  default: 'index.html'
}));

module.exports = app;
