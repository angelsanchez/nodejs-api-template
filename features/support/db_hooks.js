
var mongoose = require('mongoose'),
	config = require('config');

mongoose.set('debug', true);

var dbHooks = function () {

	this.Before(function(callback) {
		console.log('Before hook');
		mongoose.connect(config.get('db.conn') + '_tests', function (err) {
			if (err) throw err;
			console.log('Connected to MongoDB');

			mongoose.connection.db.dropDatabase(function(){
				console.log('Database dropped');
				callback();
			});
		});
	});

	this.After(function(callback) {
		console.log('After hook');
		mongoose.disconnect(function () {
			console.log('Database connection closed');
			callback();
		});
	});
};

module.exports = dbHooks;
