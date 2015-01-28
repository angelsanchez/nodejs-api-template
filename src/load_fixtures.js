var path = require('path'),
  config = require('config'),
  mongoose = require('mongoose'),
  msf = require('mongoose-simple-fixtures'),
  log = require('./util/log'),
  dir = path.resolve(__dirname, '../tests/fixtures');

// Preload all models
require('./models');

mongoose.set('debug', true);

mongoose.connect(config.get('db.conn'), function(err) {
  if (err) {
    throw err;
  }
  log.info('Connected to MongoDB');

  msf(mongoose, dir, function(err, results) {
    if (err) console.log('loading data failed', err);
    console.log(results);
    mongoose.connection.close();
  });

  mongoose.connection.on('error', function(err) {
    log.error(err);
  });
});
