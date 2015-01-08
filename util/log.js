var config = require('config'),
	bunyan = require('bunyan');

var logStreams = [
	{
		stream: process.stdout
	},
	{
		path: config.get('log.path')
	}
];

var logger = bunyan.createLogger({
	name: 'library-example',
	streams : logStreams,
	serializers: {
		req: bunyan.stdSerializers.req,
		res: bunyan.stdSerializers.res
	}
});

module.exports = {
	logger : logger
};
