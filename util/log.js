var config = require('config'),
	bunyan = require('bunyan'),
	expressBunyan = require('express-bunyan-logger');

var logStreams = [
	{ stream: process.stdout },
	{ path: config.get('log.path') }
];

var logger = bunyan.createLogger({
	name: 'library',
	streams : logStreams
});

var expressLogger = expressBunyan({
	name: 'http-request',
	streams: logStreams
});

module.exports = {
	logger : logger,
	expressLogger : expressLogger
};
