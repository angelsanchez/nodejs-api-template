var bunyan = require('bunyan'),
  packageJson = require('../../package.json');

module.exports = bunyan.createLogger({
  name: packageJson.name,
  streams: [
    {
      stream: process.stdout
    }
  ],
  serializers: bunyan.stdSerializers
});
