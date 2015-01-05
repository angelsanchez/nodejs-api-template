var log = require('../util/log').logger,
	mongoose = require('mongoose'),
	BookSchema = require('../schemas/book'),
	Book = mongoose.model('Book', BookSchema);

function findBooks(criteria, callback) {
	log.info('Searching books...');
	Book.find(criteria).populate('author', 'name birthday').exec(callback);
}

function getBookWithAuthor(bookId, callback) {
	log.info('Looking for book[' + bookId + ']...');
	Book.findById(bookId).populate('author', 'name birthday').exec(callback);
}

function createBook(bookInput, callback) {
	log.info('Creating  book...');
	var book = new Book(bookInput);
	book.save(callback);
}

function deleteBook(id, callback) {
	log.info('Removing book[' + id + ']...');
	Book.findById(id, {_id: 1, author: 1}, function (err, book) {
		if (err) return callback(err);
		if (!book) return callback(err, book);

		Book.remove({_id: book._id}, function (err) {
			if (err) return callback(err);

			require('../controllers/author').removeBookFromAuthor(book.author, book._id, function (err, author) {
				callback(err, book);
			});
		});
	});
}

module.exports = {
	createBook: createBook,
	findBooks: findBooks,
	getBookWithAuthor: getBookWithAuthor,
	deleteBook: deleteBook
};
