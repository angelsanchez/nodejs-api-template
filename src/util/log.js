var bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: 'library-example',
  streams: [
    {
      stream: process.stdout
    }
  ],
  serializers: bunyan.stdSerializers
});
