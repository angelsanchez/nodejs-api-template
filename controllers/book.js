
var log = require('../util/log').logger,
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	BookSchema = require("../schemas/book"),
	BookModel = mongoose.model('Book', BookSchema);

function getBookWithAuthor (bookId, callback) {
	log.info('Searching the book [' + req.param('id') + ']...');
	BookModel.findById(bookId).populate('author').exec(callback);
}

module.exports = {
	model : BookModel,
	getBookWithAuthor : getBookWithAuthor
};
