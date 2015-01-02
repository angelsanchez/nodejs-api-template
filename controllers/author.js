
var log = require('../util/log').logger,
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	AuthorSchema = require("../schemas/book"),
	AuthorModel = mongoose.model('Author', AuthorSchema);

function getAuthor (id, callback) {
	log.info('Searching the author[' + id + ']...');
	AuthorModel.findById(id, callback);
}

module.exports = {
	getAuthor : getAuthor
};
