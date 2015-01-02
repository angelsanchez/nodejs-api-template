
var log = require('../util/log').logger,
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	BookSchema = require("../schemas/book"),
	BookModel = mongoose.model('Book', BookSchema);

function findBooks (criteria, callback) {
	log.info('Searching books...');
	BookModel.find(criteria).populate('author').exec(callback);
}

function getBookWithAuthor (bookId, callback) {
	log.info('Searching the book[' + bookId + ']...');
	BookModel.findById(bookId).populate('author').exec(callback);
}

module.exports = {
	findBooks : findBooks,
	getBookWithAuthor : getBookWithAuthor
};
