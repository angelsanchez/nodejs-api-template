
var log = require('../util/log').logger,
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	BookSchema = require("../schemas/book"),
	BookModel = mongoose.model('Book', BookSchema);

// This returns the two latest updated products
function getLatest (callback) {
	log.info('Searching latest products...');
	BookModel.find().sort({updated: -1}).limit(2).exec(callback);
}

module.exports = {
	getLatest : getLatest
};
