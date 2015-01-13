var config = require('config'),
	bunyan = require('bunyan');

module.exports = bunyan.createLogger({
	name: 'library-example',
	streams : [
		{
			stream: process.stdout
		},
		{
			path: config.get('log.path')
		}
	],
	serializers: bunyan.stdSerializers
});
